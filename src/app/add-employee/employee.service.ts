import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { EmployeeResponse } from '../add-employee/employee.response';
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
export class EmployeeService {

      constructor(private http: HttpClient) {
            console.log("Employee " + constants.serverUrl);
      }

      getEmployees(): Observable<EmployeeResponse> {
            return this.http
                  .post<EmployeeResponse>(constants.serverUrl + 'getEmployees', null)
                  .pipe(tap(res => null));
      }

      getEmployeeById(payload: Object): Observable<EmployeeResponse> {
            return this.http
                  .post<EmployeeResponse>(constants.serverUrl + 'getEmployeeById', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addEmployee(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'addEmployee', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateEmployee(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'updateEmployee', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteEmployee(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>(constants.serverUrl + 'deleteEmployee', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
