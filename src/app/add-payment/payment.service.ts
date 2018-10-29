import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { PaymentResponse } from '../add-payment/payment.response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddResponse } from '../common/add.response';

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
            return this.http.post<PaymentResponse>("http://localhost:3000/getPaymentDetails", null)
                  .pipe(tap(res => null));
      }

      getPaymentDetailById(payload: Object): Observable<PaymentResponse> {
            return this.http.post<PaymentResponse>("http://localhost:3000/getPaymentDetailById", payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addPaymentDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>('http://localhost:3000/addPaymentDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updatePaymentDetail(payload: Object): Observable<AddResponse> {
            return this.http
                .post<AddResponse>('http://localhost:3000/updatePaymentDetail', payload, httpOptions)
                .pipe(tap(res => null));
        }
    
        deletePaymentDetail(payload: Object): Observable<AddResponse> {
            return this.http
                .post<AddResponse>('http://localhost:3000/deletePaymentDetail', payload, httpOptions)
                .pipe(tap(res => null));
        }
}