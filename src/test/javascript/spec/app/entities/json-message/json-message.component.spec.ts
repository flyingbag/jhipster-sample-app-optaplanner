/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleroutingTestModule } from '../../../test.module';
import { JsonMessageComponent } from '../../../../../../main/webapp/app/entities/json-message/json-message.component';
import { JsonMessageService } from '../../../../../../main/webapp/app/entities/json-message/json-message.service';
import { JsonMessage } from '../../../../../../main/webapp/app/entities/json-message/json-message.model';

describe('Component Tests', () => {

    describe('JsonMessage Management Component', () => {
        let comp: JsonMessageComponent;
        let fixture: ComponentFixture<JsonMessageComponent>;
        let service: JsonMessageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleroutingTestModule],
                declarations: [JsonMessageComponent],
                providers: [
                    JsonMessageService
                ]
            })
            .overrideTemplate(JsonMessageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JsonMessageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JsonMessageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JsonMessage(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jsonMessages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
