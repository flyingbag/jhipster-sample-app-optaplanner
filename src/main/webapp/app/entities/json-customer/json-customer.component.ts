import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JsonCustomer } from './json-customer.model';
import { JsonCustomerService } from './json-customer.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-json-customer',
    templateUrl: './json-customer.component.html'
})
export class JsonCustomerComponent implements OnInit, OnDestroy {
jsonCustomers: JsonCustomer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jsonCustomerService: JsonCustomerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jsonCustomerService.query().subscribe(
            (res: HttpResponse<JsonCustomer[]>) => {
                this.jsonCustomers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJsonCustomers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JsonCustomer) {
        return item.id;
    }
    registerChangeInJsonCustomers() {
        this.eventSubscriber = this.eventManager.subscribe('jsonCustomerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
