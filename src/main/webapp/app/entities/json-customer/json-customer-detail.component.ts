import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JsonCustomer } from './json-customer.model';
import { JsonCustomerService } from './json-customer.service';

@Component({
    selector: 'jhi-json-customer-detail',
    templateUrl: './json-customer-detail.component.html'
})
export class JsonCustomerDetailComponent implements OnInit, OnDestroy {

    jsonCustomer: JsonCustomer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jsonCustomerService: JsonCustomerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJsonCustomers();
    }

    load(id) {
        this.jsonCustomerService.find(id)
            .subscribe((jsonCustomerResponse: HttpResponse<JsonCustomer>) => {
                this.jsonCustomer = jsonCustomerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJsonCustomers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jsonCustomerListModification',
            (response) => this.load(this.jsonCustomer.id)
        );
    }
}
