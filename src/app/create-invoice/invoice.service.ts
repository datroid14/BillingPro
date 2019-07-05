import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { InvoiceResponse } from '../create-invoice/invoice.response';
import { InvoiceProductResponse } from '../create-invoice/invoice.product.response';
import { AddResponse } from '../common/add.response';
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
export class InvoiceService {

      constructor(private http: HttpClient) {
      }

      getInvoices(): Observable<InvoiceResponse> {
            return this.http
                  .post<InvoiceResponse>(constants.serverUrl + 'getInvoices', null)
                  .pipe(tap(res => null));
      }

      getInvoiceById(payload:Object): Observable<InvoiceResponse> {
            return this.http
                  .post<InvoiceResponse>(constants.serverUrl + 'getInvoiceById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      getInvoiceProductsById(payload:Object): Observable<InvoiceProductResponse> {
            return this.http
                  .post<InvoiceProductResponse>(constants.serverUrl + 'getInvoiceProductsById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addInvoice(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addInvoice', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateInvoice(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateInvoice', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      getInvoicesWithoutTax(): Observable<InvoiceResponse> {
            return this.http
                  .post<InvoiceResponse>(constants.serverUrl + 'getInvoicesWithoutTax', null)
                  .pipe(tap(res => null));
      }

      getInvoiceWithoutTaxById(payload:Object): Observable<InvoiceResponse> {
            return this.http
                  .post<InvoiceResponse>(constants.serverUrl + 'getInvoiceWithoutTaxById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      getInvoiceProductsWithoutTaxById(payload:Object): Observable<InvoiceProductResponse> {
            return this.http
                  .post<InvoiceProductResponse>(constants.serverUrl + 'getInvoiceProductsWithoutTaxById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addInvoiceWithoutTax(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addInvoiceWithoutTax', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateInvoiceWithoutTax(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateInvoiceWithoutTax', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
