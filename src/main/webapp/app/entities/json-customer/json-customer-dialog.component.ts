import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JsonCustomer } from './json-customer.model';
import { JsonCustomerPopupService } from './json-customer-popup.service';
import { JsonCustomerService } from './json-customer.service';
import { JsonVehicleRoutingSolution, JsonVehicleRoutingSolutionService } from '../json-vehicle-routing-solution';
import { JsonVehicleRoute, JsonVehicleRouteService } from '../json-vehicle-route';

@Component({
    selector: 'jhi-json-customer-dialog',
    templateUrl: './json-customer-dialog.component.html'
})
export class JsonCustomerDialogComponent implements OnInit {

    jsonCustomer: JsonCustomer;
    isSaving: boolean;

    jsonvehicleroutingsolutions: JsonVehicleRoutingSolution[];

    jsonvehicleroutes: JsonVehicleRoute[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jsonCustomerService: JsonCustomerService,
        private jsonVehicleRoutingSolutionService: JsonVehicleRoutingSolutionService,
        private jsonVehicleRouteService: JsonVehicleRouteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jsonVehicleRoutingSolutionService.query()
            .subscribe((res: HttpResponse<JsonVehicleRoutingSolution[]>) => { this.jsonvehicleroutingsolutions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jsonVehicleRouteService.query()
            .subscribe((res: HttpResponse<JsonVehicleRoute[]>) => { this.jsonvehicleroutes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackJsonVehicleRoutingSolutionById(index: number, item: JsonVehicleRoutingSolution) {
        return item.id;
    }

    trackJsonVehicleRouteById(index: number, item: JsonVehicleRoute) {
        return item.id;
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
