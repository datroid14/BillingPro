import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { MaintenanceResponse } from './maintenance.response';
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
export class MaintenanceService {

      constructor(private http: HttpClient) {
      }

      getMaintenanceDetails(): Observable<MaintenanceResponse> {
            return this.http
                  .post<MaintenanceResponse>(constants.serverUrl + 'getMaintenanceDetails', null)
                  .pipe(tap(res => null));
      }

      getMaintenanceDetailById(payload: Object): Observable<MaintenanceResponse> {
            return this.http
                  .post<MaintenanceResponse>(constants.serverUrl + 'getMaintenanceDetailById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addMaintenanceDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addMaintenanceDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateMaintenanceDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateMaintenanceDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteMaintenanceDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteMaintenanceDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}