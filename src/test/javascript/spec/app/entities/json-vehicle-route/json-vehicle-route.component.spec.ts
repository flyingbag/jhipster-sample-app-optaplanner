/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonVehicleRouteComponent } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route.component';
import { JsonVehicleRouteService } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route.service';
import { JsonVehicleRoute } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route.model';

describe('Component Tests', () => {

    describe('JsonVehicleRoute Management Component', () => {
        let comp: JsonVehicleRouteComponent;
        let fixture: ComponentFixture<JsonVehicleRouteComponent>;
        let service: JsonVehicleRouteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonVehicleRouteComponent],
                providers: [
                    JsonVehicleRouteService
                ]
            })
            .overrideTemplate(JsonVehicleRouteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonVehicleRouteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonVehicleRouteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JsonVehicleRoute(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jsonVehicleRoutes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
