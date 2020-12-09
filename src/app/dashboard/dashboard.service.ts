import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { DashboardResponse } from './dashboard.response';
import { InvoiceResponse } from '../create-invoice/invoice.response';
import { InventoryResponse } from '../dashboard/inventory.response';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from '../common/constants';
import { ProductInventoryResponse } from './product-inventory.response';

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

    getInvoiceTotalWithTax(payload): Observable<DashboardResponse> {
        return this.http.post<DashboardResponse>(constants.serverUrl + 'getInvoiceTotalWithTax',  payload, httpOptions)
            .pipe(tap(res => null));
    }

    getPurchaseTotalWithTax(payload): Observable<DashboardResponse> {
        return this.http.post<DashboardResponse>(constants.serverUrl + 'getPurchaseTotalWithTax',  payload, httpOptions)
            .pipe(tap(res => null));
    }

    getInvoiceTotalWithoutTax(payload): Observable<DashboardResponse> {
        return this.http.post<DashboardResponse>(constants.serverUrl + 'getInvoiceTotalWithoutTax',  payload, httpOptions)
            .pipe(tap(res => null));
    }

    getPurchaseTotalWithoutTax(payload): Observable<DashboardResponse> {
        return this.http.post<DashboardResponse>(constants.serverUrl + 'getPurchaseTotalWithoutTax',  payload, httpOptions)
            .pipe(tap(res => null));
    }

    getSelectedMonthInvoices(payload): Observable<InvoiceResponse> {
        return this.http.post<InvoiceResponse>(constants.serverUrl + 'getSelectedMonthInvoices',  payload, httpOptions)
            .pipe(tap(res => null));
    }

    getInventoryDetails(payload): Observable<InventoryResponse> {
        return this.http.post<InventoryResponse>(constants.serverUrl + 'getInventoryDetails', payload, httpOptions)
            .pipe(tap(res => null));
    }

    getProductwiseInventoryDetails(payload): Observable<ProductInventoryResponse> {
        return this.http.post<ProductInventoryResponse>(constants.serverUrl + 'getProductwiseInventoryDetails', payload, httpOptions)
            .pipe(tap(res => null));
    }
}