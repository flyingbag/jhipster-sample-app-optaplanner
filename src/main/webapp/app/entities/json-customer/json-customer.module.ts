import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleroutingSharedModule } from '../../shared';
import {
    JsonCustomerService,
    JsonCustomerPopupService,
    JsonCustomerComponent,
    JsonCustomerDetailComponent,
    JsonCustomerDialogComponent,
    JsonCustomerPopupComponent,
    JsonCustomerDeletePopupComponent,
    JsonCustomerDeleteDialogComponent,
    jsonCustomerRoute,
    jsonCustomerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jsonCustomerRoute,
    ...jsonCustomerPopupRoute,
];

@NgModule({
    imports: [
        VehicleroutingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JsonCustomerComponent,
        JsonCustomerDetailComponent,
        JsonCustomerDialogComponent,
        JsonCustomerDeleteDialogComponent,
        JsonCustomerPopupComponent,
        JsonCustomerDeletePopupComponent,
    ],
    entryComponents: [
        JsonCustomerComponent,
        JsonCustomerDialogComponent,
        JsonCustomerPopupComponent,
        JsonCustomerDeleteDialogComponent,
        JsonCustomerDeletePopupComponent,
    ],
    providers: [
        JsonCustomerService,
        JsonCustomerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleroutingJsonCustomerModule {}
