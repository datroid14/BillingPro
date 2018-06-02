import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { InvoiceResponse } from '../create-invoice/invoice.response';
import { ProductResponse } from '../add-product/product.response';
import { AddResponse } from '../common/add.response';
import { Purchase } from '../add-purchase/purchase';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
                  .post<InvoiceResponse>("http://localhost:3000/getInvoices", null)
                  .pipe(tap(res => null));
      }

      getInvoiceProductsById(payload:Object): Observable<ProductResponse> {
            return this.http
                  .post<ProductResponse>("http://localhost:3000/getInvoiceProductsById", payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addInvoice(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>('http://localhost:3000/addInvoice', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
