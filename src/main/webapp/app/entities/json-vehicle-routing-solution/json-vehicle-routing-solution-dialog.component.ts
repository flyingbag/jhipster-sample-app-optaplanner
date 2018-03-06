import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JsonVehicleRoutingSolution } from './json-vehicle-routing-solution.model';
import { JsonVehicleRoutingSolutionPopupService } from './json-vehicle-routing-solution-popup.service';
import { JsonVehicleRoutingSolutionService } from './json-vehicle-routing-solution.service';

@Component({
    selector: 'jhi-json-vehicle-routing-solution-dialog',
    templateUrl: './json-vehicle-routing-solution-dialog.component.html'
})
export class JsonVehicleRoutingSolutionDialogComponent implements OnInit {

    jsonVehicleRoutingSolution: JsonVehicleRoutingSolution;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jsonVehicleRoutingSolutionService: JsonVehicleRoutingSolutionService,
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
        if (this.jsonVehicleRoutingSolution.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jsonVehicleRoutingSolutionService.update(this.jsonVehicleRoutingSolution));
        } else {
            this.subscribeToSaveResponse(
                this.jsonVehicleRoutingSolutionService.create(this.jsonVehicleRoutingSolution));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JsonVehicleRoutingSolution>>) {
        result.subscribe((res: HttpResponse<JsonVehicleRoutingSolution>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JsonVehicleRoutingSolution) {
        this.eventManager.broadcast({ name: 'jsonVehicleRoutingSolutionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-json-vehicle-routing-solution-popup',
    template: ''
})
export class JsonVehicleRoutingSolutionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jsonVehicleRoutingSolutionPopupService: JsonVehicleRoutingSolutionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jsonVehicleRoutingSolutionPopupService
                    .open(JsonVehicleRoutingSolutionDialogComponent as Component, params['id']);
            } else {
                this.jsonVehicleRoutingSolutionPopupService
                    .open(JsonVehicleRoutingSolutionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
