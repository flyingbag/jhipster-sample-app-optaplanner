import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { VehicleroutingJsonCustomerModule } from './json-customer/json-customer.module';
import { VehicleroutingJsonMessageModule } from './json-message/json-message.module';
import { VehicleroutingJsonVehicleRouteModule } from './json-vehicle-route/json-vehicle-route.module';
import { VehicleroutingJsonVehicleRoutingSolutionModule } from './json-vehicle-routing-solution/json-vehicle-routing-solution.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        VehicleroutingJsonCustomerModule,
        VehicleroutingJsonMessageModule,
        VehicleroutingJsonVehicleRouteModule,
        VehicleroutingJsonVehicleRoutingSolutionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleroutingEntityModule {}
