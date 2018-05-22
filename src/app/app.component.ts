import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoginPage: boolean;

  constructor(private appService: AppService) {
    // this.isLoginPage = this.appService.getIsLogin();
  }
}


