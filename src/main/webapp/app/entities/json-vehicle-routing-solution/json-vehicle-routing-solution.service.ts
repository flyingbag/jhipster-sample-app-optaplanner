import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JsonVehicleRoutingSolution } from './json-vehicle-routing-solution.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JsonVehicleRoutingSolution>;

@Injectable()
export class JsonVehicleRoutingSolutionService {

    private resourceUrl =  SERVER_API_URL + 'api/json-vehicle-routing-solutions';

    constructor(private http: HttpClient) { }

    create(jsonVehicleRoutingSolution: JsonVehicleRoutingSolution): Observable<EntityResponseType> {
        const copy = this.convert(jsonVehicleRoutingSolution);
        return this.http.post<JsonVehicleRoutingSolution>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jsonVehicleRoutingSolution: JsonVehicleRoutingSolution): Observable<EntityResponseType> {
        const copy = this.convert(jsonVehicleRoutingSolution);
        return this.http.put<JsonVehicleRoutingSolution>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JsonVehicleRoutingSolution>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JsonVehicleRoutingSolution[]>> {
        const options = createRequestOption(req);
        return this.http.get<JsonVehicleRoutingSolution[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JsonVehicleRoutingSolution[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JsonVehicleRoutingSolution = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JsonVehicleRoutingSolution[]>): HttpResponse<JsonVehicleRoutingSolution[]> {
        const jsonResponse: JsonVehicleRoutingSolution[] = res.body;
        const body: JsonVehicleRoutingSolution[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JsonVehicleRoutingSolution.
     */
    private convertItemFromServer(jsonVehicleRoutingSolution: JsonVehicleRoutingSolution): JsonVehicleRoutingSolution {
        const copy: JsonVehicleRoutingSolution = Object.assign({}, jsonVehicleRoutingSolution);
        return copy;
    }

    /**
     * Convert a JsonVehicleRoutingSolution to a JSON which can be sent to the server.
     */
    private convert(jsonVehicleRoutingSolution: JsonVehicleRoutingSolution): JsonVehicleRoutingSolution {
        const copy: JsonVehicleRoutingSolution = Object.assign({}, jsonVehicleRoutingSolution);
        return copy;
    }
}
