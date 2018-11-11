import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { VendorResponse } from '../add-vendor/vendor.response';
import { Injectable } from '@angular/core';
import { AddResponse } from '../common/add.response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from '../common/constants';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'q=0.8;application/json;q=0.9'
    })
};

@Injectable()
export class VendorService {

    constructor(private http: HttpClient) {
    }

    getVendors(): Observable<VendorResponse> {
        return this.http.post<VendorResponse>(constants.serverUrl + 'getVendors', null)
            .pipe(tap(res => null));
    }

    getVendorById(payload: Object): Observable<VendorResponse> {
        return this.http.post<VendorResponse>(constants.serverUrl + 'getVendorById', payload, httpOptions)
            .pipe(tap(res => null));
    }

    addVendor(payload: Object): Observable<AddResponse> {
        return this.http
            .post<AddResponse>(constants.serverUrl + 'addVendor', payload, httpOptions)
            .pipe(tap(res => null));
    }

    updateVendor(payload: Object): Observable<AddResponse> {
        return this.http
            .post<AddResponse>(constants.serverUrl + 'updateVendor', payload, httpOptions)
            .pipe(tap(res => null));
    }

    deleteVendor(payload: Object): Observable<AddResponse> {
        return this.http
            .post<AddResponse>(constants.serverUrl + 'deleteVendor', payload, httpOptions)
            .pipe(tap(res => null));
    }
}