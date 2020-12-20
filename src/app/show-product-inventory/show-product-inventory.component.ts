import { Component, OnInit } from '@angular/core';
import { Customer } from '../add-customer/customer';
import { CustomerResponse } from '../add-customer/customer.response';
import { CustomerService } from '../add-customer/customer.service';
import { Product } from '../add-product/product';
import { ProductService } from '../add-product/product.service';
import { Challan } from '../create-challan/challan';
import { DashboardService } from '../dashboard/dashboard.service';
import { ProductInventory } from '../dashboard/product-inventory';

@Component({
  selector: 'app-show-product-inventory',
  templateUrl: './show-product-inventory.component.html',
  styleUrls: ['./show-product-inventory.component.css']
})
export class ShowProductInventoryComponent implements OnInit {

  products: Product[];
  customers: Customer[];
  inventory: ProductInventory[];
  challanTotal = 0;
  dieselTotal = 0;
  debitTotal = 0;
  selectedMonth = 0;
  selectedYear = 0;
  selectedProductId = 0;
  selectedCustomerId = 0;
  customerName = '';
  productName = '';

  months: Month[] = [{'index': 1, 'value': 'January'}, {'index': 2, 'value': 'February'}, {'index': 3, 'value': 'March'},
  {'index': 4, 'value': 'April'}, {'index': 5, 'value': 'May'}, {'index': 6, 'value': 'June'}, {'index': 7, 'value': 'July'},
  {'index': 8, 'value': 'August'}, {'index': 9, 'value': 'September'}, {'index': 10, 'value': 'October'},
  {'index': 11, 'value': 'November'}, {'index': 12, 'value': 'December'}];

  years: Year[] = [{'value': 2018}, {'value': 2019}, {'value': 2020}];

  constructor(private dashboardService: DashboardService, private productService: ProductService,
    private customerService: CustomerService) { }

  ngOnInit() {

    this.productService.getProducts().subscribe(response => {
      this.products = response.products;
    },
      error => {
        console.log(error);
      });

      this.customerService.getCustomers().subscribe(response => {
        this.customers = response.customers;
      },
        error => {
          console.log(error);
        });
  }

  getInventoryDetails() {
    this.debitTotal = 0;
    this.challanTotal = 0;
    this.dieselTotal = 0;

    let filterKey = '';
    if (this.productName !== '') {
      filterKey = 'product';
    } else {
       filterKey = 'customer';
    }

    const payload = {'data': {'selected_month': this.selectedMonth, 'selected_year': this.selectedYear, 'filter_key': filterKey,
    'prod_id': this.selectedProductId, 'cust_id': this.selectedCustomerId }};

    this.dashboardService.getProductwiseInventoryDetails(payload).subscribe(response => {
      this.inventory = response.inventory;
    },
      error => {
        console.log(error);
      });
  }

  setMonthSelected(month: number) {
    this.selectedMonth = month;
    if (this.selectedMonth !== 0 && this.selectedYear !== 0 && (this.selectedProductId !== 0 || this.selectedCustomerId !== 0)) {
      this.getInventoryDetails();
    }
  }

  setYearSelected(year: number) {
    this.selectedYear = year;
    if (this.selectedMonth !== 0 && this.selectedYear !== 0 && (this.selectedProductId !== 0 || this.selectedCustomerId !== 0)) {
      this.getInventoryDetails();
    }
  }

  setProductSelected(productId: number) {
    this.selectedProductId = productId;
    this.selectedCustomerId = 0;
    this.customerName = '';
    if (this.selectedMonth !== 0 && this.selectedYear !== 0 && this.selectedProductId !== 0) {
      this.getInventoryDetails();
    }
  }

  setCustomerSelected(customerId: number) {
    this.selectedCustomerId = customerId;
    this.selectedProductId = 0;
    this.productName = '';
    if (this.selectedMonth !== 0 && this.selectedYear !== 0 && this.selectedCustomerId !== 0) {
      this.getInventoryDetails();
    }
  }
}

interface Month {
  index: number;
  value: string;
}

interface Year {
  value: number;
}
