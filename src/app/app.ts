import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { CartDrawerComponent } from './shared/cart-drawer/cart-drawer.component';
import { SiteHeaderComponent } from './shared/site-header/site-header.component';
import { RouteMotionService } from './core/services/route-motion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeaderComponent, CartDrawerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly routeMotion = inject(RouteMotionService);
  private readonly router = inject(Router);
  protected readonly isProductViewer = toSignal(this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => event.urlAfterRedirects.startsWith('/product/')),
    startWith(this.router.url.startsWith('/product/')),
  ), { initialValue: this.router.url.startsWith('/product/') });
}
