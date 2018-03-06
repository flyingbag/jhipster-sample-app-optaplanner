import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JsonVehicleRoutingSolutionComponent } from './json-vehicle-routing-solution.component';
import { JsonVehicleRoutingSolutionDetailComponent } from './json-vehicle-routing-solution-detail.component';
import { JsonVehicleRoutingSolutionPopupComponent } from './json-vehicle-routing-solution-dialog.component';
import { JsonVehicleRoutingSolutionDeletePopupComponent } from './json-vehicle-routing-solution-delete-dialog.component';

export const jsonVehicleRoutingSolutionRoute: Routes = [
    {
        path: 'json-vehicle-routing-solution',
        component: JsonVehicleRoutingSolutionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutingSolutions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'json-vehicle-routing-solution/:id',
        component: JsonVehicleRoutingSolutionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutingSolutions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jsonVehicleRoutingSolutionPopupRoute: Routes = [
    {
        path: 'json-vehicle-routing-solution-new',
        component: JsonVehicleRoutingSolutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutingSolutions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'json-vehicle-routing-solution/:id/edit',
        component: JsonVehicleRoutingSolutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutingSolutions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'json-vehicle-routing-solution/:id/delete',
        component: JsonVehicleRoutingSolutionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonVehicleRoutingSolutions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
