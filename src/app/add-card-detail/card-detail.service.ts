import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { CardDetailResponse } from '../add-card-detail/card-detail.response';
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
export class CardDetailService {

      constructor(private http: HttpClient) {
      }

      getCardDetails(): Observable<CardDetailResponse> {
            return this.http
                  .post<CardDetailResponse>(constants.serverUrl + 'getCardDetails', null)
                  .pipe(tap(res => null));
      }

      getCardDetailById(payload: Object): Observable<CardDetailResponse> {
            return this.http
                  .post<CardDetailResponse>(constants.serverUrl + 'getCardDetailById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addCardDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addCardDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateCardDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateCardDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteCardDetail(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteCardDetail', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
