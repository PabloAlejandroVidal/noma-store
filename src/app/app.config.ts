import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { ActivatedRouteSnapshot, provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions({
      onViewTransitionCreated: ({ transition, from, to }) => {
        const isProductRoute = (snapshot: ActivatedRouteSnapshot) => snapshot.root.firstChild?.routeConfig?.path === 'product/:slug';
        if (isProductRoute(from) || isProductRoute(to)) transition.skipTransition();
      },
    }))
  ]
};
