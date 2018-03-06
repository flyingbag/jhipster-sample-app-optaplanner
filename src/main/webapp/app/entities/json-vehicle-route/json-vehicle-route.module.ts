import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleroutingSharedModule } from '../../shared';
import {
    JsonVehicleRouteService,
    JsonVehicleRoutePopupService,
    JsonVehicleRouteComponent,
    JsonVehicleRouteDetailComponent,
    JsonVehicleRouteDialogComponent,
    JsonVehicleRoutePopupComponent,
    JsonVehicleRouteDeletePopupComponent,
    JsonVehicleRouteDeleteDialogComponent,
    jsonVehicleRouteRoute,
    jsonVehicleRoutePopupRoute,
} from './';

const ENTITY_STATES = [
    ...jsonVehicleRouteRoute,
    ...jsonVehicleRoutePopupRoute,
];

@NgModule({
    imports: [
        VehicleroutingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JsonVehicleRouteComponent,
        JsonVehicleRouteDetailComponent,
        JsonVehicleRouteDialogComponent,
        JsonVehicleRouteDeleteDialogComponent,
        JsonVehicleRoutePopupComponent,
        JsonVehicleRouteDeletePopupComponent,
    ],
    entryComponents: [
        JsonVehicleRouteComponent,
        JsonVehicleRouteDialogComponent,
        JsonVehicleRoutePopupComponent,
        JsonVehicleRouteDeleteDialogComponent,
        JsonVehicleRouteDeletePopupComponent,
    ],
    providers: [
        JsonVehicleRouteService,
        JsonVehicleRoutePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleroutingJsonVehicleRouteModule {}
