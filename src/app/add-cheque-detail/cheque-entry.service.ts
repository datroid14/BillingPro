import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { ChequeEntryResponse } from '../add-cheque-detail/cheque-entry.response';
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
export class ChequeEntryService {

      constructor(private http: HttpClient) {
      }

      getChequeEntries(): Observable<ChequeEntryResponse> {
            return this.http
                  .post<ChequeEntryResponse>(constants.serverUrl + 'getChequeEntries', null)
                  .pipe(tap(res => null));
      }

      getChequeEntryById(payload: Object): Observable<ChequeEntryResponse> {
            return this.http
                  .post<ChequeEntryResponse>(constants.serverUrl + 'getChequeEntryById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addChequeEntry(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addChequeEntry', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateChequeEntry(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateChequeEntry', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteChequeEntry(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteChequeEntry', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
