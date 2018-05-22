import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from "../add-product/product";
import { ProductService } from "../add-product/product.service";
import { Location } from '@angular/common';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  products = [];
  productName: string;
  productDesc: string;
  productUnit: number;
  productPrice: number;

  public constructor(private route: ActivatedRoute, private productService: ProductService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.productName = params["prod_name"];
      this.productDesc = params["prod_desc"];
      this.productUnit = params["prod_unit"];
      this.productPrice = params["prod_rate"];
    });
  }

  addProduct() {
    if (this.productName != undefined && this.productUnit != undefined && this.productPrice != undefined) {
      const payload = { "data": { "prod_name": this.productName, "prod_desc": this.productDesc, "prod_unit": this.productUnit, "prod_rate": this.productPrice } };
      this.productService.addProduct(payload).subscribe(response => {
        if (response.status == 200) {
          console.log("Add product " + response);
        }
      },
        error => {
          console.log(error)
        });
      this.location.back();
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }
}
