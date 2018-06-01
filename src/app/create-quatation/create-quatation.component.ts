import { Component, OnInit } from '@angular/core';
import { Product } from "../add-product/product";
import { CustomerService } from "../add-customer/customer.service";
import { ProductService } from "../add-product/product.service";
import { QuatationService } from "../create-quatation/quatation.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

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

  constructor(private customerService: CustomerService, private productService: ProductService, private quatationService: QuatationService,
    private route: ActivatedRoute, private location: Location) {
    this.route.queryParams.subscribe(params => {
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

    const payload = { "data": { "quat_id": this.quatationId } };

    this.quatationService.getQuatationProductsById(payload).subscribe(response => {
      this.localProductList = response.products;
      console.log("Quatation Products " + JSON.stringify(this.localProductList));
    },
      error => {
        console.log(error)
      });
  }

  addProduct() {
    if (this.productName != undefined && this.productDesc != undefined && this.productUnit != undefined
      && this.productRate != undefined) {
      const product = new Product(this.productName, this.productDesc, this.productUnit, this.productRate);
      this.localProductList.push(product);
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
      const invoice = new Quatation(this.quatationDate, this.customerName, this.customerAddress, this.contactNo,
        this.products);
      const payload = { "data": { "chal_cust_id": this.customerId, "chal_prod_id": this.productId, "chal_veh_id": this.productName, "chal_quantity": this.productQuantity } };
      this.quatationService.addQuatation(payload).subscribe(response => {
        if (response.status == 200) {

        }
        console.log("Add quatation " + response);
      },
        error => {
          console.log(error)
        });
      this.quatations.push(invoice);
      this.location.back();
      this.clearInvoiceFields();
      // Redirect it to View Invoice screen
      // this.router.navigate(['/view-invoice']);
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  clearProductFields() {
    this.productName = '';
    this.productDesc = '';
    this.productUnit = '';
    this.productRate = 0;
  }

  clearInvoiceFields() {
    this.quatationDate = null;
    this.customerName = '';
    this.customerAddress = '';
    this.contactNo = 0;
    this.products = [];
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

