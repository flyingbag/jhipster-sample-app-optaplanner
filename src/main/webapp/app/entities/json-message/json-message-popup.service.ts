import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JsonMessage } from './json-message.model';
import { JsonMessageService } from './json-message.service';

@Injectable()
export class JsonMessagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jsonMessageService: JsonMessageService

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
                this.jsonMessageService.find(id)
                    .subscribe((jsonMessageResponse: HttpResponse<JsonMessage>) => {
                        const jsonMessage: JsonMessage = jsonMessageResponse.body;
                        this.ngbModalRef = this.jsonMessageModalRef(component, jsonMessage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jsonMessageModalRef(component, new JsonMessage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jsonMessageModalRef(component: Component, jsonMessage: JsonMessage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jsonMessage = jsonMessage;
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
