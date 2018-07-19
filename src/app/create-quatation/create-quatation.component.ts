import { Component, OnInit } from '@angular/core';
import { Product } from "../add-product/product";
import { CustomerService } from "../add-customer/customer.service";
import { ProductService } from "../add-product/product.service";
import { QuatationService } from "../create-quatation/quatation.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from "../app.service"

@Component({
  selector: 'create-quatation',
  templateUrl: './create-quatation.component.html',
  styleUrls: ['./create-quatation.component.css']
})
export class CreateQuatationComponent implements OnInit {

  // Variables used for products
  customers;
  products;
  quatationProducts;
  localProductList: Product[];

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  quatationId: number;
  productId: number;
  productName: string;
  productDesc: string;
  productUnit: string;
  productQuantity: number;
  productRate: number;
  totalAmount: number;

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

  constructor(private customerService: CustomerService, private productService: ProductService, private appService: AppService,
    private quatationService: QuatationService, private route: ActivatedRoute, private location: Location) {
    this.route.queryParams.subscribe(params => {
      debugger;
      this.quatationId = params["quat_id"];
      this.quatationDate = params["quat_date"];
      this.customerName = params["quat_customer"];
      this.contactPerson = params["quat_contact_person"];
      this.contactNo = params["quat_contact"];
      this.customerAddress = params["quat_address"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {

    this.appService.showDrawer(true);

    this.isFieldDisabled = true;
    this.isCancelDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);

    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.customers;
    },
      error => {
        console.log(error)
      });

    this.productService.getProducts().subscribe(response => {
      this.products = response.products;
    },
      error => {
        console.log(error)
      });

      this.getQuatationProducts();
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
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
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
        const payload = { "data": { "quat_date": this.quatationDate, "quat_cust_id": this.customerId, "quat_products": this.localProductList } };
        this.quatationService.addQuatation(payload).subscribe(response => {
          if (response.status == 200) {
            this.buttonLabel = "EDIT";
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

  clearProductFields() {
    this.productName = undefined;
    this.productDesc = undefined;
    this.productUnit = undefined;
    this.productRate = undefined;
  }

  setCustomerDetail(customer) {
    this.customerId = customer.cust_id;
    this.customerAddress = customer.cust_address;
    this.contactNo = customer.cust_contact;
    this.contactPerson = customer.cust_contact_person;
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

  getQuatationProducts(){
    const payload = { "data": { "quat_id": this.quatationId } };

    this.quatationService.getQuatationProductsById(payload).subscribe(response => {
      this.localProductList = response.products;
    },
      error => {
        console.log(error)
      });
  }
}

