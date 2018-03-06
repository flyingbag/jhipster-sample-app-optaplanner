/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonCustomerDialogComponent } from '../../../../../../main/webapp/app/entities/json-customer/json-customer-dialog.component';
import { JsonCustomerService } from '../../../../../../main/webapp/app/entities/json-customer/json-customer.service';
import { JsonCustomer } from '../../../../../../main/webapp/app/entities/json-customer/json-customer.model';

describe('Component Tests', () => {

    describe('JsonCustomer Management Dialog Component', () => {
        let comp: JsonCustomerDialogComponent;
        let fixture: ComponentFixture<JsonCustomerDialogComponent>;
        let service: JsonCustomerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonCustomerDialogComponent],
                providers: [
                    JsonCustomerService
                ]
            })
            .overrideTemplate(JsonCustomerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonCustomerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonCustomerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JsonCustomer(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jsonCustomer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jsonCustomerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JsonCustomer();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jsonCustomer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jsonCustomerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
