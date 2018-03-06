import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleroutingSharedModule } from '../../shared';
import {
    JsonMessageService,
    JsonMessagePopupService,
    JsonMessageComponent,
    JsonMessageDetailComponent,
    JsonMessageDialogComponent,
    JsonMessagePopupComponent,
    JsonMessageDeletePopupComponent,
    JsonMessageDeleteDialogComponent,
    jsonMessageRoute,
    jsonMessagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...jsonMessageRoute,
    ...jsonMessagePopupRoute,
];

@NgModule({
    imports: [
        VehicleroutingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JsonMessageComponent,
        JsonMessageDetailComponent,
        JsonMessageDialogComponent,
        JsonMessageDeleteDialogComponent,
        JsonMessagePopupComponent,
        JsonMessageDeletePopupComponent,
    ],
    entryComponents: [
        JsonMessageComponent,
        JsonMessageDialogComponent,
        JsonMessagePopupComponent,
        JsonMessageDeleteDialogComponent,
        JsonMessageDeletePopupComponent,
    ],
    providers: [
        JsonMessageService,
        JsonMessagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleroutingJsonMessageModule {}
