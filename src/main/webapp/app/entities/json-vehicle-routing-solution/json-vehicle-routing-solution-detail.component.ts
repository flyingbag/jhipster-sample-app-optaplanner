import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JsonVehicleRoutingSolution } from './json-vehicle-routing-solution.model';
import { JsonVehicleRoutingSolutionService } from './json-vehicle-routing-solution.service';

@Component({
    selector: 'jhi-json-vehicle-routing-solution-detail',
    templateUrl: './json-vehicle-routing-solution-detail.component.html'
})
export class JsonVehicleRoutingSolutionDetailComponent implements OnInit, OnDestroy {

    jsonVehicleRoutingSolution: JsonVehicleRoutingSolution;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jsonVehicleRoutingSolutionService: JsonVehicleRoutingSolutionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJsonVehicleRoutingSolutions();
    }

    load(id) {
        this.jsonVehicleRoutingSolutionService.find(id)
            .subscribe((jsonVehicleRoutingSolutionResponse: HttpResponse<JsonVehicleRoutingSolution>) => {
                this.jsonVehicleRoutingSolution = jsonVehicleRoutingSolutionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJsonVehicleRoutingSolutions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jsonVehicleRoutingSolutionListModification',
            (response) => this.load(this.jsonVehicleRoutingSolution.id)
        );
    }
}
