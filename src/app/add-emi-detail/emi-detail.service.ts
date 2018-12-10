import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { EmiDetailResponse } from '../add-emi-detail/emi-detail.response';
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
export class EmiDetailService {

      constructor(private http: HttpClient) {
      }

      getEmiDetails(): Observable<EmiDetailResponse> {
            return this.http
                  .post<EmiDetailResponse>(constants.serverUrl + 'getEmiDetails', null)
                  .pipe(tap(res => null));
      }

      getEmiDetailById(payload: Object): Observable<EmiDetailResponse> {
            return this.http
                  .post<EmiDetailResponse>(constants.serverUrl + 'getEmiDetailById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addEmiDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addEmiDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateEmiDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateEmiDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteEmiDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteEmiDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
