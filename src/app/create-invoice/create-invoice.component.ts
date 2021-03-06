import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../add-customer/customer.service';
import { ChallanService } from '../create-challan/challan.service';
import { ProductService } from '../add-product/product.service';
import { VehicleService } from '../add-vehicle/vehicle.service';
import { InvoiceService } from '../create-invoice/invoice.service';
import { InvoiceProduct } from '../create-invoice/invoice.product';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { GSTService } from '../add-gst/gst.service';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { Utility } from '../common/Utility';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})

export class CreateInvoiceComponent implements OnInit {

  // Variables used for products
  customers;
  challans;
  products;
  vehicles;
  invoiceProducts;
  invoiceProductsQuantity: InvoiceProduct[];
  gstDetails;
  localProductList: InvoiceProduct[];
  tempChallanList;
  isInvoiceExist: boolean;

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  challanId: number;
  challanNo: number;
  challanDate: string;
  vehicleNo: string;
  productId: number;
  productName: string;
  productGSTId: number;
  productHSN: string;
  productUnit: string;
  productQuantity: number;
  productRate: number;
  productSubTotalAmount: number;
  productTaxAmount: number;
  productTotalAmount: number;
  subTotalAmount: number;
  taxTotalAmount: number;

  // Variables used for invoice
  invoices = [];
  invoiceId: number;
  invoiceNumber: string;
  invoiceDate: Date;
  picker: Date;
  customerId: number;
  customerName: string;
  customerAddress: string;
  contactPerson: string;
  contactNo: string;
  totalInvoiceAmount = 0;
  roundOffAmount = 0;
  netTotalAmount = 0;
  gstId: number;
  gstPercentage: number;
  isWithoutTax: boolean;
  isWithoutTaxCheckVisible: boolean;
  isChallanNotCreated: boolean;
  vehicleId: number;
  isTimeBased: boolean;
  isInvoiceCancelled: boolean;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  constructor(private customerService: CustomerService, private productService: ProductService, private router: Router,
    private challanService: ChallanService, private invoiceService: InvoiceService, private route: ActivatedRoute,
    private appService: AppService, private location: Location, private gstService: GSTService,
    private vehicleService: VehicleService, private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.invoiceId = params['inv_id'];
    });
    this.addImagePath = 'assets/images/ic_add_circle.svg';
    this.removeImagePath = 'assets/images/ic_remove_circle.svg';
  }

  ngOnInit() {
    this.taxTotalAmount = 0;
    this.subTotalAmount = 0;
    this.totalInvoiceAmount = 0;
    this.isWithoutTax = false;
    this.localProductList = [];

    this.appService.showDrawer(true);

    this.showUIChanges();

    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.customers;
    },
      error => {
        console.log(error);
      });

    this.productService.getProducts().subscribe(response => {
      this.products = response.products;
    },
      error => {
        console.log(error);
      });

    this.gstService.getGSTDetails().subscribe(response => {
      this.gstDetails = response.gst_details;
    },
      error => {
        console.log(error);
      });

    this.vehicleService.getVehicles().subscribe(response => {
      this.vehicles = response.vehicles;
    },
      error => {
        console.log(error);
      });
  }

  showUIChanges() {
    if (this.invoiceId !== undefined) {

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
    // this.isWithoutTaxCheckVisible = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearInvoiceFields();
    this.clearProductFields();
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = 'EDIT';
    } else {
      this.buttonLabel = 'SAVE';
    }
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    // this.isWithoutTaxCheckVisible = false;
    if (this.buttonLabel === 'SAVE') {
      this.buttonLabel = 'EDIT';
      // Show last shown record
      this.getInvoiceDetailById();
    } else {
      this.buttonLabel = 'SAVE';
    }
  }

  addProduct() {
    this.tempChallanList = [];

    // Add product to invoice products list
    if (this.productName !== undefined && this.productHSN !== undefined && this.productQuantity !== undefined &&
      this.productRate !== undefined && this.productSubTotalAmount !== undefined && this.productTotalAmount !== undefined) {
      if (this.isWithoutTax || this.productTaxAmount === undefined) {
        this.productTaxAmount = 0;
      }
      const formattedChallanDate = moment(this.challanDate).format('DD/MM/YYYY');
      const product = new InvoiceProduct(this.productId, this.challanId, this.challanNo, formattedChallanDate,
        this.vehicleNo, this.productName, this.productGSTId, this.productHSN, this.gstPercentage, this.productUnit,
        this.productRate, this.productQuantity, this.productSubTotalAmount, this.productTaxAmount, this.productTotalAmount, 0);
      this.localProductList.push(product);
      this.calculateInvoiceTotal();
      this.clearProductFields();

      // Removing challan that is already added to product list
      for (let i = 0; i < this.challans.length; i++) {
        if (!this.challans[i].isChallanInUse) {
          this.tempChallanList.push(this.challans[i]);
        }
      }
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  createInvoice() {
    if (this.buttonLabel === 'SAVE') {
      if (this.invoiceDate !== undefined && this.invoiceNumber !== undefined && this.customerName !== undefined &&
        this.customerAddress !== undefined
        && this.contactNo !== undefined && (this.localProductList !== undefined && this.localProductList.length > 0)) {
        const formattedInvoiceDate = moment(this.invoiceDate).format('YYYY-MM-DD');
        let isTax = 0;
        if (this.isWithoutTax) {
          isTax = 1;
        }
        if (this.isEditClicked) {
          this.isEditClicked = false;
          if (this.isWithoutTax) {
            const updateWithoutTaxPayload = {
              'data': {
                'inv_id': this.invoiceId, 'inv_date': formattedInvoiceDate,
                'inv_number': this.invoiceNumber, 'inv_cust_id': this.customerId, 'inv_product_total': this.subTotalAmount,
                'inv_total_amount': this.totalInvoiceAmount, 'inv_round_off': this.roundOffAmount, 'inv_without_tax': isTax,
                'inv_products': this.localProductList
              }
            };
            // Update invoice without tax service
            this.invoiceService.updateInvoiceWithoutTax(updateWithoutTaxPayload).subscribe(response => {
              if (response.status === 200) {
                this.location.back();
              }
            },
              error => {
                console.log(error);
              });
          } else {
            const updatePayload = {
              'data': {
                'inv_id': this.invoiceId, 'inv_date': formattedInvoiceDate,
                'inv_number': this.invoiceNumber, 'inv_cust_id': this.customerId, 'inv_product_total': this.subTotalAmount,
                'inv_total_tax': this.taxTotalAmount, 'inv_total_amount': this.totalInvoiceAmount, 'inv_round_off': this.roundOffAmount,
                'inv_without_tax': isTax, 'inv_products': this.localProductList
              }
            };
            // Update invoice with tax service
            this.invoiceService.updateInvoice(updatePayload).subscribe(response => {
              if (response.status === 200) {
                this.location.back();
              }
            },

              error => {
                console.log(error);
              });
          }
        } else {
          if (this.isWithoutTax) {
            const invoiceWithoutTaxPayload = {
              'data': {
                'inv_date': formattedInvoiceDate, 'inv_number': this.invoiceNumber,
                'inv_cust_id': this.customerId, 'inv_product_total': this.subTotalAmount, 'inv_total_amount': this.totalInvoiceAmount,
                'inv_round_off': this.roundOffAmount, 'inv_without_tax': isTax, 'inv_products': this.localProductList
              }
            };
            // Create invoice without tax service
            this.invoiceService.addInvoiceWithoutTax(invoiceWithoutTaxPayload).subscribe(response => {
              if (response.status === 200) {
                this.buttonLabel = 'EDIT';
                this.location.back();
              }
            },
              error => {
                console.log(error);
              });
          } else {
            const invoicePayload = {
              'data': {
                'inv_date': formattedInvoiceDate, 'inv_number': this.invoiceNumber,
                'inv_cust_id': this.customerId, 'inv_product_total': this.subTotalAmount, 'inv_total_tax': this.taxTotalAmount,
                'inv_total_amount': this.totalInvoiceAmount, 'inv_round_off': this.roundOffAmount, 'inv_without_tax': isTax,
                'inv_is_cancelled': 0, 'inv_products': this.localProductList
              }
            };
            // Create invoice with tax service
            this.invoiceService.addInvoice(invoicePayload).subscribe(response => {
              if (response.status === 200) {
                this.buttonLabel = 'EDIT';
                this.location.back();
              }
            },
              error => {
                console.log(error);
              });
          }
        }
      } else {
        alert('Please fill all mandatory fields');
      }
    } else {
      this.isEditClicked = true;
      this.buttonLabel = 'SAVE';
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
      this.getChallansByCustomerId();
    }
  }

  clearProductFields() {
    this.challanId = undefined;
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
    this.productTotalAmount = undefined;
  }

  clearInvoiceFields() {
    this.invoiceDate = undefined;
    this.invoiceNumber = undefined;
    this.customerName = undefined;
    this.customerAddress = undefined;
    this.contactNo = undefined;
    this.contactPerson = undefined;
    this.localProductList = [];
    this.subTotalAmount = 0;
    this.taxTotalAmount = 0;
    this.totalInvoiceAmount = 0;
    this.roundOffAmount = 0;
    this.netTotalAmount = 0;
    this.isWithoutTax = false;
    this.isInvoiceCancelled = false;
  }

  calculateSubTotal() {
    if (this.productQuantity !== undefined && this.productRate !== undefined) {
      this.productSubTotalAmount = this.productQuantity * this.productRate;

      this.calculateTaxAmount();
      this.calculateTotal();
    }
  }

  calculateInvoiceTotal() {
    this.subTotalAmount = 0;
    this.taxTotalAmount = 0;
    this.totalInvoiceAmount = 0;

    if (this.localProductList !== undefined && this.localProductList.length > 0) {
      if (!this.isWithoutTax) {
        for (let i = 0; i < this.localProductList.length; i++) {
          this.subTotalAmount += this.localProductList[i].prod_sub_total;
          this.taxTotalAmount += this.localProductList[i].prod_tax;
        }
        this.totalInvoiceAmount = this.subTotalAmount + this.taxTotalAmount;
      } else {
        for (let i = 0; i < this.localProductList.length; i++) {
          this.subTotalAmount += this.localProductList[i].prod_sub_total;
        }
        this.totalInvoiceAmount = this.subTotalAmount;
      }
      this.netTotalAmount = this.totalInvoiceAmount;
    }
  }

  calculateForJCB() {

    const totalHours = this.getJCBHours(this.productQuantity);
    this.productSubTotalAmount = totalHours * this.productRate;

    this.calculateTaxAmount();

    this.calculateTotal();
  }

  calculateTotal() {

    this.subTotalAmount = 0;
    this.taxTotalAmount = 0;
    this.totalInvoiceAmount = 0;
    this.roundOffAmount = 0;
    this.netTotalAmount = 0;

    if (!this.isWithoutTax) {
      this.productTotalAmount = this.productSubTotalAmount + this.productTaxAmount;
      if (this.localProductList.length > 0) {
        for (let i = 0; i < this.localProductList.length; i++) {
          this.localProductList[i].prod_total_amount = this.localProductList[i].prod_sub_total + this.localProductList[i].prod_tax;
        }
      }
    } else {
      this.productTotalAmount = this.productSubTotalAmount;
      if (this.localProductList.length > 0) {
        for (let i = 0; i < this.localProductList.length; i++) {
          this.localProductList[i].prod_total_amount = this.localProductList[i].prod_sub_total;
        }
      }
    }
  }

  setCustomerDetail(customer) {
    this.customerId = customer.cust_id;
    this.customerAddress = customer.cust_address;
    this.contactPerson = customer.cust_contact_person;
    this.contactNo = customer.cust_contact;
    this.clearProductFields();
    this.subTotalAmount = 0;
    this.taxTotalAmount = 0;
    this.totalInvoiceAmount = 0;
    this.roundOffAmount = 0;
    this.netTotalAmount = 0;

    this.localProductList = [];
    this.getChallansByCustomerId();
  }

  setProductDetail(product) {
    this.productId = product.prod_id;
    this.productName = product.prod_name;
    this.productUnit = product.prod_unit;
    this.productRate = product.prod_rate;
    this.productGSTId = product.prod_gst_id;
    this.productHSN = product.prod_hsn;
    this.gstPercentage = product.prod_percentage;
    this.productQuantity = product.prod_qty;
    this.productSubTotalAmount = product.prod_sub_total_amount;
    this.productTaxAmount = product.prod_tax_amount;

    if (this.productId === 18 || this.productId === 19 || this.productId === 21 || this.productId === 22) {
      this.isTimeBased = true;
      this.calculateForJCB();
    } else {
      this.isTimeBased = false;
      this.calculateSubTotal();
    }
  }

  setChallanDetail(challan) {
    if (challan.chal_no !== 0) {
      this.isChallanNotCreated = false;
      this.challanId = challan.chal_id;
      this.challanNo = challan.chal_no;
      this.challanDate = moment(challan.chal_date).format('YYYY-MM-DD');
      this.vehicleNo = challan.veh_number;
      this.productQuantity = challan.chal_quantity;
      this.productId = challan.chal_prod_id;
      this.productName = challan.prod_name;
      this.productGSTId = challan.chal_gst_id;
      this.productHSN = challan.gst_hsn;
      this.gstPercentage = challan.gst_percentage;
      this.productUnit = challan.prod_unit;
      this.productRate = challan.chal_prod_rate;
      challan.isChallanInUse = true;
      if (this.productId === 18 || this.productId === 19 || this.productId === 21 || this.productId === 22) {
        this.isTimeBased = true;
        const totalHours = this.getJCBHours(this.productQuantity);
        this.productSubTotalAmount = totalHours * this.productRate;
      } else {
        this.isTimeBased = false;
        this.productSubTotalAmount = this.productQuantity * this.productRate;
      }
      this.productTaxAmount = this.productSubTotalAmount * (this.gstPercentage / 100);

      this.calculateTotal();
    } else {
      this.isChallanNotCreated = true;
      this.challanId = challan.chal_id;
      this.challanNo = challan.chal_no;
      this.challanDate = challan.chal_date;
    }
  }

  printInvoiceDetail() {
    const navigationExtras: NavigationExtras = {
      queryParams: { inv_id: this.invoiceId }
    };
    // Redirect it to View Product screen
    this.router.navigate(['/view-invoice-copy'], navigationExtras);
  }

  setInvoiceDetail(invoice) {
    this.invoiceDate = invoice.inv_date;
    this.invoiceNumber = invoice.inv_number;
    this.customerId = invoice.inv_cust_id;
    this.customerName = invoice.inv_customer;
    this.customerAddress = invoice.inv_address;
    this.contactNo = invoice.inv_contact;
    this.contactPerson = invoice.inv_contact_person;
    this.subTotalAmount = invoice.inv_product_total;
    this.taxTotalAmount = invoice.inv_total_tax;
    this.totalInvoiceAmount = invoice.inv_total_amount;
    this.roundOffAmount = invoice.inv_round_off;
    this.netTotalAmount = this.totalInvoiceAmount + this.roundOffAmount;
    const isTax = invoice.inv_without_tax;
    if (isTax === 0) {
      this.isWithoutTax = false;
    } else {
      this.isWithoutTax = true;
    }
    const isCancelled = invoice.inv_is_cancelled;
    if (isCancelled === 0) {
      this.isInvoiceCancelled = false;
    } else {
      this.isInvoiceCancelled = true;
    }

    // Get Invoice products for selected invoice id
    this.getInvoiceProducts();
  }

  getInvoiceProducts() {
    const productPayload = { 'data': { 'inv_id': this.invoiceId } };

    this.invoiceService.getInvoiceProductsById(productPayload).subscribe(response => {
      this.localProductList = response.products;

      // Format date for displaying in desire format
      if (this.localProductList !== undefined && this.localProductList.length > 0) {
        for (let i = 0; i < this.localProductList.length; i++) {
          this.localProductList[i].chal_date = moment(this.localProductList[i].chal_date).format('DD/MM/YYYY');
        }
      }
    },
      error => {
        console.log(error);
      });

    this.calculateTaxAmount();
  }

  getInvoiceDetailById() {
    if (this.invoiceId !== undefined) {
      const payload = { 'data': { 'inv_id': this.invoiceId } };
      this.invoiceService.getInvoiceById(payload).subscribe(response => {
        if (response.status === 200) {
          if (response.invoices !== undefined && response.invoices.length > 0) {
            this.setInvoiceDetail(response.invoices[0]);
          }
        }
      },
        error => {
          console.log(error);
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
    this.tempChallanList = [];
    const challanPayload = { 'data': { 'chal_cust_id': this.customerId } };

    this.challanService.getChallansByCustomerId(challanPayload).subscribe(response => {
      this.challans = response.challans;

      if (this.isEditClicked) {
        this.tempChallanList = this.challans;
      } else {
        for (let i = 0; i < this.challans.length; i++) {
          if (!this.challans[i].chal_is_invoice_created) {
            const formattedChallanDate = moment(this.challans[i].chal_date).format('DD MMM YYYY');
            const product = new InvoiceProduct(this.challans[i].chal_prod_id, this.challans[i].chal_id, this.challans[i].chal_no,
              formattedChallanDate, this.challans[i].veh_number, this.challans[i].prod_name, this.challans[i].chal_gst_id,
              this.challans[i].gst_hsn, this.challans[i].gst_percentage, this.challans[i].prod_unit, this.challans[i].chal_prod_rate,
              this.challans[i].chal_quantity, 0, 0, 0, 0);
            this.localProductList.push(product);
            this.challans[i].isChallanInUse = true;
          }
        }
        this.calculateProductTotals();
      }
    },
      error => {
        console.log(error);
      });
  }

  calculateTaxAmount() {
    if (this.productSubTotalAmount !== undefined && !this.isWithoutTax) {
      this.productTaxAmount = this.productSubTotalAmount * (this.gstPercentage / 100);
    }

    if (this.localProductList.length > 0 && !this.isWithoutTax) {
      for (let i = 0; i < this.localProductList.length; i++) {
        this.localProductList[i].prod_tax = this.localProductList[i].prod_sub_total * (this.gstPercentage / 100);
      }
    }
  }

  changeTaxSelection() {
    this.isWithoutTax = !this.isWithoutTax;
    this.calculateTaxAmount();
    this.calculateTotal();
    this.calculateInvoiceTotal();
    this.calculateNetTotal();
  }

  removeProduct(product) {
    this.tempChallanList = [];
    const index = this.localProductList.indexOf(product);

    const payload = { 'data': { 'chal_id': this.localProductList[index].chal_id } };
    this.challanService.getChallanById(payload).subscribe(response => {
      if (response.status === 200) {
        if (response.challans !== undefined && response.challans.length > 0) {
          const challan = response.challans[0];
          challan.isChallanInUse = false;
          this.tempChallanList.push(challan);
          this.localProductList.splice(index, 1);

          this.calculateInvoiceTotal();
        }
      }
    },
      error => {
        console.log(error);
      });
  }

  calculateNetTotal() {
    this.netTotalAmount = this.totalInvoiceAmount + this.roundOffAmount;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      // Add product to invoice product list on click of enter button
      this.addProduct();
    }
  }

  printChallanStatement() {
    const navigationExtras: NavigationExtras = {
      queryParams: { inv_id: this.invoiceId }
    };
    // Redirect it to View Product screen
    this.router.navigate(['/view-challan-statement'], navigationExtras);
  }

  calculateProductTotals() {
    this.subTotalAmount = 0;
    this.taxTotalAmount = 0;
    this.totalInvoiceAmount = 0;

    if (this.localProductList !== undefined && this.localProductList.length > 0) {
      if (!this.isWithoutTax) {
        for (let i = 0; i < this.localProductList.length; i++) {
          if (this.localProductList[i].prod_id === 18 || this.localProductList[i].prod_id === 19 ||
            this.localProductList[i].prod_id === 21 || this.localProductList[i].prod_id === 22) {
            // Calculation for JCB
            this.isTimeBased = true;
            const totalHours = this.getJCBHours(this.localProductList[i].prod_qty);
            this.localProductList[i].prod_sub_total = this.localProductList[i].prod_rate * totalHours;
          } else {
            this.isTimeBased = false;
            this.localProductList[i].prod_sub_total = this.localProductList[i].prod_rate * this.localProductList[i].prod_qty;
          }
          this.localProductList[i].prod_tax = this.localProductList[i].prod_sub_total * (this.localProductList[i].prod_percentage / 100);
          this.localProductList[i].prod_total_amount = this.localProductList[i].prod_sub_total + this.localProductList[i].prod_tax;
          this.subTotalAmount += this.localProductList[i].prod_sub_total;
          this.taxTotalAmount += this.localProductList[i].prod_tax;
        }
        this.totalInvoiceAmount = this.subTotalAmount + this.taxTotalAmount;
      } else {
        for (let i = 0; i < this.localProductList.length; i++) {
          if (this.localProductList[i].prod_id === 18 || this.localProductList[i].prod_id === 19 ||
            this.localProductList[i].prod_id === 21 || this.localProductList[i].prod_id === 22 ||
            this.localProductList[i].prod_id === 24) {
            // Calculation for JCB
            this.isTimeBased = true;
            const totalHours = this.getJCBHours(this.localProductList[i].prod_qty);
            this.localProductList[i].prod_sub_total = this.localProductList[i].prod_rate * totalHours;
          } else {
            this.isTimeBased = false;
            this.localProductList[i].prod_sub_total = this.localProductList[i].prod_rate * this.localProductList[i].prod_qty;
          }
          this.localProductList[i].prod_total_amount = this.localProductList[i].prod_sub_total;
          this.subTotalAmount += this.localProductList[i].prod_total_amount;
        }
        this.totalInvoiceAmount = this.subTotalAmount;
      }
      this.netTotalAmount = this.totalInvoiceAmount;
    }
  }

  setVehicleDetail(vehicle) {
    this.vehicleId = vehicle.veh_id;
  }

  getJCBHours(workingTime) {
    let hours = 0;
    const timeArr = workingTime.toString().split('.');
    if (timeArr.length === 2) {
      const minuteStr = timeArr[1];
      if (minuteStr.length === 1) {
        hours = parseInt(minuteStr) * 10 / 60;
      } else {
        hours = parseInt(minuteStr) / 60;
      }
    }
    return parseInt(timeArr[0]) + hours;
  }

  cancelInvoice() {
    const cancelInvoicePayload = { 'data': { 'inv_id': this.invoiceId } };

    this.invoiceService.cancelInvoiceById(cancelInvoicePayload).subscribe(response => {
      this.openSnackBar(response.message, 'Dismiss');
      this.location.back();
    },
      error => {
        console.log(error);
      });
  }

  checkDuplicateInvoice() {
    const duplicateInvoicePayload = { 'data': { 'inv_number': this.invoiceNumber } };

    this.invoiceService.checkDuplicateInvoice(duplicateInvoicePayload).subscribe(response => {
      this.isInvoiceExist = response.duplicate;
      console.log(response.message);
    },
      error => {
        console.log(error);
      });
  }

  editProduct(index) {
    if (!this.isFieldDisabled) {
      this.challanId = this.localProductList[index].chal_id;
      this.challanNo = this.localProductList[index].chal_no;
      const formattedChallanDate = moment(this.localProductList[index].chal_date).format('DD/MM/YYYY');
      this.challanDate = formattedChallanDate;
      this.vehicleNo = this.localProductList[index].veh_number;

      this.setProductDetail(this.localProductList[index]);
      this.removeProduct(this.localProductList[index]);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
