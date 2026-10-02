# Ecommerce

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.24.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

The demo and newsletter forms require the Express API. The Angular development server proxies `/api`
requests to port `4000`. Build and run the SSR server in a second terminal:

```bash
npm run build
npm run serve:ssr:ecommerce
```

The SSR server listens on `http://localhost:4000` by default and stores submissions in
`data/demo-submissions.jsonl` and `data/newsletter-submissions.jsonl`. Set `DATA_DIR` to choose a
different storage folder. These local files are ignored by Git. Submissions are stored on the
server. To connect Resend, set `RESEND_API_KEY`; additionally set `RESEND_FROM_EMAIL` and
`CONTACT_EMAIL` to send demo-request notifications to your team. The newsletter form adds opted-in
contacts to Resend. Set these environment variables in the same terminal before starting the SSR
server; never commit API keys.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# tarea-4
# tarea-4
