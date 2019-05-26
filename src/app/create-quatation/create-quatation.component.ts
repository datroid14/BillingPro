import { Component, OnInit } from '@angular/core';
import { Product } from "../add-product/product";
import { ProductService } from "../add-product/product.service";
import { QuatationService } from "../create-quatation/quatation.service";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from "../app.service"
import { Quatation } from './quatation';
import * as moment from 'moment';

@Component({
  selector: 'create-quatation',
  templateUrl: './create-quatation.component.html',
  styleUrls: ['./create-quatation.component.css']
})
export class CreateQuatationComponent implements OnInit {

  // Variables used for products
  products;
  localProductList: Product[];
  isProductDataLoaded: boolean;

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  quatationId: number;
  productId: number;
  productName: string;
  productDesc: string;
  productUnit: string;
  productQuantity: number;
  productRate: number;

  // Variables used for invoice
  quatations = [];
  quatationDate: Date;
  picker: Date;
  customerId: number;
  customerName: string;
  customerAddress: string;
  contactNo: number;
  contactPerson: string;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  constructor(private productService: ProductService, private appService: AppService,
    private quatationService: QuatationService, private route: ActivatedRoute, private location: Location, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.quatationId = params["quat_id"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {

    this.isProductDataLoaded = false;

    this.localProductList = [];

    this.appService.showDrawer(true);

    this.showUIChanges();

    this.productService.getProducts().subscribe(response => {
      this.localProductList = response.products;
    },
      error => {
        console.log(error)
      });
  }

  showUIChanges() {
    if (this.quatationId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Get payment details by id
      this.getQuatationById();
    } else {
      // Enable all fields for view mode
      this.isFieldDisabled = false;

      // Enable cancel button initially
      this.isCancelDisabled = false;
    }

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

  addNewQuatation() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.changeButtonLabel(this.isFieldDisabled);
    this.quatationDate = undefined;
    this.customerName = undefined;
    this.customerAddress = undefined;
    this.contactPerson = undefined;
    this.contactNo = undefined;
    this.localProductList = [];
    this.clearProductFields();

    // Get product list for creating new quatation
    this.productService.getProducts().subscribe(response => {
      this.localProductList = response.products;
    },
      error => {
        console.log(error)
      });
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getQuatationById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addProduct() {
    if (this.productName != undefined && this.productDesc != undefined && this.productUnit != undefined
      && this.productRate != undefined) {
      const product = new Product(this.productId, this.productName, this.productDesc, this.productUnit, this.productRate);
      this.localProductList.push(product);
      this.clearProductFields();
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  createQuatation() {
    if (this.buttonLabel == "SAVE") {
      if (this.customerName != undefined && this.customerAddress != undefined && this.contactPerson != undefined
        && this.contactNo != undefined && (this.localProductList != undefined && this.localProductList.length > 0)) {
          var formattedQuatationDate = moment(this.quatationDate).format('YYYY-MM-DD');
        if (this.isEditClicked) {
          const payload = { "data": { "quat_id": this.quatationId, "quat_date": formattedQuatationDate, "quat_cust_name": this.customerName, "quat_cust_address": this.customerAddress, "quat_cont_person": this.contactPerson, "quat_cont_no": this.contactNo, "quat_products": this.localProductList } };
          this.quatationService.updateQuatation(payload).subscribe(response => {
            if (response.status == 200) {
              this.buttonLabel = "EDIT";
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const payload = { "data": { "quat_date": formattedQuatationDate, "quat_cust_name": this.customerName, "quat_cust_address": this.customerAddress, "quat_cont_person": this.contactPerson, "quat_cont_no": this.contactNo, "quat_products": this.localProductList } };
          this.quatationService.addQuatation(payload).subscribe(response => {
            if (response.status == 200) {
              this.buttonLabel = "EDIT";
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
    }
  }

  clearProductFields() {
    this.productName = undefined;
    this.productDesc = undefined;
    this.productUnit = undefined;
    this.productRate = undefined;
  }

  setProductDetail(product) {
    this.productId = product.prod_id;
    this.productUnit = product.prod_unit;
    this.productRate = product.prod_rate;
    this.productDesc = product.prod_desc;
  }

  setQuatationDetail(quatation) {
    this.quatationId = quatation.quat_id;
    this.quatationDate = quatation.quat_date;
    this.customerName = quatation.quat_customer;
    this.contactPerson = quatation.quat_contact_person;
    this.customerAddress = quatation.quat_address;
    this.contactNo = quatation.quat_contact;

    this.getQuatationProducts();
  }

  getQuatationProducts() {
    const payload = { "data": { "quat_id": this.quatationId } };

    this.quatationService.getQuatationProductsById(payload).subscribe(response => {
      this.localProductList = response.products;
    },
      error => {
        console.log(error)
      });
  }

  getQuatationById() {
    if (this.quatationId != undefined) {
      const payload = { "data": { "quat_id": this.quatationId } };
      this.quatationService.getQuatationById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.quatations != undefined && response.quatations.length > 0) {
            this.setQuatationDetail(response.quatations[0]);
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

  printQuatationDetail() {
    const quatationObj = new Quatation(this.quatationId, this.quatationDate, this.customerName, this.customerAddress, this.contactPerson, this.contactNo, JSON.stringify(this.localProductList));
    if (quatationObj != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: quatationObj
      };
      // Redirect it to View Product screen
      this.router.navigate(['/view-quatation-copy'], navigationExtras);
    }
  }

  removeProduct(product) {
    const index = this.localProductList.indexOf(product);
    this.localProductList.splice(index, 1);
  }
}
