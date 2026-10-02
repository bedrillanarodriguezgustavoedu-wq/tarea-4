import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-home-route',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HomeRoute {}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeRoute,
  },
  {
    path: 'soluciones',
    loadComponent: () => import('./section-page').then((module) => module.SectionPage),
    data: { sectionPage: 'soluciones' },
  },
  {
    path: 'resultados',
    loadComponent: () => import('./section-page').then((module) => module.SectionPage),
    data: { sectionPage: 'resultados' },
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./section-page').then((module) => module.SectionPage),
    data: { sectionPage: 'nosotros' },
  },
  {
    path: '**',
    loadComponent: () => import('./section-page').then((module) => module.SectionPage),
  },
];
