import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JsonVehicleRouteComponent } from './json-vehicle-route.component';
import { JsonVehicleRouteDetailComponent } from './json-vehicle-route-detail.component';
import { JsonVehicleRoutePopupComponent } from './json-vehicle-route-dialog.component';
import { JsonVehicleRouteDeletePopupComponent } from './json-vehicle-route-delete-dialog.component';

export const jsonVehicleRouteRoute: Routes = [
    {
        path: 'json-vehicle-route',
        component: JsonVehicleRouteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'json-vehicle-route/:id',
        component: JsonVehicleRouteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jsonVehicleRoutePopupRoute: Routes = [
    {
        path: 'json-vehicle-route-new',
        component: JsonVehicleRoutePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'json-vehicle-route/:id/edit',
        component: JsonVehicleRoutePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'json-vehicle-route/:id/delete',
        component: JsonVehicleRouteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
