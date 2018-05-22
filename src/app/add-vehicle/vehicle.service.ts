import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { VehicleResponse } from '../add-vehicle/vehicle.response';
import { AddResponse } from '../common/add.response';
import { Vehicle } from '../add-vehicle/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
      headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
      })
};

@Injectable()
export class VehicleService {

      constructor(private http: HttpClient) {
      }

      getVehicles(): Observable<VehicleResponse> {
            return this.http
                  .post<VehicleResponse>("http://localhost:3000/getVehicles", null)
                  .pipe(tap(res => null));
      }

      addVehicle(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>('http://localhost:3000/addVehicle', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
