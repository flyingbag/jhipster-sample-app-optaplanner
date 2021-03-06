/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonVehicleRoutingSolutionDialogComponent } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution-dialog.component';
import { JsonVehicleRoutingSolutionService } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution.service';
import { JsonVehicleRoutingSolution } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution.model';

describe('Component Tests', () => {

    describe('JsonVehicleRoutingSolution Management Dialog Component', () => {
        let comp: JsonVehicleRoutingSolutionDialogComponent;
        let fixture: ComponentFixture<JsonVehicleRoutingSolutionDialogComponent>;
        let service: JsonVehicleRoutingSolutionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonVehicleRoutingSolutionDialogComponent],
                providers: [
                    JsonVehicleRoutingSolutionService
                ]
            })
            .overrideTemplate(JsonVehicleRoutingSolutionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonVehicleRoutingSolutionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonVehicleRoutingSolutionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JsonVehicleRoutingSolution(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jsonVehicleRoutingSolution = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jsonVehicleRoutingSolutionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JsonVehicleRoutingSolution();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jsonVehicleRoutingSolution = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jsonVehicleRoutingSolutionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
