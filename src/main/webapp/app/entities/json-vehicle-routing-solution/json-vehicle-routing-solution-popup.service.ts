import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JsonVehicleRoutingSolution } from './json-vehicle-routing-solution.model';
import { JsonVehicleRoutingSolutionService } from './json-vehicle-routing-solution.service';

@Injectable()
export class JsonVehicleRoutingSolutionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jsonVehicleRoutingSolutionService: JsonVehicleRoutingSolutionService

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
                this.jsonVehicleRoutingSolutionService.find(id)
                    .subscribe((jsonVehicleRoutingSolutionResponse: HttpResponse<JsonVehicleRoutingSolution>) => {
                        const jsonVehicleRoutingSolution: JsonVehicleRoutingSolution = jsonVehicleRoutingSolutionResponse.body;
                        this.ngbModalRef = this.jsonVehicleRoutingSolutionModalRef(component, jsonVehicleRoutingSolution);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jsonVehicleRoutingSolutionModalRef(component, new JsonVehicleRoutingSolution());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jsonVehicleRoutingSolutionModalRef(component: Component, jsonVehicleRoutingSolution: JsonVehicleRoutingSolution): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jsonVehicleRoutingSolution = jsonVehicleRoutingSolution;
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
