import { DestroyRef, Injectable, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type EditorialRoute = 'home' | 'collection' | 'about';

const ROUTE_ORDER: Record<EditorialRoute, number> = { home: 0, collection: 1, about: 2 };

@Injectable({ providedIn: 'root' })
export class RouteMotionService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private previousUrl = this.router.url;

  constructor() {
    this.router.events.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((event) => {
      if (event instanceof NavigationStart) this.setDirection(event.url);
      if (event instanceof NavigationEnd) this.previousUrl = event.urlAfterRedirects;
    });
  }

  private setDirection(nextUrl: string): void {
    if (typeof document === 'undefined') return;
    const current = this.getEditorialRoute(this.previousUrl);
    const next = this.getEditorialRoute(nextUrl);
    const direction = current && next && current !== next
      ? ROUTE_ORDER[next] > ROUTE_ORDER[current] ? 'forward' : 'back'
      : 'neutral';
    document.documentElement.dataset['routeDirection'] = direction;
  }

  private getEditorialRoute(url: string): EditorialRoute | undefined {
    const path = url.split('?')[0].split('#')[0];
    if (path === '/' || path === '') return 'home';
    if (path.startsWith('/collection')) return 'collection';
    if (path.startsWith('/about')) return 'about';
    return undefined;
  }
}
