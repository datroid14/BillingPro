import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { VehicleResponse } from '../add-vehicle/vehicle.response';
import { AddResponse } from '../common/add.response';
import { Vehicle } from '../add-vehicle/vehicle';
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
export class VehicleService {

      constructor(private http: HttpClient) {
      }

      getVehicles(): Observable<VehicleResponse> {
            return this.http
                  .post<VehicleResponse>(constants.serverUrl + 'getVehicles', null)
                  .pipe(tap(res => null));
      }

      getVehicleDetailsById(payload: Object): Observable<VehicleResponse> {
            return this.http.post<VehicleResponse>(constants.serverUrl + 'getVehicleById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addVehicle(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addVehicle', payload, httpOptions)
                  .pipe(tap(res => null));
      }


      updateVehicle(payload: Object): Observable<AddResponse> {
            return this.http
                .post<AddResponse>(constants.serverUrl + 'updateVehicle', payload, httpOptions)
                .pipe(tap(res => null));
        }
    
        deleteVehicle(payload: Object): Observable<AddResponse> {
            return this.http
                .post<AddResponse>(constants.serverUrl + 'deleteVehicle', payload, httpOptions)
                .pipe(tap(res => null));
        }
}
