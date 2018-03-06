/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonMessageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/json-message/json-message-delete-dialog.component';
import { JsonMessageService } from '../../../../../../main/webapp/app/entities/json-message/json-message.service';

describe('Component Tests', () => {

    describe('JsonMessage Management Delete Component', () => {
        let comp: JsonMessageDeleteDialogComponent;
        let fixture: ComponentFixture<JsonMessageDeleteDialogComponent>;
        let service: JsonMessageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonMessageDeleteDialogComponent],
                providers: [
                    JsonMessageService
                ]
            })
            .overrideTemplate(JsonMessageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonMessageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonMessageService);
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
