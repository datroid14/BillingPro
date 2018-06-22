import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { GSTResponse } from '../add-gst/gst.response';
import { AddResponse } from '../common/add.response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'q=0.8;application/json;q=0.9'
    })
};

@Injectable()
export class GSTService {

    constructor(private http: HttpClient) {
    }

    getGSTDetails(): Observable<GSTResponse> {
        return this.http
            .post<GSTResponse>("http://localhost:3000/getGSTDetails", null)
            .pipe(tap(res => null));
    }

    getGSTDetailsById(payload: Object): Observable<GSTResponse> {
        return this.http.post<GSTResponse>("http://localhost:3000/getGSTDetailById", payload, httpOptions)
            .pipe(tap(res => null));
    }

    addGSTDetails(payload: Object): Observable<AddResponse> {
        return this.http
            .post<AddResponse>('http://localhost:3000/addGSTDetail', payload, httpOptions)
            .pipe(tap(res => null));
    }

    updateGSTDetails(payload: Object): Observable<AddResponse> {
        return this.http
            .post<AddResponse>('http://localhost:3000/updateGSTDetail', payload, httpOptions)
            .pipe(tap(res => null));
    }

    deleteGSTDetails(payload: Object): Observable<AddResponse> {
        return this.http
            .post<AddResponse>('http://localhost:3000/deleteGSTDetail', payload, httpOptions)
            .pipe(tap(res => null));
    }
}
