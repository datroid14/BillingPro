import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CustomerService } from "../add-customer/customer.service";
import { ChallanService } from "../create-challan/challan.service";
import { ProductService } from "../add-product/product.service";
import { Location } from '@angular/common';

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
  localProductList:Product[];

  challanId:number;
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
    private challanService: ChallanService, private route: ActivatedRoute, private location: Location) {
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

    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.customers;
      console.log(this.customers);
    },
      error => {
        console.log(error)
      });

    const challanPayload = { "data": { "chal_cust_id": this.customerId } };

    this.challanService.getChallansByCustomerId(challanPayload).subscribe(response => {
      this.challans = response.challans;
      console.log("Add Invoice " + JSON.stringify(this.challans));
    },
      error => {
        console.log(error)
      });

    this.productService.getProducts().subscribe(response => {
      this.products = response.products;
      console.log(this.products);
    },
      error => {
        console.log(error)
      });
  }

  addProduct() {
    if (this.challanDate != undefined && this.productName != undefined && this.productHSN != undefined && this.productUnit != undefined
      && this.productQuantity != undefined && this.productRate != undefined && this.totalAmount != undefined) {
      const product = new Product(this.challanId, this.productId, this.productQuantity, this.totalAmount);
      this.localProductList.push(product);
      this.calculateInvoiceTotal();
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
    if (this.invoiceDate != undefined && this.customerName != undefined && this.customerAddress != undefined
      && this.contactNo != undefined && (this.products != undefined && this.products.length > 0)) {
      const invoice = new Invoice(this.invoiceDate, this.customerName, this.customerAddress, this.contactNo,
        this.totalInvoiceAmount, JSON.stringify(this.products));
      this.invoices.push(invoice);
      this.clearInvoiceFields();
      let navigationExtras: NavigationExtras = {
        queryParams: this.invoices[this.invoices.length - 1]
      };
      // Redirect it to View Invoice screen
      this.router.navigate(['/view-invoice'], navigationExtras);
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  clearProductFields() {
    this.challanDate = undefined;
    this.productName = '';
    this.productHSN = '';
    this.productUnit = '';
    this.productQuantity = 0;
    this.productRate = 0;
    this.totalAmount = 0;
  }

  clearInvoiceFields() {
    this.invoiceDate = undefined;
    this.customerName = '';
    this.customerAddress = '';
    this.contactNo = 0;
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

class Product {
  prod_id: number;
  prod_qty: number;
  chal_id: number;
  prod_total_amount: number;

  constructor(prod_id, prod_qty, chal_id, total) {
    this.prod_id = prod_id;
    this.prod_qty = prod_qty;
    this.chal_id = chal_id;
    this.prod_total_amount = total;
  }
}

class Invoice {

  invoiceDate: Date;
  customerName: string;
  customerAddress: string;
  contactNo: number;
  invoiceTotal: number;
  product: Object[];

  constructor(date, name, address, phone, total, product) {
    this.invoiceDate = date;
    this.customerName = name;
    this.customerAddress = address;
    this.contactNo = phone;
    this.invoiceTotal = total;
    this.product = product;
  }
}
