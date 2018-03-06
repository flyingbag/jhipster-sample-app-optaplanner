import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JsonCustomer } from './json-customer.model';
import { JsonCustomerPopupService } from './json-customer-popup.service';
import { JsonCustomerService } from './json-customer.service';

@Component({
    selector: 'jhi-json-customer-dialog',
    templateUrl: './json-customer-dialog.component.html'
})
export class JsonCustomerDialogComponent implements OnInit {

    jsonCustomer: JsonCustomer;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jsonCustomerService: JsonCustomerService,
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
        if (this.jsonCustomer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jsonCustomerService.update(this.jsonCustomer));
        } else {
            this.subscribeToSaveResponse(
                this.jsonCustomerService.create(this.jsonCustomer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JsonCustomer>>) {
        result.subscribe((res: HttpResponse<JsonCustomer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JsonCustomer) {
        this.eventManager.broadcast({ name: 'jsonCustomerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-json-customer-popup',
    template: ''
})
export class JsonCustomerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jsonCustomerPopupService: JsonCustomerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jsonCustomerPopupService
                    .open(JsonCustomerDialogComponent as Component, params['id']);
            } else {
                this.jsonCustomerPopupService
                    .open(JsonCustomerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
