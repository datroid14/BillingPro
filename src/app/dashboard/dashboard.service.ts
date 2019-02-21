import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { DashboardResponse } from './dashboard.response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from '../common/constants';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'q=0.8;application/json;q=0.9'
    })
};

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {
    }

    getInvoiceTotalWithTax(): Observable<DashboardResponse> {
        return this.http.post<DashboardResponse>(constants.serverUrl + 'getInvoiceTotalWithTax', null)
            .pipe(tap(res => null));
    }

    getInvoiceTotalWithoutTax(): Observable<DashboardResponse> {
        return this.http.post<DashboardResponse>(constants.serverUrl + 'getInvoiceTotalWithoutTax', null)
            .pipe(tap(res => null));
    }
}