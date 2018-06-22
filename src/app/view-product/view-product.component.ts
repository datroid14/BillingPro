import { Component, ViewChild, OnInit } from '@angular/core';
import { ProductService } from "../add-product/product.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';

@Component({
  selector: 'view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  products;
  isLogin = false;

  displayedColumns = ['name', 'unit', 'rate', 'desc'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {

    this.appService.showDrawer(true);

    this.productService.getProducts().subscribe(response => {
      this.products = response.products;
      this.dataSource = new MatTableDataSource<PRODUCT>(this.products);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showProductDetails(product) {

    if (product != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: product
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-product'], navigationExtras);
    }
  }
}

export interface PRODUCT {
  prod_id: number;
  prod_name: string;
  prod_desc: string;
  prod_unit: string;
  prod_rate: string;
}
