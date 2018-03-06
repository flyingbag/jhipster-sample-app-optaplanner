import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JsonVehicleRoute } from './json-vehicle-route.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JsonVehicleRoute>;

@Injectable()
export class JsonVehicleRouteService {

    private resourceUrl =  SERVER_API_URL + 'api/json-vehicle-routes';

    constructor(private http: HttpClient) { }

    create(jsonVehicleRoute: JsonVehicleRoute): Observable<EntityResponseType> {
        const copy = this.convert(jsonVehicleRoute);
        return this.http.post<JsonVehicleRoute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jsonVehicleRoute: JsonVehicleRoute): Observable<EntityResponseType> {
        const copy = this.convert(jsonVehicleRoute);
        return this.http.put<JsonVehicleRoute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JsonVehicleRoute>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JsonVehicleRoute[]>> {
        const options = createRequestOption(req);
        return this.http.get<JsonVehicleRoute[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JsonVehicleRoute[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JsonVehicleRoute = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JsonVehicleRoute[]>): HttpResponse<JsonVehicleRoute[]> {
        const jsonResponse: JsonVehicleRoute[] = res.body;
        const body: JsonVehicleRoute[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JsonVehicleRoute.
     */
    private convertItemFromServer(jsonVehicleRoute: JsonVehicleRoute): JsonVehicleRoute {
        const copy: JsonVehicleRoute = Object.assign({}, jsonVehicleRoute);
        return copy;
    }

    /**
     * Convert a JsonVehicleRoute to a JSON which can be sent to the server.
     */
    private convert(jsonVehicleRoute: JsonVehicleRoute): JsonVehicleRoute {
        const copy: JsonVehicleRoute = Object.assign({}, jsonVehicleRoute);
        return copy;
    }
}
