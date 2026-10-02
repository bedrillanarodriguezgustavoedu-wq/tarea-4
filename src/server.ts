import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { appendFile, mkdir } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json({ limit: '10kb' }));

const submissionsFolder = process.env['DATA_DIR'] || join(process.cwd(), 'data');
let submissionWriteQueue = Promise.resolve();

function saveSubmission(kind: 'demo' | 'newsletter', data: Record<string, string>) {
  const record = JSON.stringify({
    id: randomUUID(),
    kind,
    createdAt: new Date().toISOString(),
    ...data,
  });
  const write = submissionWriteQueue.then(async () => {
    await mkdir(submissionsFolder, { recursive: true });
    await appendFile(join(submissionsFolder, `${kind}-submissions.jsonl`), `${record}\n`, 'utf8');
  });
  submissionWriteQueue = write.catch(() => {});
  return write;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return text.length > 0 && text.length <= maxLength ? text : null;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

type ResendResult = 'sent' | 'not-configured' | 'failed';

async function sendWithResend(path: '/emails' | '/contacts', payload: Record<string, unknown>) {
  const apiKey = process.env['RESEND_API_KEY'];
  if (!apiKey) return 'not-configured' as const;

  try {
    const response = await fetch(`https://api.resend.com${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`Resend ${path} request failed with status ${response.status}.`);
      return 'failed' as const;
    }
    return 'sent' as const;
  } catch (error) {
    console.error(`Resend ${path} request could not be completed.`, error);
    return 'failed' as const;
  }
}

app.post('/api/demo', async (req, res) => {
  const body: unknown = req.body;
  if (!isRecord(body)) {
    res.status(400).json({ message: 'Completa los datos del formulario.' });
    return;
  }

  const name = readText(body['name'], 120);
  const email = readText(body['email'], 254)?.toLowerCase();
  const company = readText(body['company'], 160);
  const message = typeof body['message'] === 'string' ? body['message'].trim() : '';

  if (!name || !email || !company || message.length > 2000 || !isEmail(email)) {
    res.status(400).json({ message: 'Revisa los datos e intenta de nuevo.' });
    return;
  }

  try {
    await saveSubmission('demo', { name, email, company, message });
    const from = process.env['RESEND_FROM_EMAIL'];
    const recipient = process.env['CONTACT_EMAIL'];
    let emailStatus: ResendResult = 'not-configured';
    if (from && recipient) {
      emailStatus = await sendWithResend('/emails', {
        from,
        to: [recipient],
        subject: 'Nueva solicitud de demostración de Codera',
        text: [
          `Nombre: ${name}`,
          `Empresa: ${company}`,
          `Correo: ${email}`,
          `Necesidades: ${message || 'No especificadas'}`,
        ].join('\n'),
      });
    }
    const messageByStatus: Record<ResendResult, string> = {
      sent: 'Solicitud recibida. El equipo de Codera recibió tu información.',
      'not-configured':
        'Tu solicitud quedó registrada. Falta configurar el correo automático al equipo.',
      failed: 'Tu solicitud quedó registrada, pero no se pudo enviar el aviso al equipo.',
    };
    res.status(201).json({ message: messageByStatus[emailStatus] });
  } catch (error) {
    console.error('No se pudo guardar la solicitud de demo.', error);
    res.status(500).json({ message: 'No pudimos guardar tu solicitud. Inténtalo más tarde.' });
  }
});

app.post('/api/newsletter', async (req, res) => {
  const body: unknown = req.body;
  const email = isRecord(body) ? readText(body['email'], 254)?.toLowerCase() : null;
  const hasConsent = isRecord(body) && body['consent'] === true;

  if (!email || !isEmail(email) || !hasConsent) {
    res.status(400).json({ message: 'Escribe un correo válido y acepta recibir novedades.' });
    return;
  }

  try {
    await saveSubmission('newsletter', { email, consent: 'true' });
    const providerResult = await sendWithResend('/contacts', {
      email,
      unsubscribed: false,
    });
    const messageByStatus: Record<ResendResult, string> = {
      sent: 'Tu correo quedó registrado para el boletín.',
      'not-configured':
        'Tu correo quedó guardado. Falta configurar Resend para activar el boletín.',
      failed: 'Guardamos tu correo, pero no pudimos conectarlo al servicio del boletín.',
    };
    res.status(201).json({ message: messageByStatus[providerResult] });
  } catch (error) {
    console.error('No se pudo guardar la suscripción al boletín.', error);
    res.status(500).json({ message: 'No pudimos guardar tu correo. Inténtalo más tarde.' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
