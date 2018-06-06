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

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private productService: ProductService,
    private challanService: ChallanService, private router: Router, private appService: AppService, private location: Location,
    private vehicleService: VehicleService) {
    this.route.queryParams.subscribe(params => {
      this.customerName = params["chal_cust_name"];
      this.customerAddress = params["chal_cust_address"];
      this.productName = params["chal_prod_name"];
      this.productUnit = params["chal_prod_unit"];
      this.productQuantity = params["chal_quantity"];
      this.vehicleNumber = params["chal_veh_no"];
    });
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
    this.isFieldDisabled = false;
    this.isCancelDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearChallanFields();
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

  addChallan() {
    if (this.buttonLabel == "SAVE") {
      if (this.customerId != undefined && this.productId != undefined && this.vehicleId != undefined &&
        this.productQuantity != undefined) {
        const payload = { "data": { "chal_cust_id": this.customerId, "chal_prod_id": this.productId, "chal_veh_id": this.vehicleId, "chal_quantity": this.productQuantity } };
        this.challanService.addChallan(payload).subscribe(response => {
          if (response.status == 200) {
            console.log("Add challan " + response);
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

  removeChalan(chalan) {
    const index = this.challans.indexOf(chalan);
    this.challans.splice(index, 1);
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

  clearChallanFields() {

    this.customerName = undefined;
    this.customerAddress = undefined;
    this.productName = undefined;
    this.productUnit = undefined;
    this.productQuantity = undefined;
    this.vehicleNumber = undefined;
  }
}

