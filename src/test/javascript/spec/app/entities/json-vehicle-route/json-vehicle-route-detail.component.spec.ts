/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonVehicleRouteDetailComponent } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route-detail.component';
import { JsonVehicleRouteService } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route.service';
import { JsonVehicleRoute } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route.model';

describe('Component Tests', () => {

    describe('JsonVehicleRoute Management Detail Component', () => {
        let comp: JsonVehicleRouteDetailComponent;
        let fixture: ComponentFixture<JsonVehicleRouteDetailComponent>;
        let service: JsonVehicleRouteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonVehicleRouteDetailComponent],
                providers: [
                    JsonVehicleRouteService
                ]
            })
            .overrideTemplate(JsonVehicleRouteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonVehicleRouteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonVehicleRouteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JsonVehicleRoute(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jsonVehicleRoute).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
