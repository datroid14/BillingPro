import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from "../add-product/product";
import { ProductService } from "../add-product/product.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;

  products = [];
  productName: string;
  productDesc: string;
  productUnit: number;
  productPrice: number;

  public constructor(private route: ActivatedRoute, private appService: AppService, private productService: ProductService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.productName = params["prod_name"];
      this.productDesc = params["prod_desc"];
      this.productUnit = params["prod_unit"];
      this.productPrice = params["prod_rate"];
    });
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    // Disable all fields for view mode
    this.isFieldDisabled = true;

    // Disable cancel button initially
    this.isCancelDisabled = true;

    // Change button label to save
    this.changeButtonLabel(this.isFieldDisabled);
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewProduct() {
    this.isFieldDisabled = false;
    this.isCancelDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearProductFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show first record
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addProduct() {
    if (this.buttonLabel == "SAVE") {
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
    } else {
      this.buttonLabel = "SAVE";
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
    }
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

  clearProductFields() {
    this.productName = undefined;
    this.productUnit = undefined;
    this.productPrice = undefined;
    this.productDesc = undefined;
  }
}
