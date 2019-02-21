import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { QuatationResponse } from '../create-quatation/quatation.response';
import { ProductResponse } from '../add-product/product.response';
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
export class QuatationService {

      constructor(private http: HttpClient) {
      }

      getQuatations(): Observable<QuatationResponse> {
            return this.http
                  .post<QuatationResponse>(constants.serverUrl + 'getQuatations', null)
                  .pipe(tap(res => null));
      }

      getQuatationById(payload:Object): Observable<QuatationResponse> {
            return this.http
                  .post<QuatationResponse>(constants.serverUrl + 'getQuatationById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      getQuatationProductsById(payload:Object): Observable<ProductResponse> {
            return this.http
                  .post<ProductResponse>(constants.serverUrl + 'getQuatationProductsById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addQuatation(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addQuatation', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateQuatation(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateQuatation', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
