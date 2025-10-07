import { Routes } from '@angular/router';
import authRoutes from './auth/auth.routes';
import { reactiveRoutes } from './reactive/reactive.routes';

export const routes: Routes = [
    {
        path: 'reactive',
        loadChildren: () => 
            import('./reactive/reactive.routes').then((m) =>reactiveRoutes),
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path: 'country',
        loadChildren: () => import('./country/country.routes').then((m) => m.countryRoutes),
    },
    {
        path: '**',
        redirectTo: 'reactive',
    },
];
