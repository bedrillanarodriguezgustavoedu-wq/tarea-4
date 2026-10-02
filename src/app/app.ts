import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  template: `
    <div class="min-h-screen bg-[#e7e6e3] p-0 font-sans sm:p-3 xl:py-8">
      <div
        class="mx-auto max-w-[1440px] overflow-hidden rounded-none bg-white shadow-[0_20px_70px_#1719140b] sm:rounded-xl xl:my-[22px]"
      >
        <header
          class="relative z-10 flex min-h-[65px] items-center justify-between bg-white px-5 sm:min-h-[67px] sm:px-[5%] lg:min-h-[78px] lg:px-[7.2%]"
        >
          <a
            class="hidden w-fit items-center gap-[7px] font-sans text-[10px] font-extrabold tracking-[-.035em] sm:flex"
            routerLink="/"
            (click)="closeMenu()"
            aria-label="Codera, inicio"
          >
            <span
              class="grid size-[18px] place-items-center rounded-[5px] bg-[#13150f] text-white [&_mat-icon]:size-[13px] [&_mat-icon]:text-[13px]"
            >
              <mat-icon aria-hidden="true">route</mat-icon></span
            >
            <span>CODERA</span>
          </a>

          <button
            class="!absolute left-2.5 top-3 sm:!hidden"
            mat-icon-button
            type="button"
            (click)="toggleMenu()"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Abrir o cerrar menú"
          >
            <mat-icon>{{ menuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>

          <nav
            class="absolute left-0 right-0 top-[65px] z-10 flex flex-col items-stretch gap-0 border-b border-[#e9e9e6] bg-white px-5 pb-4 pt-2 shadow-[0_14px_24px_#11150e0b] sm:static sm:ml-8 sm:!flex sm:flex-row sm:items-center sm:gap-4 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none lg:gap-[26px]"
            [class.hidden]="!menuOpen()"
            aria-label="Navegación principal"
          >
            <a
              class="border-b border-[#f0f0ed] py-[13px] text-[13px] font-medium transition-opacity hover:opacity-60 sm:border-0 sm:py-0 sm:text-[10px] lg:text-[11px]"
              routerLink="/soluciones"
              (click)="closeMenu()"
              >Soluciones</a
            >
            <a
              class="border-b border-[#f0f0ed] py-[13px] text-[13px] font-medium transition-opacity hover:opacity-60 sm:border-0 sm:py-0 sm:text-[10px] lg:text-[11px]"
              routerLink="/resultados"
              (click)="closeMenu()"
              >Resultados</a
            >
            <a
              class="border-b border-[#f0f0ed] py-[13px] text-[13px] font-medium transition-opacity hover:opacity-60 sm:border-0 sm:py-0 sm:text-[10px] lg:text-[11px]"
              routerLink="/nosotros"
              (click)="closeMenu()"
              >Nosotros</a
            >
          </nav>
          <a
            class="absolute left-1/2 top-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 font-sans text-[8px] font-extrabold tracking-[-.035em]"
            routerLink="/"
            (click)="closeMenu()"
            aria-label="Codera, inicio"
          >
            <span
              class="grid size-[22px] place-items-center rounded-[5px] bg-[#13150f] text-white [&_mat-icon]:size-[13px] [&_mat-icon]:text-[13px]"
              ><mat-icon aria-hidden="true">route</mat-icon></span
            >
            <span>CODERA</span>
          </a>
          <div class="ml-auto flex items-center justify-end gap-3.5">
            <a
              class="hidden text-[11px] font-medium transition-opacity hover:opacity-60 sm:inline"
              href="#idioma"
              (click)="$event.preventDefault()"
              >ES</a
            >
            <a
              matButton="filled"
              class="!min-h-[30px] !rounded-full !bg-[#13150f] !px-[11px] !text-[9px] !font-semibold !text-white !shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:!min-h-8 sm:!px-4 sm:!text-[10px]"
              [routerLink]="isLandingPage() ? [] : ['/']"
              fragment="contacto"
              >Solicitar demo</a
            >
          </div>
        </header>

        @if (isLandingPage()) {
          <main id="inicio" class="text-[#13150f]">
            <section>
              <div
                class="flex min-h-[335px] flex-col items-center justify-center px-6 py-[45px] text-center sm:min-h-[325px] sm:px-5 sm:pb-8 sm:pt-[38px]"
              >
                <p
                  class="mb-4 max-w-[250px] text-[9px] font-semibold uppercase leading-relaxed tracking-[.1em] text-[#767871] sm:mb-4 sm:max-w-none sm:text-[10px]"
                >
                  Una flota más inteligente empieza aquí
                </p>
                <h1
                  class="mb-3.5 font-sans text-[clamp(42px,12vw,60px)] font-bold leading-[.99] tracking-[-.065em] sm:text-[clamp(42px,6.4vw,76px)]"
                >
                  Controla tu flota.<br />Avanza sin límites.
                </h1>
                <p
                  class="mb-[23px] max-w-[335px] text-[13px] leading-[1.65] text-[#555750] sm:max-w-[440px] sm:text-sm"
                >
                  Rastreo en tiempo real, análisis avanzados y gestión sin esfuerzo: todo en una
                  plataforma poderosa.
                </p>
                <a
                  matButton="filled"
                  class="!min-h-[43px] !rounded-full !bg-[#13150f] !px-5 !text-[11px] !font-semibold !text-white !shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  href="#contacto"
                >
                  Descubre Codera
                  <mat-icon class="!ml-[7px] !size-[17px] !text-[17px]" aria-hidden="true"
                    >arrow_forward</mat-icon
                  >
                </a>
              </div>
              <div
                class="relative h-[270px] overflow-hidden bg-[#b8b4a8] sm:h-[clamp(260px,39vw,510px)]"
              >
                <img
                  ngSrc="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=85"
                  alt="Camión de carga recorriendo una carretera entre montañas"
                  fill
                  priority
                  sizes="(max-width: 700px) 100vw, 90vw"
                  class="object-cover object-[55%_center] sm:object-[center_53%]"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-[#11150d77] to-transparent"
                ></div>
                <div
                  class="absolute bottom-[27px] right-[7%] z-[1] flex items-center gap-2 text-[11px] text-white"
                >
                  <span class="size-2 rounded-full bg-[#8fe6a6] ring-4 ring-[#8fe6a63b]"></span>
                  <span>Tu operación, en movimiento</span>
                </div>
              </div>
            </section>

            <section
              class="bg-[#f5f5f3] px-[22px] py-[65px] sm:px-[6%] sm:py-[72px] lg:px-[8%] lg:py-[94px]"
              id="soluciones"
            >
              <div class="mx-auto mb-[25px] max-w-[590px] text-center sm:mb-9">
                <p
                  class="mb-2.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#767871]"
                >
                  Menos fricción. Más futuro.
                </p>
                <h2
                  class="mb-[11px] font-sans text-[30px] font-bold leading-[1.05] tracking-[-.065em] sm:text-[clamp(28px,3.4vw,40px)]"
                >
                  Resultados que impulsan tu negocio.
                </h2>
                <p class="text-xs leading-[1.7] text-[#73756f] sm:text-[13px]">
                  La tecnología adecuada hace que cada kilómetro cuente.
                </p>
              </div>
              <div
                class="mx-auto grid max-w-[920px] grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-[15px]"
              >
                @for (benefit of benefits; track benefit.value) {
                  <article
                    class="grid min-h-0 grid-cols-[1fr_auto] rounded-[13px] border border-[#ededea] bg-white p-[18px] shadow-[0_10px_35px_#17191408] sm:block sm:min-h-[190px] sm:p-6"
                  >
                    <span
                      class="col-span-2 mb-[13px] block text-[10px] text-[#757770] sm:mb-[23px]"
                      >{{ benefit.label }}</span
                    >
                    <strong
                      class="col-start-2 row-span-2 row-start-2 self-center font-sans text-4xl leading-none tracking-[-.07em] sm:mb-0 sm:block sm:text-[37px]"
                      >{{ benefit.value }}</strong
                    >
                    <h3 class="mb-1.5 text-[13px] font-semibold sm:mb-[9px]">
                      {{ benefit.title }}
                    </h3>
                    <p
                      class="mb-0 max-w-[230px] text-[11px] leading-[1.6] text-[#73756f] sm:max-w-[210px]"
                    >
                      {{ benefit.description }}
                    </p>
                  </article>
                }
              </div>
            </section>

            <section
              class="grid grid-cols-1 items-center gap-[30px] px-[22px] py-[65px] sm:grid-cols-2 sm:gap-[6%] sm:px-[6%] sm:py-[72px] lg:gap-[9%] lg:px-[8%] lg:py-[105px]"
              id="nosotros"
            >
              <div class="relative order-2 min-w-0 sm:order-1">
                <img
                  ngSrc="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1100&h=900&q=85"
                  alt="Camión de carga listo para iniciar su ruta"
                  width="1100"
                  height="900"
                  loading="lazy"
                  sizes="(max-width: 700px) 100vw, 45vw"
                />
                <div
                  class="absolute bottom-3.5 right-3.5 flex items-center gap-2.5 rounded-[10px] border border-white/50 bg-white/95 px-[15px] py-3 text-[10px] leading-[1.4] shadow-[0_8px_25px_#00000012]"
                >
                  <span class="size-2 rounded-full bg-[#8fe6a6] ring-4 ring-[#8fe6a63b]"></span>
                  <span
                    >Todo conectado<br /><strong class="font-bold">Todo bajo control</strong></span
                  >
                </div>
              </div>
              <div class="order-1 max-w-[450px] sm:order-2">
                <p
                  class="mb-2.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#767871]"
                >
                  Una sola plataforma
                </p>
                <h2
                  class="mb-[15px] font-sans text-[30px] font-bold leading-[1.05] tracking-[-.065em] sm:text-[clamp(28px,3.4vw,40px)]"
                >
                  Tu flota y tu negocio, siempre en sintonía.
                </h2>
                <p class="mb-[22px] text-[13px] leading-[1.7] text-[#73756f]">
                  Con Codera, cada vehículo se convierte en una fuente de información útil.
                  Anticípate a los imprevistos, cuida a tus conductores y toma decisiones con
                  confianza.
                </p>
                <a class="inline-flex items-center text-xs font-semibold" href="#compatibilidad">
                  Conoce cómo funciona
                  <mat-icon
                    class="!ml-1.5 !size-[17px] !text-[17px] transition-transform hover:translate-x-1"
                    aria-hidden="true"
                    >arrow_forward</mat-icon
                  >
                </a>
              </div>
            </section>

            <section
              class="bg-[#f5f5f3] px-[22px] py-[65px] sm:px-[6%] sm:py-[72px] lg:px-[8%] lg:py-[94px]"
              id="resultados"
            >
              <div class="mx-auto mb-[25px] max-w-[590px] text-center sm:mb-9">
                <p
                  class="mb-2.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#767871]"
                >
                  Historias reales. Impacto medible.
                </p>
                <h2
                  class="mb-[11px] font-sans text-[30px] font-bold leading-[1.05] tracking-[-.065em] sm:text-[clamp(28px,3.4vw,40px)]"
                >
                  Los resultados hablan por sí solos.
                </h2>
                <p class="text-xs leading-[1.7] text-[#73756f] sm:text-[13px]">
                  Conoce cómo las empresas están avanzando con Codera.
                </p>
              </div>
              <article
                class="mx-auto max-w-[850px] rounded-[15px] border border-[#ededeb] bg-white px-5 py-7 shadow-[0_14px_45px_#17191409] sm:px-[42px] sm:pb-[25px] sm:pt-[35px]"
              >
                <div class="relative mx-auto mb-[25px] max-w-[600px] pl-[13px] sm:pl-0">
                  <span
                    class="absolute -left-[3px] -top-[13px] font-serif text-[32px] text-[#a1e9b3] sm:-left-[30px] sm:-top-3 sm:text-[42px]"
                    >“</span
                  >
                  <p
                    class="mb-[14px] pl-[13px] font-sans text-base font-medium leading-[1.45] tracking-[-.025em] sm:text-[clamp(16px,2.1vw,20px)]"
                  >
                    Desde que implementamos Codera, nuestra flota alcanzó un nuevo nivel de
                    eficiencia. En seis meses,
                    <strong class="text-[#27894a]">redujimos nuestros costos en un 27%.</strong>
                  </p>
                  <div class="flex items-center gap-[9px] pl-[13px]">
                    <span
                      class="grid size-[30px] place-items-center rounded-full bg-[#e1eee4] text-[10px] font-bold text-[#27653b]"
                      >JA</span
                    >
                    <span
                      ><strong class="block text-[10px]">Jorge Anderson</strong
                      ><small class="mt-0.5 block text-[9px] text-[#73756f]"
                        >Director de operaciones · Grupo Logístico</small
                      ></span
                    >
                  </div>
                </div>
                <div
                  class="relative h-[127px] px-1 sm:h-[145px] sm:px-[34px]"
                  role="img"
                  aria-label="La eficiencia aumentó del 50 al 73 por ciento"
                >
                  <div
                    class="absolute bottom-5 right-0 top-[5px] flex flex-col justify-between text-[9px] text-[#9a9b96]"
                  >
                    <span>100%</span><span>73%</span>
                  </div>
                  <svg
                    class="h-[95px] w-full overflow-visible sm:h-[110px]"
                    viewBox="0 0 720 185"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      class="fill-none stroke-[#e8e9e6] [stroke-dasharray:3_5] [stroke-width:1]"
                      d="M0 35H720M0 95H720M0 155H720"
                    />
                    <path
                      class="fill-none stroke-[#50b879] [stroke-width:2.3]"
                      d="M0 36 C135 32 185 40 260 78 S390 141 510 151 S635 158 720 160"
                    />
                    <circle
                      class="fill-[#50b879] stroke-[#d8f1df] [stroke-width:7]"
                      cx="8"
                      cy="36"
                      r="7"
                    />
                  </svg>
                  <div class="flex justify-between text-[9px] text-[#9a9b96]">
                    <span>Marzo</span><span>Mayo</span><span>Julio</span><span>Septiembre</span>
                  </div>
                </div>
              </article>
              <div
                class="mx-auto mt-5 flex max-w-[760px] flex-wrap items-center justify-center gap-[7px] sm:gap-3"
                aria-label="Empresas que confían en Codera"
              >
                <span
                  class="rounded border border-[#e8e8e5] px-2 py-1.5 text-center font-sans text-[9px] font-bold leading-none text-[#73756f] sm:px-[11px] sm:py-[7px] sm:text-[10px]"
                  >JDX Logistics</span
                ><span
                  class="rounded border border-[#e8e8e5] px-2 py-1.5 text-center font-sans text-[9px] font-bold leading-none text-[#73756f] sm:px-[11px] sm:py-[7px] sm:text-[10px]"
                  >GLOBAL<br />LOGISTICS</span
                ><span
                  class="rounded border border-[#e8e8e5] px-2 py-1.5 text-center font-sans text-[9px] font-bold leading-none text-[#73756f] sm:px-[11px] sm:py-[7px] sm:text-[10px]"
                  >FedEx</span
                >
                <span
                  class="rounded border border-[#e8e8e5] px-2 py-1.5 text-center font-sans text-[9px] font-bold leading-none text-[#73756f] sm:px-[11px] sm:py-[7px] sm:text-[10px]"
                  >amazon</span
                ><span
                  class="rounded border border-[#e8e8e5] px-2 py-1.5 text-center font-sans text-[9px] font-bold leading-none text-[#73756f] sm:px-[11px] sm:py-[7px] sm:text-[10px]"
                  >ExpoMobil</span
                >
              </div>
            </section>

            <section
              class="grid grid-cols-1 items-center gap-[30px] px-[22px] py-[65px] sm:grid-cols-[1fr_.9fr] sm:gap-[6%] sm:px-[6%] sm:py-[72px] lg:gap-[11%] lg:px-[8%] lg:py-[94px]"
              id="compatibilidad"
            >
              <div>
                <p
                  class="mb-2.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#767871]"
                >
                  Diseñada para tu operación
                </p>
                <h2
                  class="mb-[30px] max-w-[400px] font-sans text-[30px] font-bold leading-[1.05] tracking-[-.065em] sm:text-[clamp(28px,3.4vw,40px)]"
                >
                  Compatible con tu negocio.
                </h2>
                <div class="grid gap-[17px] sm:gap-5">
                  @for (feature of features; track feature.title) {
                    <article class="grid grid-cols-[23px_1fr] gap-[11px]">
                      <mat-icon
                        class="!size-[17px] !text-[17px] !text-[#373a33]"
                        aria-hidden="true"
                        >{{ feature.icon }}</mat-icon
                      >
                      <div>
                        <h3 class="mb-1 text-xs font-bold">{{ feature.title }}</h3>
                        <p class="mb-0 max-w-[380px] text-[11px] leading-[1.6] text-[#73756f]">
                          {{ feature.description }}
                        </p>
                      </div>
                    </article>
                  }
                </div>
              </div>
              <div class="relative min-w-0">
                <img
                  ngSrc="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1100&h=1200&q=85"
                  alt="Vehículo de transporte en una ruta comercial"
                  width="1100"
                  height="1200"
                  class="block h-[300px] w-full rounded-[13px] object-cover sm:h-[clamp(320px,38vw,465px)]"
                  loading="lazy"
                  sizes="(max-width: 700px) 100vw, 42vw"
                />
                <span
                  class="absolute bottom-[13px] left-[13px] flex items-center gap-1.5 rounded-[10px] border border-white/50 bg-white/95 px-[15px] py-3 text-[10px] leading-[1.4] shadow-[0_8px_25px_#00000012]"
                  ><mat-icon class="!size-4 !text-base !text-[#358b4f]" aria-hidden="true"
                    >verified</mat-icon
                  >
                  Listo para crecer contigo</span
                >
              </div>
            </section>

            <section
              class="bg-[#f5f5f3] px-[22px] py-[65px] sm:px-[6%] sm:py-[72px] lg:px-[8%] lg:py-[90px]"
              id="noticias"
            >
              <div class="mx-auto mb-[25px] max-w-[590px] text-center sm:mb-9">
                <p
                  class="mb-2.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#767871]"
                >
                  Ideas para seguir avanzando
                </p>
                <h2
                  class="mb-[11px] font-sans text-[30px] font-bold leading-[1.05] tracking-[-.065em] sm:text-[clamp(28px,3.4vw,40px)]"
                >
                  Novedades y actualizaciones.
                </h2>
                <p class="text-xs leading-[1.7] text-[#73756f] sm:text-[13px]">
                  Las últimas tendencias e innovaciones para tu flota.
                </p>
              </div>
              <div
                class="mx-auto grid max-w-[1030px] grid-cols-1 gap-[13px] sm:grid-cols-3 sm:gap-[15px]"
              >
                @for (article of visibleArticles(); track article.title) {
                  <article
                    class="grid grid-cols-[40%_1fr] overflow-hidden rounded-xl border border-[#ecece9] bg-white shadow-[0_8px_28px_#17191408] transition duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_34px_#17191412] sm:block"
                  >
                    <div
                      class="relative min-h-[170px] overflow-hidden bg-[#e5e4dc] sm:h-[155px] sm:min-h-0"
                    >
                      <img
                        [ngSrc]="article.image"
                        [alt]="article.imageAlt"
                        fill
                        loading="lazy"
                        sizes="(max-width: 700px) 100vw, 30vw"
                      />
                      <span
                        class="absolute left-2.5 top-2.5 rounded-full bg-white px-2 py-[5px] text-[9px] font-semibold"
                        >{{ article.category }}</span
                      >
                    </div>
                    <div class="flex flex-col items-start p-4 sm:p-[17px] sm:pb-3.5">
                      <h3
                        class="mb-2 text-[13px] font-bold leading-[1.4] tracking-[-.02em] sm:mb-2 sm:min-h-[42px] sm:text-sm"
                      >
                        {{ article.title }}
                      </h3>
                      <p
                        class="mb-2.5 text-[10px] leading-[1.6] text-[#73756f] sm:mb-[14px] sm:min-h-9 sm:text-[11px]"
                      >
                        {{ article.description }}
                      </p>
                      <a
                        href="#contacto"
                        class="inline-flex items-center gap-[5px] text-[10px] font-bold"
                        >Leer artículo
                        <mat-icon class="!size-3.5 !text-sm" aria-hidden="true"
                          >arrow_outward</mat-icon
                        ></a
                      >
                      <time class="mt-auto pt-3 text-[9px] text-[#858780] sm:mt-[13px] sm:pt-0">{{
                        article.date
                      }}</time>
                    </div>
                  </article>
                }
              </div>
              <div class="mt-[27px] flex justify-center">
                <button
                  matButton="filled"
                  class="!min-h-[39px] !rounded-full !bg-[#13150f] !px-5 !text-[11px] !font-semibold !text-white !shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  type="button"
                  (click)="toggleAllArticles()"
                >
                  {{ showAllArticles() ? 'Ver menos' : 'Ver todas las noticias' }}
                </button>
              </div>
            </section>

            <section
              class="grid grid-cols-1 items-start gap-[27px] px-[22px] py-[65px] sm:grid-cols-[.7fr_1.3fr] sm:gap-[6%] sm:px-[6%] sm:py-[72px] lg:gap-[10%] lg:px-[8%] lg:py-[95px]"
              id="preguntas"
            >
              <div class="sm:sticky sm:top-[25px]">
                <p
                  class="mb-2.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#767871]"
                >
                  ¿Tienes preguntas?
                </p>
                <h2
                  class="mb-[17px] max-w-[350px] font-sans text-[30px] font-bold leading-[1.05] tracking-[-.065em] sm:max-w-[320px] sm:text-[clamp(28px,3.4vw,40px)]"
                >
                  Preguntas frecuentes.
                </h2>
                <p class="max-w-[300px] text-xs leading-[1.7] text-[#73756f]">
                  ¿No encuentras lo que buscas?
                  <a
                    class="font-semibold text-[#286d3e] underline underline-offset-[3px]"
                    href="#contacto"
                    >Conversemos</a
                  >, estamos aquí para ayudarte.
                </p>
              </div>
              <div class="w-full">
                @for (faq of faqs; track faq.question; let index = $index) {
                  <section class="border-t border-[#e8e8e5]">
                    <button
                      class="flex min-h-[58px] w-full items-center justify-between gap-[15px] bg-transparent px-1 py-2.5 text-left text-xs font-semibold focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286d3e] sm:text-[13px]"
                      type="button"
                      [attr.aria-expanded]="faqOpenIndex() === index"
                      [attr.aria-controls]="'faq-answer-' + index"
                      (click)="toggleFaq(index)"
                    >
                      <span>{{ faq.question }}</span>
                      <mat-icon class="!size-[18px] !text-[18px]" aria-hidden="true">{{
                        faqOpenIndex() === index ? 'remove' : 'add'
                      }}</mat-icon>
                    </button>
                    <div
                      class="px-1 pb-px pr-7"
                      [id]="'faq-answer-' + index"
                      [hidden]="faqOpenIndex() !== index"
                    >
                      <p class="mb-4 max-w-[560px] text-xs leading-[1.7] text-[#73756f]">
                        {{ faq.answer }}
                      </p>
                    </div>
                  </section>
                }
              </div>
            </section>

            <section
              class="mx-5 mb-14 flex flex-col items-start gap-[23px] rounded-[13px] bg-[#11150e] px-[23px] py-[29px] text-white sm:mx-[6%] sm:mb-[75px] sm:flex-row sm:items-center sm:justify-between sm:gap-[30px] sm:px-[34px] sm:py-[34px] lg:mx-[8%] lg:px-12 lg:py-[42px]"
              id="contacto"
            >
              <div>
                <p
                  class="mb-2.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#b6c5b5]"
                >
                  El siguiente paso empieza hoy
                </p>
                <h2
                  class="mb-2.5 font-sans text-[26px] font-medium leading-[1.15] tracking-[-.05em] sm:text-[clamp(23px,3vw,34px)]"
                >
                  Más eficiencia. Menos costos.<br />Una flota más segura.
                </h2>
                <p class="mb-0 max-w-[490px] text-[11px] leading-[1.6] text-[#d1d3cd] sm:text-xs">
                  Cuéntanos qué necesita tu operación. Te ayudamos a encontrar el camino.
                </p>
              </div>
              <form
                class="grid w-full max-w-[540px] gap-2 text-[#13150f]"
                (submit)="requestDemo($event)"
              >
                <div class="grid gap-2 sm:grid-cols-2">
                  <mat-form-field appearance="outline" subscriptSizing="dynamic">
                    <mat-label>Tu nombre</mat-label>
                    <input matInput autocomplete="name" [formControl]="demoNameControl" />
                    @if (demoNameControl.invalid && demoNameControl.touched) {
                      <mat-error>Escribe tu nombre.</mat-error>
                    }
                  </mat-form-field>
                  <mat-form-field appearance="outline" subscriptSizing="dynamic">
                    <mat-label>Empresa</mat-label>
                    <input
                      matInput
                      autocomplete="organization"
                      [formControl]="demoCompanyControl"
                    />
                    @if (demoCompanyControl.invalid && demoCompanyControl.touched) {
                      <mat-error>Escribe el nombre de tu empresa.</mat-error>
                    }
                  </mat-form-field>
                </div>
                <mat-form-field appearance="outline" subscriptSizing="dynamic">
                  <mat-label>Correo electrónico</mat-label>
                  <input
                    matInput
                    type="email"
                    autocomplete="email"
                    [formControl]="demoEmailControl"
                  />
                  @if (demoEmailControl.invalid && demoEmailControl.touched) {
                    <mat-error>Escribe un correo electrónico válido.</mat-error>
                  }
                </mat-form-field>
                <mat-form-field appearance="outline" subscriptSizing="dynamic">
                  <mat-label>¿Qué necesita tu flota? (opcional)</mat-label>
                  <textarea matInput rows="2" [formControl]="demoMessageControl"></textarea>
                </mat-form-field>
                <div class="flex flex-wrap items-center gap-3">
                  <button
                    matButton="filled"
                    class="!min-h-[42px] !rounded-full !bg-white !px-5 !text-[11px] !font-semibold !text-[#13150f] !shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                    type="submit"
                    [disabled]="demoSubmitting()"
                  >
                    {{ demoSubmitting() ? 'Enviando…' : 'Solicitar demostración' }}
                  </button>
                  @if (demoMessage()) {
                    <p class="text-xs text-white" role="status">{{ demoMessage() }}</p>
                  }
                  @if (demoError()) {
                    <p class="text-xs text-red-200" role="alert">{{ demoError() }}</p>
                  }
                </div>
              </form>
            </section>
          </main>

          <footer class="px-5 sm:px-[6%] lg:px-[8%]">
            <div
              class="grid grid-cols-1 gap-7 pb-[26px] sm:grid-cols-[1fr_1.4fr] sm:gap-[35px] sm:pb-[35px] lg:grid-cols-[1fr_1.4fr_1.2fr]"
            >
              <a
                class="row-start-1 flex w-fit items-center gap-[7px] self-start font-sans text-[10px] font-extrabold tracking-[-.035em]"
                href="#inicio"
              >
                <span
                  class="grid size-[18px] place-items-center rounded-[5px] bg-[#13150f] text-white [&_mat-icon]:!size-[13px] [&_mat-icon]:!text-[13px]"
                  ><mat-icon aria-hidden="true">route</mat-icon></span
                >
                <span>CODERA</span>
              </a>
              <form class="row-start-2 sm:row-start-1" (submit)="subscribe($event)">
                <label class="mb-[11px] block text-xs font-semibold" for="newsletter-email"
                  >Recibe ideas para una flota mejor.</label
                >
                <div class="flex items-start gap-[5px] sm:gap-2">
                  <mat-form-field
                    class="!min-w-0 !flex-1"
                    appearance="outline"
                    subscriptSizing="dynamic"
                  >
                    <mat-label>Tu correo electrónico</mat-label>
                    <input
                      matInput
                      id="newsletter-email"
                      type="email"
                      autocomplete="email"
                      [formControl]="emailControl"
                    />
                    @if (emailControl.invalid && emailControl.touched) {
                      <mat-error>Escribe un correo electrónico válido.</mat-error>
                    }
                  </mat-form-field>
                  <button
                    matButton="filled"
                    class="!min-h-[50px] !rounded-full !bg-[#13150f] !px-[11px] !text-[10px] !font-semibold !text-white !shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:!px-[15px]"
                    type="submit"
                  >
                    {{ newsletterSubmitting() ? 'Enviando…' : 'Suscribirme' }}
                  </button>
                </div>
                <div>
                  <mat-checkbox class="text-white" [formControl]="newsletterConsentControl">
                    Acepto recibir novedades de Codera por correo.
                  </mat-checkbox>
                  @if (newsletterConsentControl.invalid && newsletterConsentControl.touched) {
                    <p class="ml-3 text-[11px] text-red-700" role="alert">
                      Necesitas aceptar para suscribirte.
                    </p>
                  }
                </div>
                @if (subscriptionMessage()) {
                  <p class="mt-[5px] text-[11px] text-[#26703c]" role="status">
                    {{ subscriptionMessage() }}
                  </p>
                }
                @if (newsletterError()) {
                  <p class="mt-[5px] text-[11px] text-red-700" role="alert">
                    {{ newsletterError() }}
                  </p>
                }
              </form>
              <nav
                class="row-start-3 grid grid-cols-3 gap-3 justify-self-stretch sm:col-span-2 sm:max-w-[550px] sm:justify-self-end lg:col-span-1 lg:row-start-1 lg:max-w-none"
                aria-label="Enlaces del sitio"
              >
                <div class="flex flex-col items-start gap-[9px]">
                  <strong class="mb-0.5 text-[9px] sm:text-[10px]">Explora</strong
                  ><a
                    class="text-[9px] text-[#73756f] transition-opacity hover:opacity-60 sm:text-[10px]"
                    routerLink="/soluciones"
                    >Soluciones</a
                  ><a
                    class="text-[9px] text-[#73756f] transition-opacity hover:opacity-60 sm:text-[10px]"
                    routerLink="/resultados"
                    >Resultados</a
                  ><a
                    class="text-[9px] text-[#73756f] transition-opacity hover:opacity-60 sm:text-[10px]"
                    href="#noticias"
                    >Noticias</a
                  >
                </div>
                <div class="flex flex-col items-start gap-[9px]">
                  <strong class="mb-0.5 text-[9px] sm:text-[10px]">Codera</strong
                  ><a
                    class="text-[9px] text-[#73756f] transition-opacity hover:opacity-60 sm:text-[10px]"
                    routerLink="/nosotros"
                    >Nosotros</a
                  ><a
                    class="text-[9px] text-[#73756f] transition-opacity hover:opacity-60 sm:text-[10px]"
                    routerLink="/"
                    fragment="preguntas"
                    >Preguntas frecuentes</a
                  ><a
                    class="text-[9px] text-[#73756f] transition-opacity hover:opacity-60 sm:text-[10px]"
                    routerLink="/"
                    fragment="contacto"
                    >Contacto</a
                  >
                </div>
                <div class="flex flex-col items-start gap-[9px]">
                  <strong class="mb-0.5 text-[9px] sm:text-[10px]">Información</strong
                  ><a
                    class="text-[9px] text-[#73756f] transition-opacity hover:opacity-60 sm:text-[10px]"
                    href="#privacidad"
                    >Privacidad</a
                  ><a
                    class="text-[9px] text-[#73756f] transition-opacity hover:opacity-60 sm:text-[10px]"
                    href="#terminos"
                    >Términos de servicio</a
                  >
                </div>
              </nav>
            </div>
            <div
              class="flex min-h-[49px] items-center justify-between gap-2.5 border-t border-[#efefed] text-[8px] text-[#73756f] sm:text-[9px]"
            >
              <span>© 2026 Codera. Todos los derechos reservados.</span>
              <a class="font-semibold text-[#13150f]" routerLink="/">Volver arriba ↑</a>
            </div>
          </footer>
        } @else {
          <router-outlet />
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly pageTitle = inject(Title);
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isLandingPage = signal(true);
  protected readonly menuOpen = signal(false);

  constructor() {
    this.isLandingPage.set(this.router.url.split(/[?#]/, 1)[0] === '/');
    this.pageTitle.setTitle('Codera — Gestión inteligente de flotas');
    this.document.documentElement.lang = 'es';

    if (
      !this.document.querySelector('link[rel="preconnect"][href="https://images.unsplash.com"]')
    ) {
      const imagePreconnect = this.document.createElement('link');
      imagePreconnect.rel = 'preconnect';
      imagePreconnect.href = 'https://images.unsplash.com';
      this.document.head.appendChild(imagePreconnect);
    }

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ urlAfterRedirects }) => {
        this.isLandingPage.set(urlAfterRedirects.split(/[?#]/, 1)[0] === '/');
        this.closeMenu();
      });
  }

  protected readonly showAllArticles = signal(false);
  protected readonly faqOpenIndex = signal<number | null>(null);
  protected readonly subscriptionMessage = signal('');
  protected readonly newsletterError = signal('');
  protected readonly newsletterSubmitting = signal(false);
  protected readonly demoMessage = signal('');
  protected readonly demoError = signal('');
  protected readonly demoSubmitting = signal(false);
  protected readonly emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  protected readonly newsletterConsentControl = new FormControl(false, {
    nonNullable: true,
    validators: [Validators.requiredTrue],
  });
  protected readonly demoNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(120)],
  });
  protected readonly demoCompanyControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(160)],
  });
  protected readonly demoEmailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email, Validators.maxLength(254)],
  });
  protected readonly demoMessageControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.maxLength(2000)],
  });

  protected readonly benefits = [
    {
      label: 'Tiempo',
      value: '20%',
      title: 'Más puntualidad',
      description: 'Automatiza tus procesos y dedica más tiempo a lo que importa.',
    },
    {
      label: 'Seguridad',
      value: '50%',
      title: 'Menos incidentes',
      description: 'Analiza hábitos de manejo y cuida mejor a tus conductores.',
    },
    {
      label: 'Eficiencia',
      value: '30%',
      title: 'Menos costos',
      description: 'Optimiza rutas y reduce el gasto de combustible.',
    },
  ];

  protected readonly features = [
    {
      icon: 'devices',
      title: 'Se integra con tus herramientas.',
      description:
        'Conecta tus sistemas actuales y mantén la información de tu operación en un solo lugar.',
    },
    {
      icon: 'settings_suggest',
      title: 'Compatible con tu flota.',
      description: 'Funciona con GPS, sensores, vehículos y las plataformas que ya utilizas.',
    },
    {
      icon: 'hub',
      title: 'Una API para crecer.',
      description: 'Conecta Codera con tus soluciones y crea un flujo de trabajo a tu medida.',
    },
    {
      icon: 'rocket_launch',
      title: 'Puesta en marcha sencilla.',
      description: 'Empieza rápido con acompañamiento y soporte de nuestro equipo.',
    },
  ];

  protected readonly articles = [
    {
      image:
        'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=720&h=440&q=80',
      imageAlt: 'Camión de carga en carretera',
      category: 'Integraciones',
      title: 'Conecta tu flota con las herramientas que ya utilizas.',
      description: 'Integra tus sistemas y simplifica cada operación.',
      date: '12 JUN 2026',
    },
    {
      image:
        'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=720&h=440&q=80',
      imageAlt: 'Punto de carga para vehículo eléctrico',
      category: 'Sostenibilidad',
      title: 'Vehículos eléctricos: una ruta hacia flotas más limpias.',
      description: 'Datos útiles para planear una transición más inteligente.',
      date: '04 JUN 2026',
    },
    {
      image:
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=720&h=440&q=80',
      imageAlt: 'Camión recorriendo una ruta montañosa',
      category: 'Tecnología',
      title: 'La tecnología que está transformando las rutas.',
      description: 'Así optimizan sus recorridos las flotas de alto rendimiento.',
      date: '28 MAY 2026',
    },
    {
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=720&h=440&q=80',
      imageAlt: 'Centro de distribución y logística',
      category: 'Operaciones',
      title: 'Cuatro maneras de reducir los tiempos de entrega.',
      description: 'Pequeños cambios en tus datos pueden lograr grandes mejoras.',
      date: '19 MAY 2026',
    },
    {
      image:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=720&h=440&q=80',
      imageAlt: 'Vehículo moderno listo para salir a la ruta',
      category: 'Seguridad',
      title: 'Una conducción más segura comienza con información.',
      description: 'Convierte cada viaje en una oportunidad de aprender.',
      date: '08 MAY 2026',
    },
    {
      image:
        'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=720&h=440&q=80',
      imageAlt: 'Paquetes listos para su distribución',
      category: 'Tendencias',
      title: 'Lo que necesitas saber sobre la logística del futuro.',
      description: 'Tendencias prácticas para preparar tu operación.',
      date: '30 ABR 2026',
    },
  ];

  protected readonly faqs = [
    {
      question: '¿Qué tan rápido puedo empezar a usar Codera?',
      answer:
        'Nuestro equipo te acompaña durante la configuración. La mayoría de las flotas puede empezar a ver sus vehículos y datos en pocos días.',
    },
    {
      question: '¿Con qué tipos de vehículos es compatible?',
      answer:
        'Codera funciona con una amplia variedad de vehículos comerciales y se conecta con los dispositivos GPS y sensores compatibles que ya utilizas.',
    },
    {
      question: '¿Puedo integrar Codera con mis sistemas actuales?',
      answer:
        'Sí. Puedes conectar tus herramientas mediante nuestras integraciones y API para mantener tus flujos de trabajo actuales.',
    },
    {
      question: '¿Cómo puedo acceder a los datos de mi flota?',
      answer:
        'Accede a información de rutas, vehículos y rendimiento desde el panel de Codera, disponible en tus dispositivos.',
    },
    {
      question: '¿Ofrecen soporte técnico?',
      answer:
        'Sí. Nuestro equipo de soporte está disponible para resolver tus dudas y ayudarte a sacar el mayor provecho de la plataforma.',
    },
    {
      question: '¿Cómo ayuda Codera a reducir costos?',
      answer:
        'El análisis de rutas, combustible y hábitos de manejo te permite identificar oportunidades y tomar decisiones con datos reales.',
    },
    {
      question: '¿Mis datos están seguros?',
      answer:
        'La seguridad de tus datos es una prioridad. Codera utiliza controles de acceso y prácticas de protección para cuidar tu información.',
    },
    {
      question: '¿Puedo probar la plataforma antes de contratar?',
      answer:
        'Claro. Agenda una demostración para conocer la plataforma y conversar sobre las necesidades específicas de tu negocio.',
    },
  ];

  protected visibleArticles() {
    return this.showAllArticles() ? this.articles : this.articles.slice(0, 3);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected toggleAllArticles(): void {
    this.showAllArticles.update((showAll) => !showAll);
  }

  protected toggleFaq(index: number): void {
    this.faqOpenIndex.update((openIndex) => (openIndex === index ? null : index));
  }

  protected subscribe(event: SubmitEvent): void {
    event.preventDefault();
    this.emailControl.markAsTouched();
    this.newsletterConsentControl.markAsTouched();
    if (
      this.emailControl.invalid ||
      this.newsletterConsentControl.invalid ||
      this.newsletterSubmitting()
    ) {
      return;
    }

    this.newsletterSubmitting.set(true);
    this.subscriptionMessage.set('');
    this.newsletterError.set('');
    this.http
      .post<{ message: string }>('/api/newsletter', {
        email: this.emailControl.value,
        consent: this.newsletterConsentControl.value,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ message }) => {
          this.subscriptionMessage.set(message);
          this.emailControl.reset();
          this.newsletterConsentControl.reset();
          this.newsletterSubmitting.set(false);
        },
        error: () => {
          this.newsletterError.set('No se pudo registrar tu correo. Inténtalo de nuevo.');
          this.newsletterSubmitting.set(false);
        },
      });
  }

  protected requestDemo(event: SubmitEvent): void {
    event.preventDefault();
    this.demoNameControl.markAsTouched();
    this.demoCompanyControl.markAsTouched();
    this.demoEmailControl.markAsTouched();
    this.demoMessageControl.markAsTouched();

    if (
      this.demoNameControl.invalid ||
      this.demoCompanyControl.invalid ||
      this.demoEmailControl.invalid ||
      this.demoMessageControl.invalid ||
      this.demoSubmitting()
    ) {
      return;
    }

    this.demoSubmitting.set(true);
    this.demoMessage.set('');
    this.demoError.set('');
    this.http
      .post<{ message: string }>('/api/demo', {
        name: this.demoNameControl.value,
        email: this.demoEmailControl.value,
        company: this.demoCompanyControl.value,
        message: this.demoMessageControl.value,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ message }) => {
          this.demoMessage.set(message);
          this.demoNameControl.reset();
          this.demoCompanyControl.reset();
          this.demoEmailControl.reset();
          this.demoMessageControl.reset();
          this.demoSubmitting.set(false);
        },
        error: () => {
          this.demoError.set('No se pudo enviar tu solicitud. Inténtalo de nuevo.');
          this.demoSubmitting.set(false);
        },
      });
  }
}
