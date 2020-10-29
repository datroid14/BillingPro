import { Component, ViewChild, OnInit } from '@angular/core';
import { PurchaseService } from '../add-purchase/purchase.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.component.html',
  styleUrls: ['./view-purchase.component.css']
})

export class ViewPurchaseComponent implements OnInit {

  purchases;

  displayedColumns = ['date', 'number', 'vendor', 'contact_person', 'contact'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private purchaseService: PurchaseService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {

    this.appService.showDrawer(true);

    this.purchaseService.getPurchases().subscribe(response => {
      this.purchases = response.purchases;
      if (this.purchases !== undefined) {
        for (let i = 0; i < this.purchases.length; i++) {
          this.purchases[i].pur_date = moment(this.purchases[i].pur_date).format('DD MMM YYYY');
        }
        this.dataSource = new MatTableDataSource<PURCHASE>(this.purchases);
        this.dataSource.paginator = this.paginator;
      }
    },
      error => {
        console.log(error);
      });
  }

  showPurchaseDetails(purchase) {
    if (purchase !== undefined) {
      const navigationExtras: NavigationExtras = {
        queryParams: { pur_id: purchase.pur_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-purchase'], navigationExtras);
    } else {
      this.router.navigate(['/add-purchase']);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PURCHASE {
  pur_id: number;
  pur_date: Date;
  pur_invoice_no: string;
  pur_cust_name: string;
  pur_cust_address: string;
  pur_contact_person: string;
  pur_contact_no: string;
}

