import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JsonMessageComponent } from './json-message.component';
import { JsonMessageDetailComponent } from './json-message-detail.component';
import { JsonMessagePopupComponent } from './json-message-dialog.component';
import { JsonMessageDeletePopupComponent } from './json-message-delete-dialog.component';

export const jsonMessageRoute: Routes = [
    {
        path: 'json-message',
        component: JsonMessageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonMessages'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'json-message/:id',
        component: JsonMessageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonMessages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jsonMessagePopupRoute: Routes = [
    {
        path: 'json-message-new',
        component: JsonMessagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonMessages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'json-message/:id/edit',
        component: JsonMessagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonMessages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'json-message/:id/delete',
        component: JsonMessageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JsonMessages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
