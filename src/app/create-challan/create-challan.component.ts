import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CustomerService } from "../add-customer/customer.service";
import { ProductService } from "../add-product/product.service";
import { ChallanService } from "../create-challan/challan.service";
import { VehicleService } from "../add-vehicle/vehicle.service";
import { AppService } from '../app.service';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'create-challan',
  templateUrl: './create-challan.component.html',
  styleUrls: ['./create-challan.component.css']
})
export class CreateChallanComponent {

  challans;
  customers;
  products;
  vehicles;

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;

  challanId: number;
  challanDate: Date;
  customerId: number;
  customerName: string;
  customerAddress: string;
  productId: number;
  productName: string;
  productUnit: string;
  productQuantity: number;
  vehicleId: number;
  vehicleNumber: string;
  isLoginPage: boolean;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private productService: ProductService,
    private challanService: ChallanService, private router: Router, private appService: AppService, private location: Location,
    private vehicleService: VehicleService) {
    this.route.queryParams.subscribe(params => {
      this.challanId = params["chal_id"];
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

    this.getChallanDetailById();

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

    this.challanService.getChallans().subscribe(response => {
      this.challans = response.challans;
    },
      error => {
        console.log(error)
      });

    this.vehicleService.getVehicles().subscribe(response => {
      this.vehicles = response.vehicles;
    },
      error => {
        console.log(error)
      });
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewChallan() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearChallanFields();
  }

  cancelClicked() {
    debugger;
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getChallanDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addChallan() {
    if (this.buttonLabel == "SAVE") {
      if (this.customerId != undefined && this.productId != undefined && this.vehicleId != undefined &&
        this.productQuantity != undefined) {
        const payload = { "data": { "chal_date": "2018-07-12", "chal_cust_id": this.customerId, "chal_prod_id": this.productId, "chal_veh_id": this.vehicleId, "chal_quantity": this.productQuantity } };
        this.challanService.addChallan(payload).subscribe(response => {
          if (response.status == 200) {
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

  setCustomerDetail(customer) {
    this.customerId = customer.cust_id;
    this.customerAddress = customer.cust_address;
  }

  setProductDetail(product) {
    this.productId = product.prod_id;
    this.productUnit = product.prod_unit;
  }

  setVehicleDetail(vehicle) {
    this.vehicleId = vehicle.veh_id;
  }

  getChallanDetailById() {
    const payload = { "data": { "chal_id": this.challanId } };
    this.challanService.getChallanById(payload).subscribe(response => {
      if (response.status == 200) {
        if (response.challans != undefined && response.challans.length > 0) {
          this.setChallanDetail(response.challans[0]);
        }
      }
    },
      error => {
        console.log(error)
      });
  }

  setChallanDetail(challan) {
    this.customerName = challan.chal_cust_name;
    this.customerAddress = challan.chal_cust_address;
    this.productName = challan.chal_prod_name;
    this.productUnit = challan.chal_prod_unit;
    this.productQuantity = challan.chal_quantity;
    this.vehicleNumber = challan.chal_veh_no;
  }

  clearChallanFields() {

    this.customerName = undefined;
    this.customerAddress = undefined;
    this.productName = undefined;
    this.productUnit = undefined;
    this.productQuantity = undefined;
    this.vehicleNumber = undefined;
  }
}

