import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent {

  private invoiceDate : Date;
  private customerName: string;
  private customerAddress: string;
  private contactNo : number;
  private invoiceTotal : number;
  private taxAmount : number;
  private invoiceTotalAmount : number;
  private products = [];

  public constructor(private route: ActivatedRoute) {
    this.taxAmount = 0;
    this.invoiceTotalAmount = 0;
    this.route.queryParams.subscribe(params => {
      this.invoiceDate = params["invoiceDate"];
      this.customerName = params["customerName"];
      this.customerAddress = params["customerAddress"];
      this.contactNo = params["contactNo"];
      this.invoiceTotal = parseInt(params["invoiceTotal"]);
      this.taxAmount = this.invoiceTotal * 0.025;
      this.invoiceTotalAmount = this.invoiceTotal + (this.taxAmount * 2);
      this.products = JSON.parse(params["product"]);
    });
  }
}
