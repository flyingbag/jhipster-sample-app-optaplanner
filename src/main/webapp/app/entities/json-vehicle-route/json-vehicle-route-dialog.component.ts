import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JsonVehicleRoute } from './json-vehicle-route.model';
import { JsonVehicleRoutePopupService } from './json-vehicle-route-popup.service';
import { JsonVehicleRouteService } from './json-vehicle-route.service';

@Component({
    selector: 'jhi-json-vehicle-route-dialog',
    templateUrl: './json-vehicle-route-dialog.component.html'
})
export class JsonVehicleRouteDialogComponent implements OnInit {

    jsonVehicleRoute: JsonVehicleRoute;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jsonVehicleRouteService: JsonVehicleRouteService,
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
        if (this.jsonVehicleRoute.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jsonVehicleRouteService.update(this.jsonVehicleRoute));
        } else {
            this.subscribeToSaveResponse(
                this.jsonVehicleRouteService.create(this.jsonVehicleRoute));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JsonVehicleRoute>>) {
        result.subscribe((res: HttpResponse<JsonVehicleRoute>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JsonVehicleRoute) {
        this.eventManager.broadcast({ name: 'jsonVehicleRouteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-json-vehicle-route-popup',
    template: ''
})
export class JsonVehicleRoutePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jsonVehicleRoutePopupService: JsonVehicleRoutePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jsonVehicleRoutePopupService
                    .open(JsonVehicleRouteDialogComponent as Component, params['id']);
            } else {
                this.jsonVehicleRoutePopupService
                    .open(JsonVehicleRouteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
