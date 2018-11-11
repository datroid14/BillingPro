import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { CustomerResponse } from '../add-customer/customer.response';
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
export class CustomerService {

      constructor(private http: HttpClient) {
            console.log("Customer " + constants.serverUrl);
      }

      getCustomers(): Observable<CustomerResponse> {
            return this.http
                  .post<CustomerResponse>(constants.serverUrl + 'getCustomers', null)
                  .pipe(tap(res => null));
      }

      getCustomerById(payload: Object): Observable<CustomerResponse> {
            return this.http
                  .post<CustomerResponse>(constants.serverUrl + 'getCustomerById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addCustomer(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addCustomer', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateCustomer(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateCustomer', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteCustomer(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteCustomer', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
