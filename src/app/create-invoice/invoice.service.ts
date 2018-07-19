import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { InvoiceResponse } from '../create-invoice/invoice.response';
import { InvoiceProductResponse } from '../create-invoice/invoice.product.response';
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
export class InvoiceService {

      constructor(private http: HttpClient) {
      }

      getInvoices(): Observable<InvoiceResponse> {
            return this.http
                  .post<InvoiceResponse>("http://localhost:3000/getInvoices", null)
                  .pipe(tap(res => null));
      }

      getInvoiceById(payload:Object): Observable<InvoiceResponse> {
            return this.http
                  .post<InvoiceResponse>("http://localhost:3000/getInvoiceById", payload, httpOptions)
                  .pipe(tap(res => null));
      }

      getInvoiceProductsById(payload:Object): Observable<InvoiceProductResponse> {
            return this.http
                  .post<InvoiceProductResponse>("http://localhost:3000/getInvoiceProductsById", payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addInvoice(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>('http://localhost:3000/addInvoice', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
