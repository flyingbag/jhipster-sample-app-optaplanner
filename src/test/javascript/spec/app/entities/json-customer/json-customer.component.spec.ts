/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonCustomerComponent } from '../../../../../../main/webapp/app/entities/json-customer/json-customer.component';
import { JsonCustomerService } from '../../../../../../main/webapp/app/entities/json-customer/json-customer.service';
import { JsonCustomer } from '../../../../../../main/webapp/app/entities/json-customer/json-customer.model';

describe('Component Tests', () => {

    describe('JsonCustomer Management Component', () => {
        let comp: JsonCustomerComponent;
        let fixture: ComponentFixture<JsonCustomerComponent>;
        let service: JsonCustomerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonCustomerComponent],
                providers: [
                    JsonCustomerService
                ]
            })
            .overrideTemplate(JsonCustomerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonCustomerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonCustomerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JsonCustomer(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jsonCustomers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
