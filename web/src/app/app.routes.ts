import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    // {path: '', pathMatch : 'full', redirectTo: 'example'},
    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: '', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    { path: '**', redirectTo: '' }

    // Admin routes
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     resolve: {
    //         initialData: initialDataResolver
    //     },
    //     children: [
    //         {path: 'example', loadChildren: () => import('app/modules/admin/example/example.routes')},
    //     ]
    // }
];
