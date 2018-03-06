/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonVehicleRoutingSolutionComponent } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution.component';
import { JsonVehicleRoutingSolutionService } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution.service';
import { JsonVehicleRoutingSolution } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution.model';

describe('Component Tests', () => {

    describe('JsonVehicleRoutingSolution Management Component', () => {
        let comp: JsonVehicleRoutingSolutionComponent;
        let fixture: ComponentFixture<JsonVehicleRoutingSolutionComponent>;
        let service: JsonVehicleRoutingSolutionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonVehicleRoutingSolutionComponent],
                providers: [
                    JsonVehicleRoutingSolutionService
                ]
            })
            .overrideTemplate(JsonVehicleRoutingSolutionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonVehicleRoutingSolutionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonVehicleRoutingSolutionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JsonVehicleRoutingSolution(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jsonVehicleRoutingSolutions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
