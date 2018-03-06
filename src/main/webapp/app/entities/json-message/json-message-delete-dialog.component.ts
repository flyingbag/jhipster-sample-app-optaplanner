import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JsonMessage } from './json-message.model';
import { JsonMessagePopupService } from './json-message-popup.service';
import { JsonMessageService } from './json-message.service';

@Component({
    selector: 'jhi-json-message-delete-dialog',
    templateUrl: './json-message-delete-dialog.component.html'
})
export class JsonMessageDeleteDialogComponent {

    jsonMessage: JsonMessage;

    constructor(
        private jsonMessageService: JsonMessageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jsonMessageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jsonMessageListModification',
                content: 'Deleted an jsonMessage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-json-message-delete-popup',
    template: ''
})
export class JsonMessageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jsonMessagePopupService: JsonMessagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jsonMessagePopupService
                .open(JsonMessageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
