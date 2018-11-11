import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductResponse } from '../add-product/product.response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddResponse } from '../common/add.response';
import { constants } from '../common/constants';

const httpOptions = {
      headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
      })
};

@Injectable()
export class ProductService {

      constructor(private http: HttpClient) {
      }

      getProducts(): Observable<ProductResponse> {
            return this.http.post<ProductResponse>(constants.serverUrl + 'getProducts', null)
                  .pipe(tap(res => null));
      }

      getProductById(payload: Object): Observable<ProductResponse> {
            return this.http.post<ProductResponse>(constants.serverUrl + 'getProductById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addProduct(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addProduct', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateProduct(payload: Object): Observable<AddResponse> {
            return this.http
                .post<AddResponse>(constants.serverUrl + 'updateProduct', payload, httpOptions)
                .pipe(tap(res => null));
        }
    
        deleteProduct(payload: Object): Observable<AddResponse> {
            return this.http
                .post<AddResponse>(constants.serverUrl + 'deleteProduct', payload, httpOptions)
                .pipe(tap(res => null));
        }
}