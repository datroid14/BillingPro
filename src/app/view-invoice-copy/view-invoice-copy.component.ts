import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../app.service";
import { Location } from '@angular/common';

@Component({
  selector: 'view-invoice-copy',
  templateUrl: './view-invoice-copy.component.html',
  styleUrls: ['./view-invoice-copy.component.css']
})
export class ViewInvoiceCopyComponent implements OnInit {

  invoiceNo: number;
  invoiceDate: Date;
  customerName: string;
  customerAddress: string;
  contactNo: number;
  invoiceSubTotal: number;
  taxAmount: number;
  invoiceTotalAmount: number;
  products = [];

  public constructor(private route: ActivatedRoute, private appService: AppService, private location: Location) {
    debugger;
    this.taxAmount = 0;
    this.invoiceTotalAmount = 0;
    this.route.queryParams.subscribe(params => {
      this.invoiceNo = params["inv_id"];
      this.invoiceDate = params["inv_date"];
      this.customerName = params["inv_customer"];
      this.customerAddress = params["inv_address"];
      this.contactNo = params["inv_contact"];
      this.invoiceTotalAmount = parseInt(params["inv_total_amount"]);
      this.products = JSON.parse(params["inv_products"]);
      console.log("Products "+ JSON.stringify(this.products));
    });
  }

  ngOnInit() {
    this.appService.showDrawer(true);
  }

  printInvoice(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Shubham Print Menu</title>
          <style>
            table,
            th,
            td {
                border: 1px solid grey;
                border-collapse: collapse;
                padding: 2px;
              }
        </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  back(){
    this.location.back();
  }
}
