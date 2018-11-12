import { Component } from '@angular/core';
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
import { debuglog } from 'util';

@Component({
  selector: 'add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent {

  // Variables used for products
  challans;
  vendors;
  products;
  localProductList : PurchaseProduct[];

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
  totalAmount: number;

  // Variables used for purchase
  purchases = [];
  purchaseId: number;
  purchaseDate: Date;
  vendorId: number;
  vendorName: string;
  vendorAddress: string;
  contactPerson: string;
  contactNo: number;
  totalPurchaseAmount: number;

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

  showUIChanges(){

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
    if (this.challanNo != undefined && this.challanDate != undefined && this.vehicleNo != undefined && this.productName != undefined && this.productHSN != undefined && this.productUnit != undefined
      && this.productQuantity != undefined && this.productRate != undefined && this.totalAmount != undefined) {
        var formattedChallanDate = moment(this.challanDate).format('YYYY-MM-DD');
      const product = new PurchaseProduct(this.challanNo, formattedChallanDate, this.vehicleNo, this.productId, this.productName, this.productHSN, this.productUnit, this.productQuantity,
        this.productRate, this.totalAmount);
      this.localProductList.push(product);
      this.calculatePurchaseTotal();
      this.clearProductFields();
    } else {
      alert('Please fill all mandatory Product fields');
    }
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

  addPurchase() {
    if (this.buttonLabel == "SAVE") {
      if (this.purchaseDate != undefined && this.vendorName != undefined && this.vendorAddress != undefined
        && this.contactNo != undefined && (this.localProductList != undefined && this.localProductList.length > 0)) {
        var formattedPurchaseDate = moment(this.purchaseDate).format('YYYY-MM-DD');
        const payload = { "data": { "pur_date": formattedPurchaseDate, "pur_total_amount": this.totalPurchaseAmount, "pur_vendor_id": this.vendorId, "pur_products": this.localProductList } };
        this.purchaseService.addPurchase(payload).subscribe(response => {
          if (response.status == 200) {
            console.log("Add purchase " + response.message);
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
    this.challanNo = undefined;
    this.challanDate = undefined;
    this.vehicleNo = undefined;
    this.productName = undefined;
    this.productHSN = undefined;
    this.productUnit = undefined;
    this.productQuantity = undefined;
    this.productRate = undefined;
    this.totalAmount = undefined;
  }

  clearPurchaseFields() {
    this.purchaseDate = undefined;
    this.vendorName = undefined;
    this.vendorAddress = undefined;
    this.contactPerson = undefined;
    this.contactNo = undefined;
    this.localProductList = [];
  }

  calculateTotal(event) {
    if (this.productQuantity != undefined && this.productRate != undefined) {
      this.totalAmount = this.productQuantity * this.productRate;
    }
  }

  calculatePurchaseTotal() {
    this.totalPurchaseAmount = 0;
    if (this.localProductList != undefined && this.localProductList.length > 0) {
      for (let i = 0; i < this.localProductList.length; i++) {
        this.totalPurchaseAmount += this.localProductList[i].pur_prod_total;
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

  setChallanDetail(challan) {
    this.challanDate = challan.chal_date;
    this.vehicleNo = challan.veh_number;
    this.productQuantity = challan.chal_quantity;
  }

  setPurchaseDetail(purchase) {
    this.purchaseId = purchase.pur_id;
    this.purchaseDate = purchase.pur_date;
    this.vendorName = purchase.pur_vendor;
    this.contactPerson = purchase.pur_contact_person;
    this.vendorAddress = purchase.vend_address;
    this.contactNo = purchase.pur_contact;
    this.totalPurchaseAmount = purchase.pur_total_amount;

    this.getPurchaseProductsById();
  }

  getPurchaseProductsById() {
    const productPayload = { "data": { "pur_id": this.purchaseId } };

    this.purchaseService.getPurchaseProductsById(productPayload).subscribe(response => {
      this.localProductList = response.products;
      this.calculateTotal(null);
    },
      error => {
        console.log(error)
      });
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

  getPurchaseDetailsById(){
    if(this.purchaseId != undefined){
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
}
