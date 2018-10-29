import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { EmployeeResponse } from '../add-employee/employee.response';
import { AddResponse } from '../common/add.response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
      headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
      })
};

@Injectable()
export class EmployeeService {

      constructor(private http: HttpClient) {
      }

      getEmployees(): Observable<EmployeeResponse> {
            return this.http
                  .post<EmployeeResponse>("http://localhost:3000/getEmployees", null)
                  .pipe(tap(res => null));
      }

      getEmployeeById(payload: Object): Observable<EmployeeResponse> {
            return this.http
                  .post<EmployeeResponse>("http://localhost:3000/getEmployeeById", payload, httpOptions)
                  .pipe(tap(res => null));
      }

      addEmployee(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>('http://localhost:3000/addEmployee', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      updateEmployee(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>('http://localhost:3000/updateEmployee', payload, httpOptions)
                  .pipe(tap(res => null));
      }

      deleteEmployee(payload: Object): Observable<AddResponse> {
            return this.http
                  .post<AddResponse>('http://localhost:3000/deleteEmployee', payload, httpOptions)
                  .pipe(tap(res => null));
      }
}
