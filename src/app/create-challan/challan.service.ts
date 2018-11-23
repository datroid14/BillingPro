import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { ChallanResponse } from '../create-challan/challan.response';
import { AddResponse } from '../common/add.response';
import { constants } from '../common/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
      headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
      })
};

@Injectable()
export class ChallanService {

      constructor(private http: HttpClient) {
      }

      getChallans(): Observable<ChallanResponse> {
            return this.http
                  .post<ChallanResponse>(constants.serverUrl + 'getChallans', null)
                  .pipe(tap(res => null));
      }

      getChallanById(payload:Object): Observable<ChallanResponse> {
            return this.http
                  .post<ChallanResponse>(constants.serverUrl + 'getChallanById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addChallan(payload:Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addChallan', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      getChallansByCustomerId(payload:Object): Observable<ChallanResponse> {
            return this.http
                  .post<ChallanResponse>(constants.serverUrl + 'getChallansByCustomerId', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
