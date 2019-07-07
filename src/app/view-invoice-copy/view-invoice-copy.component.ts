import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../app.service";
import { Location } from '@angular/common';
import * as moment from 'moment';
import { InvoiceService } from "../create-invoice/invoice.service";

@Component({
  selector: 'view-invoice-copy',
  templateUrl: './view-invoice-copy.component.html',
  styleUrls: ['./view-invoice-copy.component.css']
})

export class ViewInvoiceCopyComponent implements OnInit {

  invoiceNo: number;
  invoiceDate: string;
  customerName: string;
  customerAddress: string;
  customerGSTNumber: string;
  contactNo: number;
  contactPerson: string;
  invoiceSubTotal: number;
  taxAmount: number;
  invoiceTotalAmount: number;
  invoiceGSTId: number;
  invoiceGSTPercentage: number;
  roundOffAmount: number;
  isWithoutTax: boolean;
  amountInWords: string;
  minChallanDate: string;
  maxChallanDate: string;
  logoImagePath: string;
  saiLogoImagePath: string;
  invoiceProducts = [];
  invoiceProductsQuantity = [];

  public constructor(private route: ActivatedRoute, private appService: AppService, private invoiceService: InvoiceService, private location: Location) {
    this.taxAmount = 0;
    this.invoiceTotalAmount = 0;
    this.route.queryParams.subscribe(params => {
      this.invoiceNo = params["inv_id"];
    });
  }

  ngOnInit() {

    // Image paths
    this.logoImagePath = "assets/images/ic_logo.png";
    this.saiLogoImagePath = "assets/images/sai_logo.png";

    this.appService.showDrawer(true);

    this.getInvoiceDetailById();
  }

  printInvoice(): void {
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

  getInvoiceDetailById() {
    const payload = { "data": { "inv_id": this.invoiceNo } };
    this.invoiceService.getInvoiceById(payload).subscribe(response => {
      if (response.status == 200) {
        if (response.invoices != undefined && response.invoices.length > 0) {
          this.setInvoiceDetail(response.invoices[0]);
        }
      }
    },
      error => {
        console.log(error)
      });

  }

  setInvoiceDetail(invoice) {
    this.invoiceDate = moment(invoice.inv_date).format('DD MMM YYYY');
    this.customerName = invoice.inv_customer;
    this.customerAddress = invoice.inv_address;
    this.contactNo = invoice.inv_contact;
    this.contactPerson = invoice.inv_contact_person;
    this.customerGSTNumber = invoice.cust_gst_no;
    this.invoiceTotalAmount = invoice.inv_product_total;
    this.invoiceGSTId = invoice.inv_gst_id;
    this.isWithoutTax = invoice.inv_without_tax;
    this.roundOffAmount = invoice.inv_round_off;

    // Get Invoice products for selected invoice id
    this.getInvoiceProducts();
  }

  getInvoiceProducts() {
    const productPayload = { "data": { "inv_id": this.invoiceNo } };

    this.invoiceService.getInvoiceProductsById(productPayload).subscribe(response => {
      this.invoiceProducts = response.products;
      this.invoiceGSTPercentage = this.invoiceProducts[0].prod_percentage;
      this.taxAmount = this.invoiceTotalAmount * (this.invoiceGSTPercentage / 100);
      this.amountInWords = this.convertNumberToWords(this.invoiceTotalAmount + this.taxAmount);

      this.getInvoiceProductsQuantity(productPayload);
    },
      error => {
        console.log(error)
      });
  }

  getInvoiceProductsQuantity(payload) {

    var challanDates = [];

    this.invoiceService.getInvoiceProductsQuantityById(payload).subscribe(response => {
      this.invoiceProductsQuantity = response.products;

      // Format date for displaying in desire format
      if (this.invoiceProducts != undefined && this.invoiceProducts.length > 0) {
        for (var i = 0; i < this.invoiceProducts.length; i++) {
          var formattedChallanDate = moment(this.invoiceProducts[i].chal_date).format('MM/DD/YYYY');
          this.invoiceProducts[i].chal_date = moment(this.invoiceProducts[i].chal_date).format('DD/MM/YYYY');
          challanDates.push(new Date(formattedChallanDate));

          for (var j = 0; j < this.invoiceProductsQuantity.length; j++) {
            if (this.invoiceProductsQuantity[j].prod_id == this.invoiceProducts[i].prod_id) {
              this.invoiceProductsQuantity[j].prod_name = this.invoiceProducts[i].prod_name;
              this.invoiceProductsQuantity[j].prod_hsn = this.invoiceProducts[i].prod_hsn;
              this.invoiceProductsQuantity[j].prod_rate = this.invoiceProducts[i].prod_rate;
              this.invoiceProductsQuantity[j].prod_unit = this.invoiceProducts[i].prod_unit;
              break;
            }
          }

          if (this.invoiceProductsQuantity[0].prod_name == 'JCB') {
            // Calculation for JCB
            let totalHours = this.getJCBHours(this.invoiceProductsQuantity[0].prod_total_qty);
            this.invoiceProductsQuantity[0].prod_sub_total = this.invoiceProductsQuantity[0].prod_rate * totalHours;
          } else {
            this.invoiceProductsQuantity[0].prod_sub_total = this.invoiceProductsQuantity[0].prod_rate * this.invoiceProductsQuantity[0].prod_total_qty;
          }
        }
        var sorted = challanDates.sort(this.sortDates);
        this.minChallanDate = moment(sorted[0]).format('DD/MM/YYYY');
        this.maxChallanDate = moment(sorted[sorted.length - 1]).format('DD/MM/YYYY');
      }
    },
      error => {
        console.log(error)
      });
  }

  sortDates(a, b) {
    return a.getTime() - b.getTime();
  }

  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = + number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++ , j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + (+ n_array[j]);
            n_array[i] = 0;
          }
        }
      }
      var value;
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          value = n_array[i] * 10;
        } else {
          value = n_array[i];
        }
        if (value != 0) {
          words_string += words[value] + " ";
        }
        if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Crores ";
        }
        if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Lakhs ";
        }
        if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Thousand ";
        }
        if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
          words_string += "Hundred and ";
        } else if (i == 6 && value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    return words_string;
  }

  getJCBHours(workingTime) {
    let hours = 0;
    let timeArr = workingTime.toString().split('.');
    if (timeArr.length == 2) {
      let minuteStr = timeArr[1];
      if (minuteStr.length == 1) {
        hours = parseInt(minuteStr) * 10 / 60;
      } else {
        hours = parseInt(minuteStr) / 60;
      }
    }
    return parseInt(timeArr[0]) + hours;
  }
}
