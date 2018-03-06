import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JsonCustomer } from './json-customer.model';
import { JsonCustomerPopupService } from './json-customer-popup.service';
import { JsonCustomerService } from './json-customer.service';

@Component({
    selector: 'jhi-json-customer-delete-dialog',
    templateUrl: './json-customer-delete-dialog.component.html'
})
export class JsonCustomerDeleteDialogComponent {

    jsonCustomer: JsonCustomer;

    constructor(
        private jsonCustomerService: JsonCustomerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jsonCustomerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jsonCustomerListModification',
                content: 'Deleted an jsonCustomer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-json-customer-delete-popup',
    template: ''
})
export class JsonCustomerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jsonCustomerPopupService: JsonCustomerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jsonCustomerPopupService
                .open(JsonCustomerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
