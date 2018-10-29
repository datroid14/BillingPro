import { Component, ViewChild } from '@angular/core';
import { InvoiceService } from "../create-invoice/invoice.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent {

  invoices;

  displayedColumns = ['date', 'customer', 'contact_person', 'contact'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private invoiceService: InvoiceService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.appService.showDrawer(true);

    this.invoiceService.getInvoices().subscribe(response => {
      this.invoices = response.invoices;
      for (let i = 0; i < this.invoices.length; i++) {
        this.invoices[i].inv_date = moment(this.invoices[i].inv_date).format('DD MMM YYYY');
      }
      this.dataSource = new MatTableDataSource<INVOICE>(this.invoices);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  /**
  * Set the paginator after the view init since this component will
  * be able to query its view for the initialized paginator.
  */
  ngAfterViewInit() {

  }

  showInvoiceDetails(invoice) {
    if (invoice != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { inv_id: invoice.inv_id}
      };
      // Redirect it to View Product screen
      this.router.navigate(['/create-invoice'], navigationExtras);
    } else {
      this.router.navigate(['/create-invoice']);
    }
  }
}

export interface INVOICE {
  inv_id: number;
  inv_date: Date;
  inv_cust_id : number;
  inv_cust_name: string;
  inv_address: string;
  inv_contact_person: string;
  inv_contact: string;
}
