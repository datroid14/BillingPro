import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-challan-copy',
  templateUrl: './view-challan-copy.component.html',
  styleUrls: ['./view-challan-copy.component.css']
})
export class ViewChallanCopyComponent {

  challanNo: number;
  challanDate: string;
  customerName: string;
  customerAddress: string;
  contactPerson: string;
  contactNo: number;
  productName: string;
  productUnit: string;
  productQty: number;
  vehicleNo: string;

  constructor(private route: ActivatedRoute, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.challanNo = params["chal_id"];
      this.challanDate = moment(params["chal_date"]).format('DD MMM YYYY');
      this.customerName = params["chal_cust_name"];
      this.customerAddress = params["chal_cust_address"];
      this.contactNo = params["chal_contact_no"];
      this.contactPerson = params["chal_contact_person"];
      this.productName = params["prod_name"];
      this.productUnit = params["prod_unit"];
      this.productQty = params["chal_prod_qty"];
      this.vehicleNo = params["veh_number"];
    });
  }

  printChallan(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Delivery Challan</title>
          <style>
          //Customized style
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  back() {
    this.location.back();
  }
}

