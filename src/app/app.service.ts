import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
    isLoginSubject = new BehaviorSubject<boolean>(false);

    constructor() { }

    setIsLoginPage(isLoginPage){
        this.isLoginSubject.next(isLoginPage);
    }

    getIsLoginPage() : Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }
}