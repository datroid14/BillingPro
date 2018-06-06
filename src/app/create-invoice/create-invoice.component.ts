import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from "../add-customer/customer.service";
import { ChallanService } from "../create-challan/challan.service";
import { ProductService } from "../add-product/product.service";
import { InvoiceService } from "../create-invoice/invoice.service";
import { Location } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent {

  // Variables used for products
  customers;
  challans;
  products;
  invoiceProducts;
  localProductList: InvoiceProduct[];

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  challanId: number;
  challanDate: Date;
  vehicleNo: string;
  productId: number;
  productName: string;
  productHSN: string;
  productUnit: string;
  productQuantity: number;
  productRate: number;
  totalAmount: number;

  // Variables used for invoice
  invoices = [];
  invoiceId: number;
  invoiceDate: Date;
  picker: Date;
  customerId: number;
  customerName: string;
  customerAddress: string;
  contactPerson: string;
  contactNo: number;
  totalInvoiceAmount: number;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  constructor(private customerService: CustomerService, private productService: ProductService, private router: Router,
    private challanService: ChallanService, private invoiceService: InvoiceService, private route: ActivatedRoute,
    private appService: AppService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.invoiceId = params["inv_id"];
      this.invoiceDate = params["inv_date"];
      this.customerId = params["inv_cust_id"];
      this.customerName = params["inv_customer"];
      this.contactPerson = params["inv_contact_person"];
      this.contactNo = params["inv_contact"];
      this.customerAddress = params["inv_address"];
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

    const challanPayload = { "data": { "chal_cust_id": this.customerId } };

    this.challanService.getChallansByCustomerId(challanPayload).subscribe(response => {
      this.challans = response.challans;
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
  }

  addNewInvoice() {
    this.isFieldDisabled = false;
    this.isCancelDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.invoiceDate = undefined;
    this.customerName = undefined;
    this.customerAddress = undefined;
    this.contactPerson = undefined;
    this.contactNo = undefined;
    this.localProductList = [];
    this.clearProductFields();
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
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
    debugger;
    if (this.challanDate != undefined && this.productName != undefined && this.productHSN != undefined && this.productUnit != undefined
      && this.productQuantity != undefined && this.productRate != undefined && this.totalAmount != undefined) {
      const product = new InvoiceProduct(this.productId, this.challanId, this.challanDate, this.vehicleNo, this.productName, this.productHSN, this.productUnit, this.productRate, this.productQuantity, this.totalAmount);
      this.localProductList.push(product);
      this.calculateInvoiceTotal();
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

  createInvoice() {
    if (this.buttonLabel == "SAVE") {
      if (this.invoiceDate != undefined && this.customerName != undefined && this.customerAddress != undefined
        && this.contactNo != undefined && (this.localProductList != undefined && this.localProductList.length > 0)) {
        const payload = { "data": { "inv_date": "2018-05-24", "inv_cust_id": this.customerId, "inv_total_amount": 12000, "inv_products": this.localProductList } };
        this.invoiceService.addInvoice(payload).subscribe(response => {
          if (response.status == 200) {
            this.buttonLabel = "EDIT";
            console.log("Add invoice " + response.message);
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
    }
  }

  clearProductFields() {
    this.challanDate = undefined;
    this.productName = undefined;
    this.productHSN = undefined;
    this.productUnit = undefined;
    this.productQuantity = undefined;
    this.productRate = undefined;
    this.totalAmount = undefined;
  }

  clearInvoiceFields() {
    this.invoiceDate = undefined;
    this.customerName = undefined;
    this.customerAddress = undefined;
    this.contactNo = undefined;
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
    this.productId = product.prod_id;
    this.productUnit = product.prod_unit;
    this.productRate = product.prod_rate;
  }

  setChallanDetail(challan) {
    this.challanId = challan.chal_id;
    this.challanDate = challan.chal_date;
    this.vehicleNo = challan.veh_number;
    this.productQuantity = challan.chal_quantity;
  }
}

class InvoiceProduct {
  prod_id: number;
  prod_qty: number;
  inv_id: number;
  chal_id: number;
  chal_date: Date;
  veh_number: string;
  prod_name: string;
  prod_hsn: number;
  prod_unit: string;
  prod_rate: number;
  prod_total_amount: number;

  constructor(prod_id, chal_id, date, vehicle, name, hsn, unit, rate, qty, total) {
    this.prod_id = prod_id;
    this.prod_qty = qty;
    this.chal_id = chal_id;
    this.chal_date = date;
    this.veh_number = vehicle;
    this.prod_name = name;
    this.prod_hsn = hsn;
    this.prod_unit = unit;
    this.prod_rate = rate;
    this.prod_total_amount = total;
  }
}

class Invoice {

  inv_date: Date;
  inv_cust_id: string;
  inv_total_amount: number;
  inv_products: Object[];

  constructor(date, cust_id, total, products) {
    this.inv_date = date;
    this.inv_cust_id = name;
    this.inv_total_amount = total;
    this.inv_products = products;
  }
}
