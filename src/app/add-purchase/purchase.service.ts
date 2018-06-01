import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { PurchaseResponse } from '../add-purchase/purchase.response';
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
export class PurchaseService {

      constructor(private http: HttpClient) {
      }

      getPurchases(): Observable<PurchaseResponse> {
            return this.http
                  .post<PurchaseResponse>("http://localhost:3000/getPurchases", null)
                  .pipe(tap(res => null));
      }

      getPurchaseProductsById(payload:Object): Observable<ProductResponse> {
            return this.http
                  .post<ProductResponse>("http://localhost:3000/getPurchaseProductsById", payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addPurchase(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>('http://localhost:3000/addPurchase', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
