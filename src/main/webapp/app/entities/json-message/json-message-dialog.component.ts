import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JsonMessage } from './json-message.model';
import { JsonMessagePopupService } from './json-message-popup.service';
import { JsonMessageService } from './json-message.service';

@Component({
    selector: 'jhi-json-message-dialog',
    templateUrl: './json-message-dialog.component.html'
})
export class JsonMessageDialogComponent implements OnInit {

    jsonMessage: JsonMessage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jsonMessageService: JsonMessageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jsonMessage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jsonMessageService.update(this.jsonMessage));
        } else {
            this.subscribeToSaveResponse(
                this.jsonMessageService.create(this.jsonMessage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JsonMessage>>) {
        result.subscribe((res: HttpResponse<JsonMessage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JsonMessage) {
        this.eventManager.broadcast({ name: 'jsonMessageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-json-message-popup',
    template: ''
})
export class JsonMessagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jsonMessagePopupService: JsonMessagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jsonMessagePopupService
                    .open(JsonMessageDialogComponent as Component, params['id']);
            } else {
                this.jsonMessagePopupService
                    .open(JsonMessageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
