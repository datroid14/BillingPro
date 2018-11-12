import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { CustomerService } from "../add-customer/customer.service";
import { ChallanService } from "../create-challan/challan.service";
import { ProductService } from "../add-product/product.service";
import { InvoiceService } from "../create-invoice/invoice.service";
import { InvoiceProduct } from "../create-invoice/invoice.product";
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { Invoice } from '../create-invoice/invoice';
import { GSTService } from "../add-gst/gst.service";
import * as moment from 'moment';

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
  gstDetails;
  localProductList: InvoiceProduct[];

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  challanNo: number;
  challanDate: string;
  vehicleNo: string;
  productId: number;
  productName: string;
  productHSN: string;
  productUnit: string;
  productQuantity: number;
  productRate: number;
  productSubTotalAmount: number;
  productTaxAmount: number;
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
  contactNo: string;
  totalInvoiceAmount: number;
  gstId: number;
  gstPercentage: number;
  isWithoutTax: boolean;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  constructor(private customerService: CustomerService, private productService: ProductService, private router: Router,
    private challanService: ChallanService, private invoiceService: InvoiceService, private route: ActivatedRoute,
    private appService: AppService, private location: Location, private gstService: GSTService) {
    this.route.queryParams.subscribe(params => {
      this.invoiceId = params["inv_id"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {

    this.isWithoutTax = false;

    this.localProductList = [];

    this.appService.showDrawer(true);

    this.showUIChanges();

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

    this.gstService.getGSTDetails().subscribe(response => {
      this.gstDetails = response.gst_details;
    },
      error => {
        console.log(error)
      });

    this.getInvoiceProducts();
  }

  showUIChanges() {
    if (this.invoiceId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Get payment details by id
      this.getInvoiceDetailById();
    } else {
      // Enable all fields for view mode
      this.isFieldDisabled = false;

      // Enable cancel button initially
      this.isCancelDisabled = false;
    }

    // Change button label to save
    this.changeButtonLabel(this.isFieldDisabled);
  }

  addNewInvoice() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearInvoiceFields();
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
      // Show last shown record
      this.getInvoiceDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addProduct() {
    if (this.challanDate != undefined && this.productName != undefined && this.productHSN != undefined && this.productUnit != undefined
      && this.productQuantity != undefined && this.productRate != undefined && this.productSubTotalAmount != undefined && this.totalAmount != undefined) {
      if (this.isWithoutTax || this.productTaxAmount == undefined) {
        this.productTaxAmount = 0;
      }
      const product = new InvoiceProduct(this.productId, this.challanNo, this.challanDate, this.vehicleNo, this.productName, this.productHSN, this.productUnit, this.productRate, this.productQuantity, this.productSubTotalAmount, this.productTaxAmount, this.totalAmount);
      this.localProductList.push(product);
      this.calculateInvoiceTotal();
      this.clearProductFields();
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  createInvoice() {
    if (this.buttonLabel == "SAVE") {
      if (this.invoiceDate != undefined && this.customerName != undefined && this.customerAddress != undefined
        && this.contactNo != undefined && (this.localProductList != undefined && this.localProductList.length > 0)) {
        var formattedInvoiceDate = moment(this.invoiceDate).format('YYYY-MM-DD');
        const invoicePayload = { "data": { "inv_date": formattedInvoiceDate, "inv_cust_id": this.customerId, "inv_total_amount": this.totalInvoiceAmount, "inv_without_tax": this.isWithoutTax, "inv_products": this.localProductList } };
        this.invoiceService.addInvoice(invoicePayload).subscribe(response => {
          if (response.status == 200) {
            this.buttonLabel = "EDIT";
            this.location.back();
          }
        },
          error => {
            console.log(error)
          });
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
    this.challanNo = undefined;
    this.challanDate = undefined;
    this.vehicleNo = undefined;
    this.productName = undefined;
    this.productHSN = undefined;
    this.productUnit = undefined;
    this.productQuantity = undefined;
    this.productRate = undefined;
    this.productSubTotalAmount = undefined;
    this.productTaxAmount = undefined;
    this.totalAmount = undefined;
  }

  clearInvoiceFields() {
    this.invoiceDate = undefined;
    this.customerName = undefined;
    this.customerAddress = undefined;
    this.contactNo = undefined;
    this.contactPerson = undefined;
    this.totalInvoiceAmount = undefined;
    this.localProductList = [];
  }

  calculateSubTotal() {
    if (this.productQuantity != undefined && this.productRate != undefined) {
      this.productSubTotalAmount = this.productQuantity * this.productRate;

      this.calculateTaxAmount();

      this.calculateTotal();
    }
  }

  calculateInvoiceTotal() {
    this.totalInvoiceAmount = 0;

    if (this.localProductList != undefined && this.localProductList.length > 0) {
      for (let i = 0; i < this.localProductList.length; i++) {
        this.totalInvoiceAmount += this.localProductList[i].prod_total_amount;
      }
    }
  }

  calculateForJCB() {
    let hours = 0;
    let timeArr = this.productQuantity.toString().split('.');
    if (timeArr.length == 2) {
      let minuteStr = timeArr[1];
      if (minuteStr.length == 1) {
        hours = parseInt(minuteStr) * 10 / 60;
      } else {
        hours = parseInt(minuteStr) / 60;
      }
    }
    let totalHours = parseInt(timeArr[0]) + hours;
    this.productSubTotalAmount = totalHours * this.productRate;

    this.calculateTaxAmount();

    this.calculateTotal();
  }

  calculateTotal() {
    if (!this.isWithoutTax) {
      this.totalAmount = this.productSubTotalAmount + this.productTaxAmount;
    } else {
      this.totalAmount = this.productSubTotalAmount;
    }
  }

  setCustomerDetail(customer) {
    this.customerId = customer.cust_id;
    this.customerAddress = customer.cust_address;
    this.contactPerson = customer.cust_contact_person;
    this.contactNo = customer.cust_contact;
    this.clearProductFields();
    this.getChallansByCustomerId();
  }

  setProductDetail(product) {
    this.productId = product.prod_id;
    this.productName = product.prod_name;
    this.productUnit = product.prod_unit;
    this.productRate = product.prod_rate;
    this.productHSN = product.prod_hsn;
    this.gstPercentage = product.prod_percentage;
    this.productSubTotalAmount = product.prod_sub_total_amount;
    this.productTaxAmount = product.prod_tax_amount;

    if (this.productName == 'JCB') {
      this.calculateForJCB();
    } else {
      this.calculateSubTotal();
    }
  }

  setChallanDetail(challan) {
    this.challanNo = challan.chal_id;
    var formattedChallanDate = moment(challan.chal_date).format('YYYY-MM-DD');
    this.challanDate = formattedChallanDate;
    this.vehicleNo = challan.veh_number;
    this.productQuantity = challan.chal_quantity;
    this.productId = challan.chal_prod_id;
    this.productName = challan.prod_name;
    this.productHSN = challan.gst_hsn;
    this.gstPercentage = challan.gst_percentage;
    this.productUnit = challan.prod_unit;
    this.productRate = challan.prod_rate;
    this.productSubTotalAmount = this.productQuantity * this.productRate;
    this.productTaxAmount = this.productSubTotalAmount * (this.gstPercentage / 100);

    this.calculateTotal();
  }

  printInvoiceDetail() {
    const invoiceObj = new Invoice(this.invoiceId, this.invoiceDate, this.customerName, this.customerAddress, this.contactPerson, this.contactNo, this.totalInvoiceAmount, JSON.stringify(this.localProductList));
    if (invoiceObj != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: invoiceObj
      };
      // Redirect it to View Product screen
      this.router.navigate(['/view-invoice-copy'], navigationExtras);
    }
  }

  setInvoiceDetail(invoice) {
    this.invoiceDate = invoice.inv_date;
    this.customerId = invoice.inv_cust_id;
    this.customerName = invoice.inv_customer;
    this.customerAddress = invoice.inv_address;
    this.contactNo = invoice.inv_contact;
    this.contactPerson = invoice.inv_contact_person;
    this.totalInvoiceAmount = invoice.inv_total_amount;

    // Get Invoice products for selected invoice id
    this.getInvoiceProducts();
  }

  getInvoiceProducts() {
    const productPayload = { "data": { "inv_id": this.invoiceId } };

    this.invoiceService.getInvoiceProductsById(productPayload).subscribe(response => {
      this.localProductList = response.products;

      // Format date for displaying in desire format
      if (this.localProductList != undefined && this.localProductList.length > 0) {
        for (var i = 0; i < this.localProductList.length; i++) {
          this.localProductList[i].chal_date = moment(this.localProductList[i].chal_date).format('DD MMM YYYY');
        }
      }
    },
      error => {
        console.log(error)
      });

    this.calculateTaxAmount();
  }

  getInvoiceDetailById() {
    if (this.invoiceId != undefined) {
      const payload = { "data": { "inv_id": this.invoiceId } };
      this.invoiceService.getInvoiceById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.invoices != undefined && response.invoices.length > 0) {
            this.setInvoiceDetail(response.invoices[0]);
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

  setGSTDetail(gst) {
    this.gstId = gst.gst_id;
    this.gstPercentage = gst.gst_percentage;
  }

  getChallansByCustomerId() {
    const challanPayload = { "data": { "chal_cust_id": this.customerId } };

    this.challanService.getChallansByCustomerId(challanPayload).subscribe(response => {
      this.challans = response.challans;
    },
      error => {
        console.log(error)
      });
  }

  calculateTaxAmount() {
    if (this.productSubTotalAmount != undefined && !this.isWithoutTax) {
      this.productTaxAmount = this.productSubTotalAmount * (this.gstPercentage / 100);
    }
  }
}
