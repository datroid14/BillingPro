import { Component, OnInit } from '@angular/core';
import { InvoiceProduct } from "../create-invoice/invoice.product";
import { InvoiceService } from "../create-invoice/invoice.service";
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-challan-statement',
  templateUrl: './view-challan-statement.component.html',
  styleUrls: ['./view-challan-statement.component.css']
})
export class ViewChallanStatementComponent implements OnInit {

  invoiceId: number;
  invoiceProducts: InvoiceProduct[];
  invoiceProductsQuantity: InvoiceProduct[];

  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute,
    private appService: AppService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.invoiceId = params["inv_id"];
    });
  }

  ngOnInit() {
    this.getInvoiceProducts();
  }

  getInvoiceProducts() {
    const productPayload = { "data": { "inv_id": this.invoiceId } };

    this.invoiceService.getInvoiceProductsById(productPayload).subscribe(response => {
      this.invoiceProducts = response.products;

      this.getInvoiceProductsQuantity(productPayload);
    },
      error => {
        console.log(error)
      });
  }

  getInvoiceProductsQuantity(payload) {

    this.invoiceService.getInvoiceProductsQuantityById(payload).subscribe(response => {
      this.invoiceProductsQuantity = response.products;
      // Format date for displaying in desire format
      if (this.invoiceProducts != undefined && this.invoiceProducts.length > 0) {
        for (var i = 0; i < this.invoiceProducts.length; i++) {
          this.invoiceProducts[i].chal_date = moment(this.invoiceProducts[i].chal_date).format('DD MMM YYYY');
          for (var j = 0; j < this.invoiceProductsQuantity.length; j++) {
            if (this.invoiceProducts[i].prod_id == this.invoiceProductsQuantity[j].prod_id) {
              this.invoiceProducts[i].prod_total_qty = this.invoiceProductsQuantity[j].prod_total_qty;
            }
          }
        }
      }
    },
      error => {
        console.log(error)
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
          <style>
            .container-css {
                display: flex;
                flex-direction: row;
            }
            
            .container-vertical-css {
                display: flex;
                flex-direction: column;
            }

            .input-text {
              padding: 8px;
              text-align: center;
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
