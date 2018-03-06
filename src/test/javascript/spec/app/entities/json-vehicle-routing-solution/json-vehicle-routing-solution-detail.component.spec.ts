/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonVehicleRoutingSolutionDetailComponent } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution-detail.component';
import { JsonVehicleRoutingSolutionService } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution.service';
import { JsonVehicleRoutingSolution } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution.model';

describe('Component Tests', () => {

    describe('JsonVehicleRoutingSolution Management Detail Component', () => {
        let comp: JsonVehicleRoutingSolutionDetailComponent;
        let fixture: ComponentFixture<JsonVehicleRoutingSolutionDetailComponent>;
        let service: JsonVehicleRoutingSolutionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonVehicleRoutingSolutionDetailComponent],
                providers: [
                    JsonVehicleRoutingSolutionService
                ]
            })
            .overrideTemplate(JsonVehicleRoutingSolutionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonVehicleRoutingSolutionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonVehicleRoutingSolutionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JsonVehicleRoutingSolution(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jsonVehicleRoutingSolution).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
