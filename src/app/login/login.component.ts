import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    appService.showDrawer(false);
  }

  logIn() {

    if (this.userName == "admin" && this.password == "admin") {
      // Redirect it to customer screen
      this.router.navigate(['/view-customer']);
    } else {
      alert("Invalid credentials...");
    }
  }
}
