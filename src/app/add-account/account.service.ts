import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { AccountResponse } from '../add-account/account.response';
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
export class AccountService {

      constructor(private http: HttpClient) {
      }

      getAccounts(): Observable<AccountResponse> {
            return this.http
                  .post<AccountResponse>(constants.serverUrl + 'getAccounts', null)
                  .pipe(tap(res => null));
      }

      getAccountById(payload: Object): Observable<AccountResponse> {
            return this.http
                  .post<AccountResponse>(constants.serverUrl + 'getAccountById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addAccount(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addAccount', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateAccount(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateAccount', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteAccount(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteAccount', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
