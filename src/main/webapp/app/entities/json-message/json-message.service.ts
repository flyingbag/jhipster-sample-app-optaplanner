import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JsonMessage } from './json-message.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JsonMessage>;

@Injectable()
export class JsonMessageService {

    private resourceUrl =  SERVER_API_URL + 'api/json-messages';

    constructor(private http: HttpClient) { }

    create(jsonMessage: JsonMessage): Observable<EntityResponseType> {
        const copy = this.convert(jsonMessage);
        return this.http.post<JsonMessage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jsonMessage: JsonMessage): Observable<EntityResponseType> {
        const copy = this.convert(jsonMessage);
        return this.http.put<JsonMessage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JsonMessage>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JsonMessage[]>> {
        const options = createRequestOption(req);
        return this.http.get<JsonMessage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JsonMessage[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JsonMessage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JsonMessage[]>): HttpResponse<JsonMessage[]> {
        const jsonResponse: JsonMessage[] = res.body;
        const body: JsonMessage[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JsonMessage.
     */
    private convertItemFromServer(jsonMessage: JsonMessage): JsonMessage {
        const copy: JsonMessage = Object.assign({}, jsonMessage);
        return copy;
    }

    /**
     * Convert a JsonMessage to a JSON which can be sent to the server.
     */
    private convert(jsonMessage: JsonMessage): JsonMessage {
        const copy: JsonMessage = Object.assign({}, jsonMessage);
        return copy;
    }
}
