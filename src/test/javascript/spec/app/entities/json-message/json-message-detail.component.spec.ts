/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonMessageDetailComponent } from '../../../../../../main/webapp/app/entities/json-message/json-message-detail.component';
import { JsonMessageService } from '../../../../../../main/webapp/app/entities/json-message/json-message.service';
import { JsonMessage } from '../../../../../../main/webapp/app/entities/json-message/json-message.model';

describe('Component Tests', () => {

    describe('JsonMessage Management Detail Component', () => {
        let comp: JsonMessageDetailComponent;
        let fixture: ComponentFixture<JsonMessageDetailComponent>;
        let service: JsonMessageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonMessageDetailComponent],
                providers: [
                    JsonMessageService
                ]
            })
            .overrideTemplate(JsonMessageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonMessageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonMessageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JsonMessage(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jsonMessage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
