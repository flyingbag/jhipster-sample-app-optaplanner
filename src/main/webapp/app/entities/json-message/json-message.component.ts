import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JsonMessage } from './json-message.model';
import { JsonMessageService } from './json-message.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-json-message',
    templateUrl: './json-message.component.html'
})
export class JsonMessageComponent implements OnInit, OnDestroy {
jsonMessages: JsonMessage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jsonMessageService: JsonMessageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jsonMessageService.query().subscribe(
            (res: HttpResponse<JsonMessage[]>) => {
                this.jsonMessages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJsonMessages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JsonMessage) {
        return item.id;
    }
    registerChangeInJsonMessages() {
        this.eventSubscriber = this.eventManager.subscribe('jsonMessageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
