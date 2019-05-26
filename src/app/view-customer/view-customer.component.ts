import { Component, ViewChild, OnInit } from '@angular/core';
import { CustomerService } from "../add-customer/customer.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';

@Component({
  selector: 'view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customers;

  displayedColumns = ['name', 'contact_person', 'contact', 'email', 'gst'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private customerService: CustomerService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);
    
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.customers;
      this.dataSource = new MatTableDataSource<CUSTOMER>(this.customers);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showCustomerDetails(customer) {

    if (customer != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { cust_id: customer.cust_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-customer'], navigationExtras);
    } else {
      this.router.navigate(['/add-customer']);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface CUSTOMER {
  cust_id: number;
  cust_name: string;
  cust_contact: string;
  cust_contact_person: string;
  cust_email: string;
  cust_gst_no: string;
}
