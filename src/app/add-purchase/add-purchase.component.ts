import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { VendorService } from "../add-vendor/vendor.service";
import { ProductService } from "../add-product/product.service";
import { PurchaseService } from "../add-purchase/purchase.service";
import { ChallanService } from "../create-challan/challan.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"

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
  localProductList;

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
      this.purchaseDate = params["pur_date"];
      this.vendorId = params["pur_vend_id"];
      this.vendorName = params["pur_vendor"];
      this.contactPerson = params["pur_contact_person"];
      this.contactNo = params["pur_contact"];
      this.vendorAddress = params["pur_address"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    // Disable all fields for view mode
    this.isFieldDisabled = true;

    // Disable cancel button initially
    this.isCancelDisabled = true;

    // Change button label to save
    this.changeButtonLabel(this.isFieldDisabled);

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

    this.getPurchaseProductsById();
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
      debugger;
      // Show last shown record
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
      this.buttonLabel = "SAVE";
    }
  }

  addProduct() {
    if (this.challanNo == undefined && this.challanDate != undefined && this.vehicleNo != undefined && this.productName != undefined && this.productHSN != undefined && this.productUnit != undefined
      && this.productQuantity != undefined && this.productRate != undefined && this.totalAmount != undefined) {
      const product = new PurchaseProduct(1, this.challanDate, this.vehicleNo, this.productId, this.productName, this.productHSN, this.productUnit, this.productQuantity,
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
        const payload = { "data": { "pur_date": "2018-05-24", "pur_total_amount": 14000, "pur_vendor_id": this.vendorId, "pur_products": this.localProductList } };
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
    if (this.products != undefined && this.products.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        this.totalPurchaseAmount += this.products[i].total;
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
}

class PurchaseProduct {
  chal_id: number;
  chal_date: string;
  veh_number: string;
  prod_id: number;
  prod_name: string;
  prod_hsn: string;
  prod_unit: string;
  prod_qty: number;
  prod_rate: number;
  prod_total: number;

  constructor(chalanNo, date, vehicle, prod_id, name, hsn, unit, qty, rate, total) {
    this.chal_id = chalanNo;
    this.chal_date = date;
    this.veh_number = vehicle;
    this.prod_id = prod_id;
    this.prod_name = name;
    this.prod_hsn = hsn;
    this.prod_unit = unit;
    this.prod_qty = qty;
    this.prod_rate = rate;
    this.prod_total = total;
  }
}
