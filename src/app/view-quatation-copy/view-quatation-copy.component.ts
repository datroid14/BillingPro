import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'view-quatation-copy',
  templateUrl: './view-quatation-copy.component.html',
  styleUrls: ['./view-quatation-copy.component.css']
})
export class ViewQuatationCopyComponent implements OnInit {

  quatationNo: number;
  quatationDate: string;
  customerName: string;
  customerAddress: string;
  contactPerson: string;
  contactNo: number;
  logoImagePath: string;
  saiLogoImagePath: string;
  products = [];

  constructor(private route: ActivatedRoute, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.quatationNo = params["quat_id"];
      this.quatationDate = moment(params["quat_date"]).format('DD MMM YYYY');
      this.customerName = params["quat_cust_name"];
      this.customerAddress = params["quat_cust_address"];
      this.contactNo = params["quat_contact_no"];
      this.contactPerson = params["quat_contact_person"];
      this.products = JSON.parse(params["quat_products"]);
    });
  }

  ngOnInit() {
    // Image paths
    this.logoImagePath = "assets/images/ic_logo.png";
    this.saiLogoImagePath = "assets/images/sai_logo.png";
  }

  printQuatation(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
            table,
            th,
            td {
                border: 1px solid grey;
                border-collapse: collapse;
                padding: 2px;
              }
              .container-css {
                display: flex;
                flex-direction: row;
            }
            
            .container-vertical-css {
                display: flex;
                flex-direction: column;
            }
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
