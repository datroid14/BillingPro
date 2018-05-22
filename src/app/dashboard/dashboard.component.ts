import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router) { }

  products = [{ name: "Sand", unit: "Brass", hsn: "567888", rate: 5500 },
  { name: "Crush", unit: "Brass", hsn: "567888", rate: 4500 },
  { name: "Dust", unit: "Brass", hsn: "567888", rate: 3500 },
  { name: "Water", unit: "litre", hsn: "567888", rate: 1500 }];


  productName: string;
  productDesc: string;
  productHSN: number;
  productPrice: number;

  displayedColumns = ['name', 'unit', 'hsn', 'rate'];
  dataSource = undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  showProduct() {
    this.router.navigate(['/table-view']);
  }

  showInvoice() {
    this.router.navigate(['/create-invoice']);
  }

  showQuatation() {
    this.router.navigate(['/add-purchase']);
  }

  showChalan() {
    this.router.navigate(['/create-chalan']);
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<PRODUCT>(this.products);
    this.dataSource.paginator = this.paginator;
  }

  addProduct() {
    if (this.productName != undefined && this.productHSN != undefined && this.productPrice != undefined) {
      const product = new Product(this.productName, this.productDesc, this.productHSN, this.productPrice);
      this.products.push(product);
      this.ngAfterViewInit();
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  removeProduct(contact) {
    const index = this.products.indexOf(contact);
    this.products.splice(index, 1);
  }
}

export interface PRODUCT {

  name: string;
  unit: string;
  hsn: string;
  rate: number;
}

class Product {

  name: string;
  unit: string;
  hsn: string;
  rate: number;

  constructor(name, unit, hsn, rate) {
    this.name = name;
    this.unit = unit;
    this.hsn = hsn;
    this.rate = rate;
  }
}
