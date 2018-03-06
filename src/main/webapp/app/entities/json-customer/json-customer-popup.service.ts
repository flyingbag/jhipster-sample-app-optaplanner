import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JsonCustomer } from './json-customer.model';
import { JsonCustomerService } from './json-customer.service';

@Injectable()
export class JsonCustomerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jsonCustomerService: JsonCustomerService

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
                this.jsonCustomerService.find(id)
                    .subscribe((jsonCustomerResponse: HttpResponse<JsonCustomer>) => {
                        const jsonCustomer: JsonCustomer = jsonCustomerResponse.body;
                        this.ngbModalRef = this.jsonCustomerModalRef(component, jsonCustomer);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jsonCustomerModalRef(component, new JsonCustomer());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jsonCustomerModalRef(component: Component, jsonCustomer: JsonCustomer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jsonCustomer = jsonCustomer;
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
