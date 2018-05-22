import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName: string;
  password: string;

  constructor(private router: Router, private appService: AppService) { 
    this.userName = "admin";
    this.password = "admin";

    this.appService.setIsLogin(false);
  }

  logIn() {

    if (this.userName == "admin" && this.password == "admin") {
      // Redirect it to customer screen
      this.router.navigate(['/create-chalan']);
    }else {
      alert("Invalid credentials...");
    }
  }
}
