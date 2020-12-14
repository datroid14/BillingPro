
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { PaymentDue } from '../dashboard/payment_due';

@Component({
  selector: 'app-show-payment-due',
  templateUrl: './show-payment-due.component.html',
  styleUrls: ['./show-payment-due.component.css'],
  providers: [DatePipe]
})
export class ShowPaymentDueComponent implements OnInit {

  dateOptions: DateOption[] = [{'id': 1, 'value':'Current Month'}, {'id': 2, 'value':'Last Month'}, {'id': 3, 'value':'Last 3 Months'}, 
  {'id': 4, 'value':'Last 6 Months'}, {'id': 5, 'value':'Current Financial Year'}, {'id': 6, 'value':'Last Financial Year'}, {'id': 7, 'value':'Select Date Range'}];
  isDateRangeSelected: boolean = false;
  fromDate: string;
  toDate: string;
  paymentDueDetails: PaymentDue[];

  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) { }

  ngOnInit() {
  }

  setOptionSelected(optionId){
    this.paymentDueDetails = [];
    if(optionId === 7){
      this.isDateRangeSelected = true;
    } else {
      this.isDateRangeSelected = false;
      const todaysDate = new Date();
      if(optionId === 1){
        this.fromDate = todaysDate.getFullYear().toString() + '-' + (todaysDate.getMonth() + 1).toString() + '-' + '01';
        this.toDate = this.datePipe.transform(todaysDate, 'yyyy-MM-dd');
      } else if(optionId === 2) {
        this.fromDate = todaysDate.getFullYear().toString() + '-' + (todaysDate.getMonth()).toString() + '-' + '01';
        this.toDate = todaysDate.getFullYear().toString() + '-' + (todaysDate.getMonth()).toString() + '-' + '31';
      } else if(optionId === 3) {
        this.fromDate = todaysDate.getFullYear().toString() + '-' + (todaysDate.getMonth() - 2).toString() + '-' + (todaysDate.getDay() + 1).toString();
        this.toDate = this.datePipe.transform(todaysDate, 'yyyy-MM-dd');
      } else if(optionId === 4) {
        this.fromDate = todaysDate.getFullYear().toString() + '-' + (todaysDate.getMonth() - 5).toString() + '-' + (todaysDate.getDay() + 1).toString();
        this.toDate = this.datePipe.transform(todaysDate, 'yyyy-MM-dd');
      } else if(optionId === 5) {
        this.fromDate = todaysDate.getFullYear().toString() + '-04-' + (todaysDate.getDay() + 1).toString();
        this.toDate = this.datePipe.transform(todaysDate, 'yyyy-MM-dd');
      } else if(optionId === 6) {
        this.fromDate = (todaysDate.getFullYear() - 1).toString() + '-04-01';
        this.toDate = (todaysDate.getFullYear()).toString() + '-03-31';
      }
      this.showCustomerPaymentDueDetails();
    }
  }

  showCustomerPaymentDueDetails(){
    const payload = {'data': {'from_date': this.fromDate, 'to_date': this.toDate }};

    this.dashboardService.getPaymentDueDetails(payload).subscribe(response => {
      this.paymentDueDetails = response.payment_due;
    },
      error => {
        console.log(error);
      });
  }

  showPaymentDueDetailsForSelectedPeriod(){
    const selectedFromDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    const selectedToDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');

    if(selectedFromDate !== undefined && selectedToDate !== undefined){
      this.showCustomerPaymentDueDetails();
    }
  }
}

interface DateOption {
  id: number;
  value: string;
}
