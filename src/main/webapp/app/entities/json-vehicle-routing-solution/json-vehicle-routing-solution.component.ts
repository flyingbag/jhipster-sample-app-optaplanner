import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JsonVehicleRoutingSolution } from './json-vehicle-routing-solution.model';
import { JsonVehicleRoutingSolutionService } from './json-vehicle-routing-solution.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-json-vehicle-routing-solution',
    templateUrl: './json-vehicle-routing-solution.component.html'
})
export class JsonVehicleRoutingSolutionComponent implements OnInit, OnDestroy {
jsonVehicleRoutingSolutions: JsonVehicleRoutingSolution[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jsonVehicleRoutingSolutionService: JsonVehicleRoutingSolutionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jsonVehicleRoutingSolutionService.query().subscribe(
            (res: HttpResponse<JsonVehicleRoutingSolution[]>) => {
                this.jsonVehicleRoutingSolutions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJsonVehicleRoutingSolutions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JsonVehicleRoutingSolution) {
        return item.id;
    }
    registerChangeInJsonVehicleRoutingSolutions() {
        this.eventSubscriber = this.eventManager.subscribe('jsonVehicleRoutingSolutionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
