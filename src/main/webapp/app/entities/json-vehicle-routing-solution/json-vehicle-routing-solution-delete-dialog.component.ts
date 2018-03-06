import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JsonVehicleRoutingSolution } from './json-vehicle-routing-solution.model';
import { JsonVehicleRoutingSolutionPopupService } from './json-vehicle-routing-solution-popup.service';
import { JsonVehicleRoutingSolutionService } from './json-vehicle-routing-solution.service';

@Component({
    selector: 'jhi-json-vehicle-routing-solution-delete-dialog',
    templateUrl: './json-vehicle-routing-solution-delete-dialog.component.html'
})
export class JsonVehicleRoutingSolutionDeleteDialogComponent {

    jsonVehicleRoutingSolution: JsonVehicleRoutingSolution;

    constructor(
        private jsonVehicleRoutingSolutionService: JsonVehicleRoutingSolutionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jsonVehicleRoutingSolutionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jsonVehicleRoutingSolutionListModification',
                content: 'Deleted an jsonVehicleRoutingSolution'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-json-vehicle-routing-solution-delete-popup',
    template: ''
})
export class JsonVehicleRoutingSolutionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jsonVehicleRoutingSolutionPopupService: JsonVehicleRoutingSolutionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jsonVehicleRoutingSolutionPopupService
                .open(JsonVehicleRoutingSolutionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
