import { Component, OnInit } from '@angular/core';
import { InvoiceProduct } from "../create-invoice/invoice.product";
import { InvoiceService } from "../create-invoice/invoice.service";
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-view-challan-statement',
  templateUrl: './view-challan-statement.component.html',
  styleUrls: ['./view-challan-statement.component.css']
})
export class ViewChallanStatementComponent implements OnInit {

  invoiceId: number;
  invoiceProducts: InvoiceProduct[];

  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute,
    private appService: AppService) {
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

      // Format date for displaying in desire format
      if (this.invoiceProducts != undefined && this.invoiceProducts.length > 0) {
        for (var i = 0; i < this.invoiceProducts.length; i++) {
          this.invoiceProducts[i].chal_date = moment(this.invoiceProducts[i].chal_date).format('DD MMM YYYY');
        }
      }
    },
      error => {
        console.log(error)
      });
  }
}
