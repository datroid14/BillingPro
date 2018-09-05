import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view-purchase-copy',
  templateUrl: './view-purchase-copy.component.html',
  styleUrls: ['./view-purchase-copy.component.css']
})
export class ViewPurchaseCopyComponent {

  purchaseNo: number;
  purchaseDate: Date;
  customerName: string;
  customerAddress: string;
  contactPerson: string;
  contactNo: number;
  products = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.purchaseNo = params["pur_id"];
      this.purchaseDate = params["pur_date"];
      this.customerName = params["pur_cust_name"];
      this.customerAddress = params["pur_cust_address"];
      this.contactNo = params["pur_contact_no"];
      this.contactPerson = params["pur_contact_person"];      
      this.products = JSON.parse(params["pur_products"]);
    });
   }

  printPurchase(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Quatation</title>
          <style>
          //Customized style
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}

