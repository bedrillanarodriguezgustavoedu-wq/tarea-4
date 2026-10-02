import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type SectionKey = 'soluciones' | 'resultados' | 'nosotros';

interface SectionFeature {
  icon: string;
  title: string;
  description: string;
}

interface SectionContent {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  features: SectionFeature[];
  metrics: { value: string; label: string }[];
}

const sectionPages: Record<SectionKey, SectionContent> = {
  soluciones: {
    eyebrow: 'Soluciones para mover tu negocio',
    title: 'Todo lo que tu flota necesita. En un solo lugar.',
    description:
      'Coordina vehículos, conductores y entregas desde una plataforma sencilla. Convierte los datos de cada viaje en mejores decisiones para toda tu operación.',
    image:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&h=800&q=85',
    imageAlt: 'Camión de carga preparado para comenzar su ruta',
    features: [
      {
        icon: 'location_on',
        title: 'Rastreo en tiempo real',
        description: 'Consulta dónde está cada vehículo y comparte el progreso de sus recorridos.',
      },
      {
        icon: 'route',
        title: 'Rutas más eficientes',
        description:
          'Planifica recorridos y detecta oportunidades para ahorrar tiempo y combustible.',
      },
      {
        icon: 'shield',
        title: 'Más seguridad para tu equipo',
        description: 'Identifica hábitos de manejo y ayuda a tus conductores a viajar más seguros.',
      },
      {
        icon: 'analytics',
        title: 'Datos que ayudan a decidir',
        description: 'Reúne indicadores claros para mejorar el rendimiento de toda tu flota.',
      },
    ],
    metrics: [
      { value: '20%', label: 'más puntualidad' },
      { value: '30%', label: 'menos costos de operación' },
      { value: '24/7', label: 'visibilidad de tu flota' },
    ],
  },
  resultados: {
    eyebrow: 'Impacto que puedes medir',
    title: 'Menos costos. Más control. Mejores resultados.',
    description:
      'Con Codera, cada recorrido puede convertirse en una oportunidad para mejorar. Revisa el desempeño de tu flota, encuentra tendencias y comprueba el impacto de tus decisiones.',
    image:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&h=800&q=85',
    imageAlt: 'Camión de transporte recorriendo una carretera abierta',
    features: [
      {
        icon: 'local_gas_station',
        title: 'Control del combustible',
        description: 'Compara consumos y encuentra formas concretas de reducir gastos.',
      },
      {
        icon: 'schedule',
        title: 'Entregas a tiempo',
        description: 'Entiende cómo avanzan tus rutas y mejora la experiencia de tus clientes.',
      },
      {
        icon: 'health_and_safety',
        title: 'Viajes más seguros',
        description: 'Sigue hábitos de conducción y promueve mejoras continuas en tu equipo.',
      },
      {
        icon: 'monitoring',
        title: 'Progreso visible',
        description: 'Usa reportes claros para seguir tus objetivos y mostrar resultados.',
      },
    ],
    metrics: [
      { value: '27%', label: 'menos costos en seis meses' },
      { value: '50%', label: 'menos incidentes' },
      { value: '1 vista', label: 'para toda tu operación' },
    ],
  },
  nosotros: {
    eyebrow: 'Conoce Codera',
    title: 'Ayudamos a las flotas a avanzar con confianza.',
    description:
      'Creemos que administrar una flota no debería ser complicado. Creamos herramientas claras y útiles para que las empresas puedan cuidar a su gente y hacer crecer su operación.',
    image:
      'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1200&h=800&q=85',
    imageAlt: 'Equipo preparando productos para su distribución',
    features: [
      {
        icon: 'lightbulb',
        title: 'Tecnología con propósito',
        description: 'Diseñamos soluciones prácticas para los retos reales del transporte.',
      },
      {
        icon: 'groups',
        title: 'Las personas primero',
        description: 'Ayudamos a cuidar a conductores y equipos en cada etapa del recorrido.',
      },
      {
        icon: 'handshake',
        title: 'Acompañamiento cercano',
        description: 'Trabajamos contigo para que puedas aprovechar cada herramienta de Codera.',
      },
      {
        icon: 'eco',
        title: 'Un futuro más eficiente',
        description: 'Impulsamos operaciones más responsables, seguras y sostenibles.',
      },
    ],
    metrics: [
      { value: '1 misión', label: 'hacer simple la gestión de flotas' },
      { value: 'Siempre', label: 'cerca de nuestros clientes' },
      { value: 'Juntos', label: 'hacemos que cada viaje cuente' },
    ],
  },
};

function isSectionKey(value: unknown): value is SectionKey {
  return typeof value === 'string' && Object.hasOwn(sectionPages, value);
}

