import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../add-product/product.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"
import { GSTService } from "../add-gst/gst.service"
import { GST } from '../add-gst/gst';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  isDeleteDisabled: boolean;

  // Variables for products
  products = [];
  productId: number;
  productName: string;
  productDesc: string;
  productUnit: number;
  productPrice: number;

  // Variables for GST
  gstDetails: GST[];
  productHSNId: number;
  productHSN: number;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private productService: ProductService,
    private location: Location, private gstService: GSTService) {
    this.route.queryParams.subscribe(params => {
      this.productId = params["prod_id"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    // Make necessary changes based on selection from view product details
    this.showUIChanges();
  }

  showUIChanges() {
    if (this.productId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getProductById();
    } else {
      // Enable all fields for view mode
      this.isFieldDisabled = false;

      // Enable cancel button initially
      this.isCancelDisabled = false;

      // Disable delete button initially
      this.isDeleteDisabled = true;
    }

    // Change button label to save
    this.changeButtonLabel(this.isFieldDisabled);

    // Get HSN codes from service
    this.gstService.getGSTDetails().subscribe(response => {
      this.gstDetails = response.gst_details;
    },
      error => {
        console.log(error)
      });
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
    this.isCancelDisabled = false;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearProductFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = false;

    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getProductById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addProduct() {
    if (this.buttonLabel == "SAVE") {
      if (this.productName != undefined && this.productUnit != undefined && this.productPrice != undefined) {
        this.isDeleteDisabled = false;
        if(this.productDesc == undefined){
          this.productDesc = "";
        }
        if (this.isEditClicked) {
          const updatePayload = { "data": { "prod_id": this.productId, "prod_name": this.productName, "prod_desc": this.productDesc, "prod_unit": this.productUnit, "prod_rate": this.productPrice, "prod_gst_id": this.productHSNId } };

          this.productService.updateProduct(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "prod_name": this.productName, "prod_desc": this.productDesc, "prod_unit": this.productUnit, "prod_rate": this.productPrice, "prod_gst_id": this.productHSNId } };

          this.productService.addProduct(addPayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        }
      } else {
        alert('Please fill all mandatory fields');
      }
    } else {
      this.buttonLabel = "SAVE";
      this.isEditClicked = true;
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
      this.isDeleteDisabled = true;
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
    this.productHSN = undefined;
  }

  deleteProduct() {
    const deletePayload = { "data": { "prod_id": this.productId } };
    this.productService.deleteProduct(deletePayload).subscribe(response => {
      if (response.status == 200) {
        console.log(response.message);
        this.location.back();
      } else if (response.status == 501) {
        console.log(response.message);
      }
    },
      error => {
        console.log(error)
      });
  }

  setProductDetail(product) {
    this.productName = product.prod_name;
    this.productUnit = product.prod_unit;
    this.productPrice = product.prod_rate;
    this.productDesc = product.prod_desc;
    this.productHSN = product.prod_hsn;
    this.productHSNId = product.prod_hsn_id;
  }

  setGSTDetail(gst) {
    this.productHSNId = gst.gst_id;
    this.productHSN = gst.gst_hsn;
  }

  getProductById() {
    if(this.productId != undefined){
    // Get product details by id
    const payload = { "data": { "prod_id": this.productId } };
    this.productService.getProductById(payload).subscribe(response => {
      if (response.status == 200) {
        if (response.products != undefined && response.products.length > 0) {
          this.setProductDetail(response.products[0]);
        }
      }
    },
      error => {
        console.log(error)
      });
    } else {
      this.location.back();
    }
  }
}
