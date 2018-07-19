import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { QuatationResponse } from '../create-quatation/quatation.response';
import { ProductResponse } from '../add-product/product.response';
import { AddResponse } from '../common/add.response';
import { Quatation } from '../create-quatation/quatation';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
      headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
      })
};

@Injectable()
export class QuatationService {

      constructor(private http: HttpClient) {
      }

      getQuatations(): Observable<QuatationResponse> {
            return this.http
                  .post<QuatationResponse>("http://localhost:3000/getQuatations", null)
                  .pipe(tap(res => null));
      }

      getQuatationById(payload:Object): Observable<QuatationResponse> {
            return this.http
                  .post<QuatationResponse>("http://localhost:3000/getQuatationById", payload, httpOptions)
                  .pipe(tap(res => null));
      }

      getQuatationProductsById(payload:Object): Observable<ProductResponse> {
            return this.http
                  .post<ProductResponse>("http://localhost:3000/getQuatationProductsById", payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addQuatation(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>('http://localhost:3000/addQuatation', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
