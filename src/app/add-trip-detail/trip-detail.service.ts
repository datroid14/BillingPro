import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { TripDetailResponse } from '../add-trip-detail/trip-detail.response';
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
export class TripDetailService {

      constructor(private http: HttpClient) {
      }

      getTripDetails(): Observable<TripDetailResponse> {
            return this.http
                  .post<TripDetailResponse>(constants.serverUrl + 'getTripDetails', null)
                  .pipe(tap(res => null));
      }

      getTripDetailById(payload: Object): Observable<TripDetailResponse> {
            return this.http
                  .post<TripDetailResponse>(constants.serverUrl + 'getTripDetailById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addTripDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addTripDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateTripDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateTripDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteTripDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteTripDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
