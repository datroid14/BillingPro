import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { PaymentResponse } from '../add-payment/payment.response';
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
export class PaymentService {

      constructor(private http: HttpClient) {
      }

      getPaymentDetails(): Observable<PaymentResponse> {
            return this.http.post<PaymentResponse>(constants.serverUrl + 'getPaymentDetails', null)
                  .pipe(tap(res => null));
      }

      getPaymentDetailById(payload: Object): Observable<PaymentResponse> {
            return this.http.post<PaymentResponse>(constants.serverUrl + 'getPaymentDetailById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addPaymentDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addPaymentDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updatePaymentDetail(payload: Object): Observable<AddResponse> {
            return this.http
                .post<AddResponse>(constants.serverUrl + 'updatePaymentDetail', payload, httpOptions)
                .pipe(tap(res => null));
        }
    
        deletePaymentDetail(payload: Object): Observable<AddResponse> {
            return this.http
                .post<AddResponse>(constants.serverUrl + 'deletePaymentDetail', payload, httpOptions)
                .pipe(tap(res => null));
        }
}