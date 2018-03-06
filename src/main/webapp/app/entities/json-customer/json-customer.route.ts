import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JsonCustomerComponent } from './json-customer.component';
import { JsonCustomerDetailComponent } from './json-customer-detail.component';
import { JsonCustomerPopupComponent } from './json-customer-dialog.component';
import { JsonCustomerDeletePopupComponent } from './json-customer-delete-dialog.component';

export const jsonCustomerRoute: Routes = [
    {
        path: 'json-customer',
        component: JsonCustomerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonCustomers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'json-customer/:id',
        component: JsonCustomerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonCustomers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jsonCustomerPopupRoute: Routes = [
    {
        path: 'json-customer-new',
        component: JsonCustomerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonCustomers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'json-customer/:id/edit',
        component: JsonCustomerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonCustomers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'json-customer/:id/delete',
        component: JsonCustomerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonCustomers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
