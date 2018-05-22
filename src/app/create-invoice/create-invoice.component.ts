import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CustomerService } from "../add-customer/customer.service";
import { ProductService } from "../add-product/product.service";

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent {

  // Variables used for products
  customers;
  products;
  productList;

  orderDate: Date;
  productName: string;
  productHSN: string;
  productUnit: string;
  productQuantity: number;
  productRate: number;
  totalAmount: number;

  // Variables used for invoice
  invoices = [];
  invoiceDate: Date;
  picker: Date;
  customerName: string;
  customerAddress: string;
  contactNo: number;
  totalInvoiceAmount: number;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  constructor(private customerService: CustomerService, private productService: ProductService, private router: Router) {
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {

    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.customers;
      console.log(this.customers);
    },
      error => {
        console.log(error)
      });

      this.productService.getProducts().subscribe(response => {
        this.products = response.products;
        console.log(this.products);
      },
        error => {
          console.log(error)
        });
  }

  addProduct() {
    if (this.orderDate != undefined && this.productName != undefined && this.productHSN != undefined && this.productUnit != undefined
      && this.productQuantity != undefined && this.productRate != undefined && this.totalAmount != undefined) {
      const product = new Product(this.orderDate, this.productName, this.productHSN, this.productUnit, this.productQuantity,
        this.productRate, this.totalAmount);
      this.products.push(product);
      this.calculateInvoiceTotal();
      this.clearProductFields();
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

  createInvoice() {
    if (this.invoiceDate != undefined && this.customerName != undefined && this.customerAddress != undefined
      && this.contactNo != undefined && (this.products != undefined && this.products.length > 0)) {
      const invoice = new Invoice(this.invoiceDate, this.customerName, this.customerAddress, this.contactNo,
        this.totalInvoiceAmount, JSON.stringify(this.products));
      this.invoices.push(invoice);
      this.clearInvoiceFields();
      let navigationExtras: NavigationExtras = {
        queryParams: this.invoices[this.invoices.length - 1]
      };
      // Redirect it to View Invoice screen
      this.router.navigate(['/view-invoice'], navigationExtras);
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  clearProductFields() {
    this.orderDate = undefined;
    this.productName = '';
    this.productHSN = '';
    this.productUnit = '';
    this.productQuantity = 0;
    this.productRate = 0;
    this.totalAmount = 0;
  }

  clearInvoiceFields() {
    this.invoiceDate = undefined;
    this.customerName = '';
    this.customerAddress = '';
    this.contactNo = 0;
    this.products = [];
  }

  calculateTotal(event) {
    if (this.productQuantity != undefined && this.productRate != undefined) {
      this.totalAmount = this.productQuantity * this.productRate;
    }
  }

  calculateInvoiceTotal() {
    this.totalInvoiceAmount = 0;
    if (this.products != undefined && this.products.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        this.totalInvoiceAmount += this.products[i].total;
      }
    }
  }

  setCustomerDetail(customer) {
    this.customerAddress = customer.cust_address;
    this.contactNo = customer.cust_contact;
  }

  setProductDetail(product) {
    this.productUnit = product.prod_unit;
    this.productRate = product.prod_rate;
  }
}

class Product {
  date:Date;
  name: string;
  hsn: string;
  unit: string;
  quantity: number;
  rate: number;
  total: number;

  constructor(date, name, hsn, unit, qty, rate, total) {
    this.date = date;
    this.name = name;
    this.hsn = hsn;
    this.unit = unit;
    this.quantity = qty;
    this.rate = rate;
    this.total = total;
  }
}

class Invoice {

  invoiceDate: Date;
  customerName: string;
  customerAddress: string;
  contactNo: number;
  invoiceTotal: number;
  product: Object[];

  constructor(date, name, address, phone, total, product) {
    this.invoiceDate = date;
    this.customerName = name;
    this.customerAddress = address;
    this.contactNo = phone;
    this.invoiceTotal = total;
    this.product = product;
  }
}
