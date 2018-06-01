import { Component, ViewChild, OnInit } from '@angular/core';
import { PurchaseService } from "../add-purchase/purchase.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'view-purchase',
  templateUrl: './view-purchase.component.html',
  styleUrls: ['./view-purchase.component.css']
})

export class ViewPurchaseComponent implements OnInit {

  purchases;

  displayedColumns = ['date', 'vendor', 'contact_person', 'contact'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private purchaseService: PurchaseService, private router: Router) {
  }

  ngOnInit() {

    this.purchaseService.getPurchases().subscribe(response => {
      this.purchases = response.purchases;
      this.dataSource = new MatTableDataSource<PURCHASE>(this.purchases);
      this.dataSource.paginator = this.paginator;
      console.log("Purchase "+this.purchases);
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

  showPurchaseDetails(purchase) {

    if (purchase != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: purchase
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-purchase'], navigationExtras);
    }
  }
}

export interface PURCHASE {
  pur_id: number;
  pur_cust_name: string;
  pur_cust_address: string;
  pur_contact_person: string;
  pur_contact_no: string;
}

