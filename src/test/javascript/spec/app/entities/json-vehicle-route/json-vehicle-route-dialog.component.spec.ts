/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonVehicleRouteDialogComponent } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route-dialog.component';
import { JsonVehicleRouteService } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route.service';
import { JsonVehicleRoute } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route.model';

describe('Component Tests', () => {

    describe('JsonVehicleRoute Management Dialog Component', () => {
        let comp: JsonVehicleRouteDialogComponent;
        let fixture: ComponentFixture<JsonVehicleRouteDialogComponent>;
        let service: JsonVehicleRouteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonVehicleRouteDialogComponent],
                providers: [
                    JsonVehicleRouteService
                ]
            })
            .overrideTemplate(JsonVehicleRouteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonVehicleRouteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonVehicleRouteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JsonVehicleRoute(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jsonVehicleRoute = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jsonVehicleRouteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JsonVehicleRoute();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jsonVehicleRoute = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jsonVehicleRouteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
