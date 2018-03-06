import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JsonVehicleRoute } from './json-vehicle-route.model';
import { JsonVehicleRoutePopupService } from './json-vehicle-route-popup.service';
import { JsonVehicleRouteService } from './json-vehicle-route.service';

@Component({
    selector: 'jhi-json-vehicle-route-delete-dialog',
    templateUrl: './json-vehicle-route-delete-dialog.component.html'
})
export class JsonVehicleRouteDeleteDialogComponent {

    jsonVehicleRoute: JsonVehicleRoute;

    constructor(
        private jsonVehicleRouteService: JsonVehicleRouteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jsonVehicleRouteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jsonVehicleRouteListModification',
                content: 'Deleted an jsonVehicleRoute'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-json-vehicle-route-delete-popup',
    template: ''
})
export class JsonVehicleRouteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jsonVehicleRoutePopupService: JsonVehicleRoutePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jsonVehicleRoutePopupService
                .open(JsonVehicleRouteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
