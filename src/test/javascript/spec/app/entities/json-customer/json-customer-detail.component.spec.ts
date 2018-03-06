/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonCustomerDetailComponent } from '../../../../../../main/webapp/app/entities/json-customer/json-customer-detail.component';
import { JsonCustomerService } from '../../../../../../main/webapp/app/entities/json-customer/json-customer.service';
import { JsonCustomer } from '../../../../../../main/webapp/app/entities/json-customer/json-customer.model';

describe('Component Tests', () => {

    describe('JsonCustomer Management Detail Component', () => {
        let comp: JsonCustomerDetailComponent;
        let fixture: ComponentFixture<JsonCustomerDetailComponent>;
        let service: JsonCustomerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonCustomerDetailComponent],
                providers: [
                    JsonCustomerService
                ]
            })
            .overrideTemplate(JsonCustomerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonCustomerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonCustomerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JsonCustomer(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jsonCustomer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
