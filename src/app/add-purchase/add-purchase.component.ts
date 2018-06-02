import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { VendorService } from "../add-vendor/vendor.service";
import { ProductService } from "../add-product/product.service";
import { PurchaseService } from "../add-purchase/purchase.service";
import { Location } from '@angular/common';

@Component({
  selector: 'add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent {

  // Variables used for products
  vendors;
  products;
  localProductList;

  chalanList = [{ number: 12332, date: "22/03/2018", vehicle: "MH-14 DT-8286" },
  { number: 12652, date: "12/04/2018", vehicle: "MH-14 DT-8286" },
  { number: 13732, date: "20/04/2018", vehicle: "MH-14 DT-8286" }];

  chalanNo: number;
  chalanDate: string;
  vehicleNo: string;
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
  vendorName: string;
  vendorAddress: string;
  contactPerson: string;
  contactNo: number;
  totalPurchaseAmount: number;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  constructor(private vendorService: VendorService, private productService: ProductService, private router: Router,
    private purchaseService: PurchaseService, private route: ActivatedRoute, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.purchaseId = params["pur_id"];
      this.purchaseDate = params["pur_date"];
      this.vendorName = params["pur_vendor"];
      this.contactPerson = params["pur_contact_person"];
      this.contactNo = params["pur_contact"];
      this.vendorAddress = params["pur_address"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {

    this.vendorService.getVendors().subscribe(response => {
      this.vendors = response.vendors;
      console.log(this.vendors);
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

    const payload = { "data": { "pur_id": this.purchaseId } };

    this.purchaseService.getPurchaseProductsById(payload).subscribe(response => {
      this.localProductList = response.products;
      console.log("Puchase Products " + JSON.stringify(this.localProductList));
      this.calculateTotal(null);
    },
      error => {
        console.log(error)
      });
  }

  addProduct() {
    if (this.chalanNo != undefined && this.chalanDate != undefined && this.vehicleNo != undefined && this.productName != undefined && this.productHSN != undefined && this.productUnit != undefined
      && this.productQuantity != undefined && this.productRate != undefined && this.totalAmount != undefined) {
      const product = new Product(this.chalanNo, this.chalanDate, this.vehicleNo, this.productName, this.productHSN, this.productUnit, this.productQuantity,
        this.productRate, this.totalAmount);
      this.localProductList.push(product);
      this.calculatePurchaseTotal();
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
    if (this.purchaseDate != undefined && this.vendorName != undefined && this.vendorAddress != undefined
      && this.contactNo != undefined && (this.products != undefined && this.products.length > 0)) {
      const purchase = new Purchase(this.purchaseDate, this.vendorName, this.vendorAddress, this.contactNo,
        this.totalPurchaseAmount, JSON.stringify(this.products));
      this.purchases.push(purchase);
      this.clearInvoiceFields();
      let navigationExtras: NavigationExtras = {
        queryParams: this.purchases[this.purchases.length - 1]
      };
      // Redirect it to View Invoice screen
      this.router.navigate(['/view-invoice'], navigationExtras);
    } else {
      alert('Please fill all mandatory fields');
    }
  }

  clearProductFields() {
    this.chalanNo = undefined;
    this.chalanDate = undefined;
    this.vehicleNo = undefined;
    this.productName = undefined;
    this.productHSN = undefined;
    this.productUnit = undefined;
    this.productQuantity = undefined;
    this.productRate = undefined;
    this.totalAmount = undefined;
  }

  clearInvoiceFields() {
    this.purchaseDate = undefined;
    this.vendorName = undefined;
    this.vendorAddress = undefined;
    this.contactNo = undefined;
    this.products = [];
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
    // this.productHSN = product.hsn;
    this.productRate = product.prod_rate;
    this.productUnit = product.prod_unit;
  }

  setVendorDetail(vendor) {
    this.vendorAddress = vendor.vend_address;
    this.contactNo = vendor.vend_contact;
  }

  setChalanDetail(chalan) {
    this.chalanDate = chalan.date;
    this.vehicleNo = chalan.vehicle;
  }
}

class Product {
  chalanNo: number;
  date: string;
  vehicleNo: string;
  name: string;
  hsn: string;
  unit: string;
  quantity: number;
  rate: number;
  total: number;

  constructor(chalanNo, date, vehicle, name, hsn, unit, qty, rate, total) {
    this.chalanNo = chalanNo;
    this.date = date;
    this.vehicleNo = vehicle;
    this.name = name;
    this.hsn = hsn;
    this.unit = unit;
    this.quantity = qty;
    this.rate = rate;
    this.total = total;
  }
}

class Purchase {

  purchaseDate: Date;
  vendorName: string;
  vendorAddress: string;
  contactNo: number;
  purchaseTotal: number;
  product: Object[];

  constructor(date, name, address, phone, total, product) {
    this.purchaseDate = date;
    this.vendorName = name;
    this.vendorAddress = address;
    this.contactNo = phone;
    this.purchaseTotal = total;
    this.product = product;
  }
}
