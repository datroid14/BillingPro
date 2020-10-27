import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { PurchaseResponse } from '../add-purchase/purchase.response';
import { PurchaseProductResponse } from '../add-purchase/purchase.product.response';
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
export class PurchaseService {

      constructor(private http: HttpClient) {
      }

      getPurchases(): Observable<PurchaseResponse> {
            return this.http
                  .post<PurchaseResponse>(constants.serverUrl + 'getPurchases', null)
                  .pipe(tap(res => null));
      }

      getPurchaseById(payload:Object): Observable<PurchaseResponse> {
            return this.http
                  .post<PurchaseResponse>(constants.serverUrl + 'getPurchaseById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      getPurchaseProductsById(payload:Object): Observable<PurchaseProductResponse> {
            return this.http
                  .post<PurchaseProductResponse>(constants.serverUrl + 'getPurchaseProductsById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addPurchase(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addPurchase', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updatePurchase(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updatePurchase', payload, httpOptions)
                  .pipe(tap(res => null));
      }


      getPurchaseListByVendorId(payload: Object): Observable<PurchaseResponse> {
            return this.http.post<PurchaseResponse>(constants.serverUrl + 'getPurchaseListByVendorId', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
