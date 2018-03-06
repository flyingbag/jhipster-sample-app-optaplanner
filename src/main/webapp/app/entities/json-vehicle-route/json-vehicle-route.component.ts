import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JsonVehicleRoute } from './json-vehicle-route.model';
import { JsonVehicleRouteService } from './json-vehicle-route.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-json-vehicle-route',
    templateUrl: './json-vehicle-route.component.html'
})
export class JsonVehicleRouteComponent implements OnInit, OnDestroy {
jsonVehicleRoutes: JsonVehicleRoute[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jsonVehicleRouteService: JsonVehicleRouteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jsonVehicleRouteService.query().subscribe(
            (res: HttpResponse<JsonVehicleRoute[]>) => {
                this.jsonVehicleRoutes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJsonVehicleRoutes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JsonVehicleRoute) {
        return item.id;
    }
    registerChangeInJsonVehicleRoutes() {
        this.eventSubscriber = this.eventManager.subscribe('jsonVehicleRouteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
