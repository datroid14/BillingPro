import { Component, ViewChild, OnInit } from '@angular/core';
import { PaymentService } from "../add-payment/payment.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'view-payment-detail',
  templateUrl: './view-payment-detail.component.html',
  styleUrls: ['./view-payment-detail.component.css']
})
export class ViewPaymentDetailComponent implements OnInit {

  paymentDetails;
  isLogin = false;

  displayedColumns = ['date', 'name', 'amount', 'type'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private paymentService: PaymentService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.appService.showDrawer(true);

    this.paymentService.getPaymentDetails().subscribe(response => {
      this.paymentDetails = response.paymentDetails;
      for (let i = 0; i < this.paymentDetails.length; i++) {
        this.paymentDetails[i].payment_date = moment(this.paymentDetails[i].payment_date).format('DD MMM YYYY');
      }
      if (this.paymentDetails.length > 0) {
        this.dataSource = new MatTableDataSource<PAYMENTDETAIL>(this.paymentDetails);
        this.dataSource.paginator = this.paginator;
      } 
    },
      error => {
        console.log(error)
      });
  }

  showPaymentDetails(paymentEntry) {
    if (paymentEntry != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { payment_id: paymentEntry.payment_id }
      };
      // Redirect it to Add Cheque Entry screen
      this.router.navigate(['/add-payment'], navigationExtras);
    } else {
      // Redirect it to Add Cheque Entry screen without data
      this.router.navigate(['/add-payment']);
    }
  }
}

export interface PAYMENTDETAIL {
  payment_id: number;
  payment_date: Date;
  emp_id: number;
  payment_amount: number;
  payment_type: string;
}
