import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JsonVehicleRoute } from './json-vehicle-route.model';
import { JsonVehicleRouteService } from './json-vehicle-route.service';

@Component({
    selector: 'jhi-json-vehicle-route-detail',
    templateUrl: './json-vehicle-route-detail.component.html'
})
export class JsonVehicleRouteDetailComponent implements OnInit, OnDestroy {

    jsonVehicleRoute: JsonVehicleRoute;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jsonVehicleRouteService: JsonVehicleRouteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJsonVehicleRoutes();
    }

    load(id) {
        this.jsonVehicleRouteService.find(id)
            .subscribe((jsonVehicleRouteResponse: HttpResponse<JsonVehicleRoute>) => {
                this.jsonVehicleRoute = jsonVehicleRouteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJsonVehicleRoutes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jsonVehicleRouteListModification',
            (response) => this.load(this.jsonVehicleRoute.id)
        );
    }
}
