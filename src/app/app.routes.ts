import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'NOMA — Objects & Tech', loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent) },
  { path: 'collection', title: 'Collection — NOMA', loadComponent: () => import('./features/collection/collection.component').then((m) => m.CollectionComponent) },
  { path: 'product/:slug', title: 'Product — NOMA', loadComponent: () => import('./features/product-detail/product-detail.component').then((m) => m.ProductDetailComponent) },
  { path: 'about', title: 'About — NOMA', loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent) },
  { path: '**', redirectTo: '' },
];
