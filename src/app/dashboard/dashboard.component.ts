import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { DashboardService } from '../dashboard/dashboard.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  invoiceTotalWithTax: number;
  invoiceTotalWithoutTax: number;

  constructor(private router: Router, private appService: AppService, private dashboardService: DashboardService) { }

  ngOnInit(){
    this.appService.showDrawer(true);
    this.dashboardService.getInvoiceTotalWithTax().subscribe(response => {
      this.invoiceTotalWithTax = response.invoice_total;
    },
      error => {
        console.log(error)
      });

      this.dashboardService.getInvoiceTotalWithoutTax().subscribe(response => {
        this.invoiceTotalWithoutTax = response.invoice_total;
      },
        error => {
          console.log(error)
        });
  }
}
