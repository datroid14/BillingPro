import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InvoiceService } from "../create-invoice/invoice.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent {

  invoices;

  displayedColumns = ['date', 'vendor', 'contact_person', 'contact'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private invoiceService: InvoiceService, private router: Router) {
  }

  ngOnInit() {

    this.invoiceService.getInvoices().subscribe(response => {
      this.invoices = response.invoices;
      this.dataSource = new MatTableDataSource<INVOICE>(this.invoices);
      this.dataSource.paginator = this.paginator;
      console.log("View Invoice "+this.invoices);
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
        queryParams: invoice
      };
      // Redirect it to View Product screen
      this.router.navigate(['/create-invoice'], navigationExtras);
    }
  }
}

export interface INVOICE {
  inv_id: number;
  inv_cust_name: string;
  inv_cust_address: string;
  inv_contact_person: string;
  inv_contact_no: string;
}
