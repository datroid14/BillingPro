import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { CustomerService } from "../add-customer/customer.service";

/**
 * @title Table with pagination
 */
@Component({
  selector: 'table-view',
  styleUrls: ['table-view.component.css'],
  templateUrl: 'table-view.component.html',
})
export class TableViewComponent implements OnInit {

  isLogin = false;
  customers;

  displayedColumns = ['name', 'address', 'contact', 'email'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit() {

    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.customers;
      this.dataSource = new MatTableDataSource<CUSTOMER>(this.customers);
      this.dataSource.paginator = this.paginator;
      console.log(this.customers);
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

  showCustomerDetails(customer) {

    if (customer != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: customer
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-customer'], navigationExtras);
    } 
  }
}

export interface CUSTOMER {
  cust_id: number;
  cust_name: string;
  cust_address: string;
  cust_email: string;
}

