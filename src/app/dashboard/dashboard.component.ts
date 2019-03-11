import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit{

  purchaseMonthTotalWithTax: number;
  purchaseTodaysTotalWithTax: number;
  purchaseTotalWithTax: number;
  saleMonthTotalWithTax: number;
  saleTodaysTotalWithTax: number;
  saleInvoiceTotalWithTax: number;
  purchaseMonthTotalWithoutTax: number;
  purchaseTodaysTotalWithoutTax: number;
  purchaseTotalWithoutTax: number;
  saleMonthTotalWithoutTax: number;
  saleTodaysTotalWithoutTax: number;
  saleInvoiceTotalWithoutTax: number;
  invoiceTotalWithoutTax: number;
  todaysDate = new Date();

  constructor(private router: Router, private appService: AppService, private dashboardService: DashboardService, private datePipe:DatePipe) { }

  ngOnInit(){
    this.appService.showDrawer(true);
    var formattedDate = this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd');
    const payload = { "data": { "todays_date": formattedDate } };

    this.dashboardService.getPurchaseTotalWithTax(payload).subscribe(response => {
      this.purchaseTotalWithTax = response.purchase_total;
      this.purchaseMonthTotalWithTax = response.current_month_total;
      this.purchaseTodaysTotalWithTax = response.todays_total;
    },
      error => {
        console.log(error)
      });

    this.dashboardService.getInvoiceTotalWithTax(payload).subscribe(response => {
      this.saleInvoiceTotalWithTax = response.invoice_total;
      this.saleMonthTotalWithTax = response.current_month_total;
      this.saleTodaysTotalWithTax = response.todays_total;
    },
      error => {
        console.log(error)
      });

      this.dashboardService.getPurchaseTotalWithoutTax(payload).subscribe(response => {
      this.purchaseTotalWithoutTax = response.purchase_total;
      this.purchaseMonthTotalWithoutTax = response.current_month_total;
      this.purchaseTodaysTotalWithoutTax = response.todays_total;
      },
        error => {
          console.log(error)
        });

      this.dashboardService.getInvoiceTotalWithoutTax(payload).subscribe(response => {
        this.saleInvoiceTotalWithoutTax = response.invoice_total;
      this.saleMonthTotalWithoutTax = response.current_month_total;
      this.saleTodaysTotalWithoutTax = response.todays_total;
      },
        error => {
          console.log(error)
        });
  }
}
