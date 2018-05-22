import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-quatation',
  templateUrl: './create-quatation.component.html',
  styleUrls: ['./create-quatation.component.css']
})
export class CreateQuatationComponent {

  // Variables used for products
  products = [];
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

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  constructor() {
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  addProduct() {
    if (this.productName != undefined && this.productHSN != undefined && this.productUnit != undefined
      && this.productRate != undefined) {
      const product = new Product(this.productName, this.productHSN, this.productUnit,
        this.productRate);
      this.products.push(product);
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
    if (this.customerName != undefined && this.customerAddress != undefined
      && this.contactNo != undefined && (this.products != undefined && this.products.length > 0)) {
      const invoice = new Quatation(this.invoiceDate, this.customerName, this.customerAddress, this.contactNo,
        this.products);
      this.invoices.push(invoice);
      this.clearInvoiceFields();
      // Redirect it to View Invoice screen
      // this.router.navigate(['/view-invoice']);
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  clearProductFields() {
    this.productName = '';
    this.productHSN = '';
    this.productUnit = '';
    this.productRate = 0;
  }

  clearInvoiceFields() {
    this.invoiceDate = null;
    this.customerName = '';
    this.customerAddress = '';
    this.contactNo = 0;
    this.products = [];
  }
}

class Product {

  name: string;
  hsn: string;
  unit: string;
  rate: number;

  constructor(name, hsn, unit, rate) {
    this.name = name;
    this.hsn = hsn;
    this.unit = unit;
    this.rate = rate;
  }
}

class Quatation {

  quatationDate: Date;
  customerName: string;
  customerAddress: string;
  contactNo: string;
  product: Object[];

  constructor(date, name, address, phone, product) {
    this.quatationDate = date;
    this.customerName = name;
    this.customerAddress = address;
    this.contactNo = phone;
    this.product = product;
  }
}

