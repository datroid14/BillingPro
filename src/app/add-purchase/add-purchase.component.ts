import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { VendorService } from "../add-vendor/vendor.service";
import { ProductService } from "../add-product/product.service";
import { PurchaseService } from "../add-purchase/purchase.service";
import { ChallanService } from "../create-challan/challan.service";
import { Purchase } from "../add-purchase/purchase";
import { PurchaseProduct } from "../add-purchase/purchase.product";
import { Location } from '@angular/common';
import { AppService } from "../app.service";
import * as moment from 'moment';

@Component({
  selector: 'add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  // Variables used for products
  challans;
  vendors;
  products;
  localProductList: PurchaseProduct[];

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isWithoutTax: boolean = false;

  challanNumber: number;
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
  productTotalAmount: number;

  // Variables used for purchase
  purchases = [];
  purchaseId: number;
  purchaseDate: string;
  purchaseInvoiceNo: string;
  vendorId: number;
  vendorName: string;
  vendorAddress: string;
  contactPerson: string;
  contactNo: number;
  subTotalAmount: number = 0;
  taxTotalAmount: number = 0;
  totalPurchaseAmount: number = 0;
  gstPercentage: number;
  roundOffAmount: number = 0;
  netTotalAmount: number = 0;

  minChallanDate: string;
  maxChallanDate: string;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  constructor(private vendorService: VendorService, private productService: ProductService, private router: Router,
    private purchaseService: PurchaseService, private challanService: ChallanService, private route: ActivatedRoute,
    private appService: AppService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.purchaseId = params["pur_id"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    this.gstPercentage = 5;

    this.localProductList = [];

    this.appService.showDrawer(true);

    this.showUIChanges();

    const challanPayload = { "data": { "chal_vend_id": this.vendorId } };

    this.challanService.getChallansByCustomerId(challanPayload).subscribe(response => {
      this.challans = response.challans;
    },
      error => {
        console.log(error)
      });

    this.vendorService.getVendors().subscribe(response => {
      this.vendors = response.vendors;
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

  showUIChanges() {

    if (this.purchaseId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Get payment details by id
      this.getPurchaseDetailsById();
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

  addNewPurchase() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearPurchaseFields();
    this.clearProductFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getPurchaseDetailsById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addProduct() {
    if (this.challanNumber != undefined && this.vehicleNo != undefined && this.productName != undefined && this.productHSN != undefined && this.productUnit != undefined && this.productQuantity != undefined && this.productRate != undefined && this.productTotalAmount != undefined) {
      var formattedChallanDate;
      if (this.challanDate != undefined) {
        formattedChallanDate = moment(this.challanDate).format('YYYY-MM-DD');
      } else {
        formattedChallanDate = null;
      }
      const product = new PurchaseProduct(this.challanNumber, formattedChallanDate, this.vehicleNo, this.productId, this.productName, this.productHSN, this.productUnit, this.productQuantity,
        this.productRate, this.productSubTotalAmount, this.productTaxAmount, this.productTotalAmount);
      this.localProductList.push(product);
      this.calculatePurchaseTotal();
      this.clearProductFields();
    } else {
      alert('Please fill all mandatory Product fields');
    }
  }

  removeProduct(product) {
    const index = this.localProductList.indexOf(product);
    this.localProductList.splice(index, 1);
  }

  addPurchase() {
    if (this.buttonLabel == "SAVE") {
      if (this.purchaseDate != undefined && this.purchaseInvoiceNo != undefined && this.vendorName != undefined && this.vendorAddress != undefined && this.contactNo != undefined && (this.localProductList != undefined && this.localProductList.length > 0)) {
        var formattedPurchaseDate = moment(this.purchaseDate).format('YYYY-MM-DD');
        const payload = { "data": { "pur_date": formattedPurchaseDate, "pur_invoice_no": this.purchaseInvoiceNo, "pur_product_total": this.subTotalAmount, "pur_total_tax": this.taxTotalAmount, "pur_total_amount": this.totalPurchaseAmount, "pur_round_off": this.roundOffAmount, "pur_without_tax": 0, "pur_vendor_id": this.vendorId, "pur_products": this.localProductList } };
        this.purchaseService.addPurchase(payload).subscribe(response => {
          if (response.status == 200) {
            this.location.back();
          }
        },
          error => {
            console.log(error)
          });
      } else {
        alert('Please fill all mandatory Invoice fields');
      }
    } else {
      this.buttonLabel = "SAVE";
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
    }
  }

  clearProductFields() {
    this.challanNumber = undefined;
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

  clearPurchaseFields() {
    this.purchaseDate = undefined;
    this.purchaseInvoiceNo = undefined;
    this.vendorName = undefined;
    this.vendorAddress = undefined;
    this.contactPerson = undefined;
    this.contactNo = undefined;
    this.subTotalAmount = 0;
    this.taxTotalAmount = 0;
    this.totalPurchaseAmount = 0;
    this.roundOffAmount = 0;
    this.netTotalAmount = 0;
    this.localProductList = [];
  }

  calculatePurchaseTotal() {
    this.subTotalAmount = 0;
    this.taxTotalAmount = 0;
    this.totalPurchaseAmount = 0;
    if (this.localProductList != undefined && this.localProductList.length > 0) {
      for (let i = 0; i < this.localProductList.length; i++) {
        this.subTotalAmount += this.localProductList[i].pur_prod_subtotal;
        this.taxTotalAmount += this.localProductList[i].pur_prod_tax;
      }
      this.totalPurchaseAmount = this.subTotalAmount + this.taxTotalAmount;
    }
    this.netTotalAmount = this.totalPurchaseAmount;
  }

  calculateSubTotal() {
    if (this.productQuantity != undefined && this.productRate != undefined) {
      this.productSubTotalAmount = this.productQuantity * this.productRate;

      this.calculateTaxAmount();

      this.calculateTotal();
    }
  }

  calculateTaxAmount() {
    if (this.productSubTotalAmount != undefined && !this.isWithoutTax) {
      this.productTaxAmount = this.productSubTotalAmount * (this.gstPercentage / 100);
    }

    if (this.localProductList.length > 0 && !this.isWithoutTax) {
      for (var i = 0; i < this.localProductList.length; i++) {
        this.localProductList[i].pur_prod_tax = this.localProductList[i].pur_prod_subtotal * (this.gstPercentage / 100);
      }
    }
  }

  calculateTotal() {
    if (!this.isWithoutTax) {
      this.productTotalAmount = this.productSubTotalAmount + this.productTaxAmount;
      if (this.localProductList.length > 0) {
        for (var i = 0; i < this.localProductList.length; i++) {
          this.localProductList[i].pur_prod_total = this.localProductList[i].pur_prod_subtotal + this.localProductList[i].pur_prod_tax;
        }
      }
    } else {
      this.productTotalAmount = this.productSubTotalAmount;
      if (this.localProductList.length > 0) {
        for (var i = 0; i < this.localProductList.length; i++) {
          this.localProductList[i].pur_prod_total = this.localProductList[i].pur_prod_subtotal;
        }
      }
    }
  }

  setProductDetail(product) {
    this.productId = product.prod_id;
    this.productRate = product.prod_rate;
    this.productUnit = product.prod_unit;
  }

  setVendorDetail(vendor) {
    this.vendorId = vendor.vend_id;
    this.vendorAddress = vendor.vend_address;
    this.contactNo = vendor.vend_contact;
    this.contactPerson = vendor.vend_contact_person;
  }

  setPurchaseDetail(purchase) {
    this.purchaseId = purchase.pur_id;
    this.purchaseDate = purchase.pur_date;
    this.purchaseInvoiceNo = purchase.pur_invoice_no;
    this.challanNumber = purchase.pur_chal_no;
    this.vendorName = purchase.pur_vendor;
    this.contactPerson = purchase.pur_contact_person;
    this.vendorAddress = purchase.vend_address;
    this.contactNo = purchase.pur_contact;
    this.subTotalAmount = purchase.pur_product_total;
    this.taxTotalAmount = purchase.pur_total_tax;
    this.totalPurchaseAmount = purchase.pur_total_amount;
    this.roundOffAmount = purchase.pur_round_off;
    this.netTotalAmount = this.totalPurchaseAmount + this.roundOffAmount;
    var isTax = purchase.pur_without_tax;
    if (isTax == 0) {
      this.isWithoutTax = false;
    } else {
      this.isWithoutTax = true;
      // this.isWithoutTaxCheckVisible = true;
    }

    this.getPurchaseProductsById();
  }

  getPurchaseProductsById() {
    var purchaseDates = [];

    const productPayload = { "data": { "pur_id": this.purchaseId } };

    this.purchaseService.getPurchaseProductsById(productPayload).subscribe(response => {
      this.localProductList = response.products;
      for (var i = 0; i < this.localProductList.length; i++) {
        if (this.localProductList[i].pur_chal_date != null) {
          this.localProductList[i].pur_chal_date = moment(this.localProductList[i].pur_chal_date).format('DD MMM YYYY');
        } else {
          this.localProductList[i].pur_chal_date = "";
        }
      }

      // Format date for displaying in desire format
      // if (this.localProductList != undefined && this.localProductList.length > 0) {
      //   for (var i = 0; i < this.localProductList.length; i++) {
      //     var formattedChallanDate = moment(this.localProductList[i].pur_chal_date).format('MM/DD/YYYY');
      //     this.localProductList[i].pur_chal_date = moment(this.localProductList[i].pur_chal_date).format('DD/MM/YYYY');
      //     purchaseDates.push(new Date(formattedChallanDate));
      //   }

      //   var sorted = purchaseDates.sort(this.sortDates);
      //   this.minChallanDate = moment(sorted[0]).format('DD/MM/YYYY');
      //   this.maxChallanDate = moment(sorted[sorted.length - 1]).format('DD/MM/YYYY');
      // }
      this.calculateSubTotal();
    },
      error => {
        console.log(error)
      });
  }

  sortDates(a, b) {
    return a.getTime() - b.getTime();
  }

  printPurchaseDetail() {
    const purchaseObj = new Purchase(this.purchaseId, this.purchaseDate, this.vendorName, this.vendorAddress, this.contactPerson, this.contactNo, JSON.stringify(this.localProductList));
    if (purchaseObj != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: purchaseObj
      };
      // Redirect it to View Purchase screen
      this.router.navigate(['/view-purchase-copy'], navigationExtras);
    }
  }

  getPurchaseDetailsById() {
    if (this.purchaseId != undefined) {
      const payload = { "data": { "pur_id": this.purchaseId } };
      this.purchaseService.getPurchaseById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.purchases != undefined && response.purchases.length > 0) {
            this.setPurchaseDetail(response.purchases[0]);
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

  calculateNetTotal() {
    this.netTotalAmount = this.totalPurchaseAmount + this.roundOffAmount;
  }
}