@Component({
  selector: 'app-section-page',
  imports: [NgOptimizedImage, RouterLink, MatButtonModule, MatIconModule],
  template: `
    @if (page(); as page) {
      <main class="text-[#13150f]">
        <section
          class="grid items-center gap-8 px-[22px] py-12 sm:grid-cols-2 sm:gap-[7%] sm:px-[6%] sm:py-16 lg:px-[8%] lg:py-24"
        >
          <div class="max-w-[580px]">
            <a
              routerLink="/"
              class="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#73756f] transition-colors hover:text-[#13150f] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              <mat-icon class="!size-4 !text-base" aria-hidden="true">arrow_back</mat-icon>
              Volver al inicio
            </a>
            <p
              class="mb-3 text-[10px] font-semibold uppercase tracking-[.12em] text-[#3c8150] sm:text-xs"
            >
              {{ page.eyebrow }}
            </p>
            <h1
              class="mb-5 font-sans text-[clamp(38px,8vw,64px)] font-bold leading-[1.02] tracking-[-.065em]"
            >
              {{ page.title }}
            </h1>
            <p class="mb-7 max-w-[520px] text-sm leading-7 text-[#666860] sm:text-base">
              {{ page.description }}
            </p>
            <a
              matButton="filled"
              class="!min-h-11 !rounded-full !bg-[#13150f] !px-5 !text-xs !font-semibold !text-white !shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              routerLink="/"
              fragment="contacto"
            >
              Hablemos de tu flota
              <mat-icon class="!ml-2 !size-[17px] !text-[17px]" aria-hidden="true"
                >arrow_forward</mat-icon
              >
            </a>
          </div>
          <div class="relative h-[270px] sm:h-[360px] lg:h-[440px]">
            <img
              [ngSrc]="page.image"
              [alt]="page.imageAlt"
              fill
              sizes="(max-width: 639px) 100vw, 48vw"
              class="rounded-[14px] object-cover"
              priority
            />
            <span
              class="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[11px] font-semibold shadow-lg"
            >
              <span class="size-2 rounded-full bg-[#40a65e]"></span>
              Codera mantiene tu operación en movimiento
            </span>
          </div>
        </section>

        <section class="bg-[#f5f5f3] px-[22px] py-12 sm:px-[6%] sm:py-16 lg:px-[8%] lg:py-20">
          <div class="mx-auto max-w-[1100px]">
            <div class="mb-8 max-w-[580px] sm:mb-10">
              <p class="mb-2 text-[10px] font-semibold uppercase tracking-[.1em] text-[#767871]">
                Una plataforma hecha para avanzar
              </p>
              <h2
                class="font-sans text-[30px] font-bold leading-tight tracking-[-.055em] sm:text-4xl"
              >
                Descubre lo que puedes lograr.
              </h2>
            </div>
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              @for (feature of page.features; track feature.title) {
                <article
                  class="rounded-xl border border-[#ecece9] bg-white p-5 shadow-[0_8px_28px_#17191408] sm:p-6"
                >
                  <span
                    class="mb-6 grid size-10 place-items-center rounded-xl bg-[#edf7ef] text-[#337c48]"
                  >
                    <mat-icon aria-hidden="true">{{ feature.icon }}</mat-icon>
                  </span>
                  <h3 class="mb-2 text-sm font-bold">{{ feature.title }}</h3>
                  <p class="mb-0 text-xs leading-6 text-[#73756f]">{{ feature.description }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section class="px-[22px] py-12 sm:px-[6%] sm:py-16 lg:px-[8%] lg:py-20">
          <div class="mx-auto grid max-w-[1100px] gap-3 sm:grid-cols-3">
            @for (metric of page.metrics; track metric.label) {
              <article class="rounded-xl border border-[#ecece9] px-5 py-6 sm:px-7 sm:py-8">
                <strong
                  class="mb-2 block font-sans text-4xl font-bold tracking-[-.06em] sm:text-5xl"
                  >{{ metric.value }}</strong
                >
                <p class="mb-0 text-sm text-[#73756f]">{{ metric.label }}</p>
              </article>
            }
          </div>
        </section>

        <section
          class="mx-5 mb-12 flex flex-col items-start gap-5 rounded-[13px] bg-[#11150e] px-6 py-8 text-white sm:mx-[6%] sm:mb-16 sm:flex-row sm:items-center sm:justify-between sm:px-9 lg:mx-[8%] lg:px-12"
        >
          <div>
            <p class="mb-2 text-[10px] font-semibold uppercase tracking-[.1em] text-[#b6c5b5]">
              Cada viaje cuenta
            </p>
            <h2 class="mb-2 font-sans text-2xl font-semibold tracking-[-.04em] sm:text-3xl">
              Tu próxima ruta empieza aquí.
            </h2>
            <p class="mb-0 text-xs text-[#d1d3cd]">Conoce cómo Codera puede ayudar a tu negocio.</p>
          </div>
          <a
            matButton="filled"
            class="!min-h-10 !rounded-full !bg-white !px-5 !text-xs !font-semibold !text-[#13150f] !shadow-none"
            routerLink="/"
            fragment="contacto"
          >
            Solicitar demo
          </a>
        </section>
      </main>
    } @else {
      <main class="px-6 py-24 text-center">
        <h1 class="mb-4 font-sans text-4xl font-bold">No encontramos esta página</h1>
        <a class="font-semibold text-[#286d3e] underline" routerLink="/">Volver al inicio</a>
      </main>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPage {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly routeData = toSignal(this.route.data, {
    initialValue: this.route.snapshot.data,
  });

  protected readonly page = computed(() => {
    const pageKey: unknown = this.routeData()['sectionPage'];
    return isSectionKey(pageKey) ? sectionPages[pageKey] : null;
  });

  constructor() {
    effect(() => {
      const page = this.page();
      this.title.setTitle(page ? `${page.eyebrow} | Codera` : 'Página no encontrada | Codera');
    });
  }
}
