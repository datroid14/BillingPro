import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { InsuranceResponse } from '../add-insurance-detail/insurance.response';
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
export class InsuranceService {

      constructor(private http: HttpClient) {
      }

      getInsuranceDetails(): Observable<InsuranceResponse> {
            return this.http
                  .post<InsuranceResponse>(constants.serverUrl + 'getInsuranceDetails', null)
                  .pipe(tap(res => null));
      }

      getInsuranceDetailById(payload: Object): Observable<InsuranceResponse> {
            return this.http
                  .post<InsuranceResponse>(constants.serverUrl + 'getInsuranceDetailById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addInsuranceDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addInsuranceDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateInsuranceDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateInsuranceDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteInsuranceDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteInsuranceDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}

