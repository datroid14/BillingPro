import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
    private config = new BehaviorSubject({
        isLoginPage: false
    });

    constructor() { }

    setIsLogin(isLogin: boolean) {
        // this.config.next({ isLoginPage: isLogin });
    }

    getIsLogin() {
        // return this.config.map(config => config.isLoginPage);
    }
}