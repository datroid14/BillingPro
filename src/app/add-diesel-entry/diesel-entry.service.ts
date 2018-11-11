import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { DieselEntryResponse } from '../add-diesel-entry/diesel-entry.response';
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
export class DieselEntryService {

      constructor(private http: HttpClient) {
      }

      getDieselEntries(): Observable<DieselEntryResponse> {
            return this.http
                  .post<DieselEntryResponse>(constants.serverUrl + 'getDieselEntries', null)
                  .pipe(tap(res => null));
      }

      getDieselEntryById(payload: Object): Observable<DieselEntryResponse> {
            return this.http
                  .post<DieselEntryResponse>(constants.serverUrl + 'getDieselEntryById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addDieselEntry(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addDieselEntry', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateDieselEntry(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateDieselEntry', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteDieselEntry(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteDieselEntry', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
