import { Component, ViewChild, OnInit } from '@angular/core';
import { VendorService } from "../add-vendor/vendor.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.css']
})

export class ViewVendorComponent implements OnInit {

  vendors;
  isLogin = false;

  displayedColumns = ['name', 'address', 'contact', 'email'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private vendorService: VendorService, private router: Router) {
  }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(response => {
      this.vendors = response.vendors;
      this.dataSource = new MatTableDataSource<VENDOR>(this.vendors);
      this.dataSource.paginator = this.paginator;
      console.log(this.vendors);
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

  showVendorDetails(vendor) {

    if (vendor != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: vendor
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-vendor'], navigationExtras);
    }
  }
}

export interface VENDOR {
  vend_id: number;
  vend_name: string;
  vend_contact: string;
  vend_address: string;
  vend_email: string;
}
