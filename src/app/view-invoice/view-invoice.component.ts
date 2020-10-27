import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../create-invoice/invoice.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  invoices;

  displayedColumns = ['date', 'invoice_no', 'customer', 'contact_detail', 'email'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private invoiceService: InvoiceService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.appService.showDrawer(true);

    this.showInvoices(false);
  }

  showInvoiceDetails(invoice) {
    if (invoice !== undefined) {
      const navigationExtras: NavigationExtras = {
        queryParams: { inv_id: invoice.inv_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/create-invoice'], navigationExtras);
    } else {
      this.router.navigate(['/create-invoice']);
    }
  }

  showInvoices(isWithoutTax) {
    if (isWithoutTax) {
      this.invoiceService.getInvoicesWithoutTax().subscribe(response => {
        this.invoices = response.invoices;
        for (let i = 0; i < this.invoices.length; i++) {
          this.invoices[i].inv_date = moment(this.invoices[i].inv_date).format('DD MMM YYYY');
        }
        this.dataSource = new MatTableDataSource<INVOICE>(this.invoices);
        this.dataSource.paginator = this.paginator;
      },
        error => {
          console.log(error);
        });
    } else {
      this.invoiceService.getInvoices().subscribe(response => {
        this.invoices = response.invoices;
        for (let i = 0; i < this.invoices.length; i++) {
          this.invoices[i].inv_date = moment(this.invoices[i].inv_date).format('DD MMM YYYY');
        }
        this.dataSource = new MatTableDataSource<INVOICE>(this.invoices);
        this.dataSource.paginator = this.paginator;
      },
        error => {
          console.log(error);
        });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface INVOICE {
  inv_id: number;
  inv_number: string;
  inv_date: Date;
  inv_cust_id: number;
  inv_cust_name: string;
  inv_address: string;
  inv_contact_person: string;
  inv_contact: string;
  inv_email: string;
}
