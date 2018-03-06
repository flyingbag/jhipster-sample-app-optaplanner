import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JsonVehicleRoute } from './json-vehicle-route.model';
import { JsonVehicleRouteService } from './json-vehicle-route.service';

@Injectable()
export class JsonVehicleRoutePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jsonVehicleRouteService: JsonVehicleRouteService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.jsonVehicleRouteService.find(id)
                    .subscribe((jsonVehicleRouteResponse: HttpResponse<JsonVehicleRoute>) => {
                        const jsonVehicleRoute: JsonVehicleRoute = jsonVehicleRouteResponse.body;
                        this.ngbModalRef = this.jsonVehicleRouteModalRef(component, jsonVehicleRoute);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jsonVehicleRouteModalRef(component, new JsonVehicleRoute());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jsonVehicleRouteModalRef(component: Component, jsonVehicleRoute: JsonVehicleRoute): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jsonVehicleRoute = jsonVehicleRoute;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
