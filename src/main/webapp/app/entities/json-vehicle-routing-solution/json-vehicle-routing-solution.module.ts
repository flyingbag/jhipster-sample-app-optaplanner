import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleroutingSharedModule } from '../../shared';
import {
    JsonVehicleRoutingSolutionService,
    JsonVehicleRoutingSolutionPopupService,
    JsonVehicleRoutingSolutionComponent,
    JsonVehicleRoutingSolutionDetailComponent,
    JsonVehicleRoutingSolutionDialogComponent,
    JsonVehicleRoutingSolutionPopupComponent,
    JsonVehicleRoutingSolutionDeletePopupComponent,
    JsonVehicleRoutingSolutionDeleteDialogComponent,
    jsonVehicleRoutingSolutionRoute,
    jsonVehicleRoutingSolutionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jsonVehicleRoutingSolutionRoute,
    ...jsonVehicleRoutingSolutionPopupRoute,
];

@NgModule({
    imports: [
        VehicleroutingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JsonVehicleRoutingSolutionComponent,
        JsonVehicleRoutingSolutionDetailComponent,
        JsonVehicleRoutingSolutionDialogComponent,
        JsonVehicleRoutingSolutionDeleteDialogComponent,
        JsonVehicleRoutingSolutionPopupComponent,
        JsonVehicleRoutingSolutionDeletePopupComponent,
    ],
    entryComponents: [
        JsonVehicleRoutingSolutionComponent,
        JsonVehicleRoutingSolutionDialogComponent,
        JsonVehicleRoutingSolutionPopupComponent,
        JsonVehicleRoutingSolutionDeleteDialogComponent,
        JsonVehicleRoutingSolutionDeletePopupComponent,
    ],
    providers: [
        JsonVehicleRoutingSolutionService,
        JsonVehicleRoutingSolutionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleroutingJsonVehicleRoutingSolutionModule {}
