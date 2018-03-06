/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonVehicleRoutingSolutionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution-delete-dialog.component';
import { JsonVehicleRoutingSolutionService } from '../../../../../../main/webapp/app/entities/json-vehicle-routing-solution/json-vehicle-routing-solution.service';

describe('Component Tests', () => {

    describe('JsonVehicleRoutingSolution Management Delete Component', () => {
        let comp: JsonVehicleRoutingSolutionDeleteDialogComponent;
        let fixture: ComponentFixture<JsonVehicleRoutingSolutionDeleteDialogComponent>;
        let service: JsonVehicleRoutingSolutionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonVehicleRoutingSolutionDeleteDialogComponent],
                providers: [
                    JsonVehicleRoutingSolutionService
                ]
            })
            .overrideTemplate(JsonVehicleRoutingSolutionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonVehicleRoutingSolutionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonVehicleRoutingSolutionService);
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
