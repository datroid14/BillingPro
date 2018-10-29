import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoginPage : Observable<boolean>;

  constructor( public appService : AppService ) {
    // enableProdMode();
    this.isLoginPage = appService.isDrawerShown();
  }

}


