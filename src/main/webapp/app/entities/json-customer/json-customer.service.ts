import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JsonCustomer } from './json-customer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JsonCustomer>;

@Injectable()
export class JsonCustomerService {

    private resourceUrl =  SERVER_API_URL + 'api/json-customers';

    constructor(private http: HttpClient) { }

    create(jsonCustomer: JsonCustomer): Observable<EntityResponseType> {
        const copy = this.convert(jsonCustomer);
        return this.http.post<JsonCustomer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jsonCustomer: JsonCustomer): Observable<EntityResponseType> {
        const copy = this.convert(jsonCustomer);
        return this.http.put<JsonCustomer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JsonCustomer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JsonCustomer[]>> {
        const options = createRequestOption(req);
        return this.http.get<JsonCustomer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JsonCustomer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JsonCustomer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JsonCustomer[]>): HttpResponse<JsonCustomer[]> {
        const jsonResponse: JsonCustomer[] = res.body;
        const body: JsonCustomer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JsonCustomer.
     */
    private convertItemFromServer(jsonCustomer: JsonCustomer): JsonCustomer {
        const copy: JsonCustomer = Object.assign({}, jsonCustomer);
        return copy;
    }

    /**
     * Convert a JsonCustomer to a JSON which can be sent to the server.
     */
    private convert(jsonCustomer: JsonCustomer): JsonCustomer {
        const copy: JsonCustomer = Object.assign({}, jsonCustomer);
        return copy;
    }
}
