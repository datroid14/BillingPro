import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { VendorResponse } from '../add-vendor/vendor.response';
import { Injectable } from '@angular/core';
import { AddResponse } from '../common/add.response';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        return this.http.post<VendorResponse>("http://localhost:3000/getVendors", null)
            .pipe(tap(res => null));
    }

    addVendor(payload: Object): Observable<AddResponse> {
        return this.http
            .post<AddResponse>('http://localhost:3000/addVendor', payload, httpOptions)
            .pipe(tap(res => null));
    }
}