/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonVehicleRouteDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route-delete-dialog.component';
import { JsonVehicleRouteService } from '../../../../../../main/webapp/app/entities/json-vehicle-route/json-vehicle-route.service';

describe('Component Tests', () => {

    describe('JsonVehicleRoute Management Delete Component', () => {
        let comp: JsonVehicleRouteDeleteDialogComponent;
        let fixture: ComponentFixture<JsonVehicleRouteDeleteDialogComponent>;
        let service: JsonVehicleRouteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonVehicleRouteDeleteDialogComponent],
                providers: [
                    JsonVehicleRouteService
                ]
            })
            .overrideTemplate(JsonVehicleRouteDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonVehicleRouteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonVehicleRouteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
