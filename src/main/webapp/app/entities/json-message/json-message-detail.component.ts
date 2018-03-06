import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JsonMessage } from './json-message.model';
import { JsonMessageService } from './json-message.service';

@Component({
    selector: 'jhi-json-message-detail',
    templateUrl: './json-message-detail.component.html'
})
export class JsonMessageDetailComponent implements OnInit, OnDestroy {

    jsonMessage: JsonMessage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jsonMessageService: JsonMessageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJsonMessages();
    }

    load(id) {
        this.jsonMessageService.find(id)
            .subscribe((jsonMessageResponse: HttpResponse<JsonMessage>) => {
                this.jsonMessage = jsonMessageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJsonMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jsonMessageListModification',
            (response) => this.load(this.jsonMessage.id)
        );
    }
}
