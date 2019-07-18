import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../add-customer/customer.service";
import { ProductService } from "../add-product/product.service";
import { ChallanService } from "../create-challan/challan.service";
import { VehicleService } from "../add-vehicle/vehicle.service";
import { Challan } from "../create-challan/challan";
import { AppService } from '../app.service';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'create-challan',
  templateUrl: './create-challan.component.html',
  styleUrls: ['./create-challan.component.css']
})
export class CreateChallanComponent implements OnInit {

  challans;
  customers;
  products;
  vehicles;

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  isDeleteDisabled: boolean;

  challanId: number;
  challanNumber: number;
  challanDate: Date;
  customerId: number;
  customerName: string;
  customerAddress: string;
  productId: number;
  productName: string;
  productUnit: string;
  productQuantity: number;
  productRate: number;
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

  showUIChanges() {
    if (this.challanId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getChallanDetailById();
    } else {
      // Enable all fields for view mode
      this.isFieldDisabled = false;

      // Enable cancel button initially
      this.isCancelDisabled = false;

      // Disable delete button initially
      this.isDeleteDisabled = true;
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

  addNewChallan() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearChallanFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = !this.isDeleteDisabled;
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
      if (this.customerId != undefined && this.productId != undefined && this.productRate != undefined && this.vehicleId != undefined &&
        this.productQuantity != undefined) {
          var formattedChallanDate;
          if (this.challanDate != undefined){
            formattedChallanDate = moment(this.challanDate).format('YYYY-MM-DD');
          } else {
            formattedChallanDate = null;
          }
        if (this.isEditClicked) {
          const updatePayload = { "data": { "chal_id": this.challanId, "chal_no": this.challanNumber, "chal_date": formattedChallanDate, "chal_cust_id": this.customerId, "chal_prod_id": this.productId, "chal_prod_rate":this.productRate, "chal_veh_id": this.vehicleId, "chal_quantity": this.productQuantity } };
          this.challanService.updateChallan(updatePayload).subscribe(response => {
            if (response.status == 200) {
              // this.location.back();
              this.clearChallanFields();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const payload = { "data": { "chal_no": this.challanNumber, "chal_date": formattedChallanDate, "chal_quantity": this.productQuantity, "chal_cust_id": this.customerId, "chal_prod_id": this.productId, "chal_prod_rate":this.productRate, "chal_veh_id": this.vehicleId, "chal_is_invoice_created": 0 } };
          this.challanService.addChallan(payload).subscribe(response => {
            if (response.status == 200) {
              // this.location.back();
              this.clearChallanFields();
            }
          },
            error => {
              console.log(error)
            });
        }
      } else {
        alert('Please fill all mandatory fields');
      }
    } else {
      this.buttonLabel = "SAVE";
      this.isEditClicked = true;
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
      this.isDeleteDisabled = true;
    }
  }

  setCustomerDetail(customer) {
    this.customerId = customer.cust_id;
    this.customerAddress = customer.cust_address;
  }

  setProductDetail(product) {
    this.productId = product.prod_id;
    this.productUnit = product.prod_unit;
    this.productRate = product.prod_rate;
  }

  setVehicleDetail(vehicle) {
    this.vehicleId = vehicle.veh_id;
  }

  getChallanDetailById() {
    if(this.challanId != undefined){
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
    } else {
      this.location.back();
    }
  }

  setChallanDetail(challan) {
    this.challanDate = challan.chal_date;
    this.challanNumber = challan.chal_no;
    this.customerId = challan.chal_cust_id;
    this.customerName = challan.chal_cust_name;
    this.customerAddress = challan.chal_cust_address;
    this.productId = challan.chal_prod_id;
    this.productName = challan.chal_prod_name;
    this.productUnit = challan.chal_prod_unit;
    this.productQuantity = challan.chal_quantity;
    this.productRate = challan.chal_prod_rate;
    this.vehicleId = challan.chal_veh_id;
    this.vehicleNumber = challan.chal_veh_no;
  }

  clearChallanFields() {
    this.challanDate = undefined;
    this.challanNumber = undefined;
    this.customerName = undefined;
    this.customerAddress = undefined;
    this.productName = undefined;
    this.productUnit = undefined;
    this.productQuantity = undefined;
    this.productRate = undefined;
    this.vehicleNumber = undefined;
  }

  printChallanDetail() {
    const challanObj = new Challan(this.challanId, this.challanDate, this.customerName, this.customerAddress, this.productName, this.productUnit, this.productQuantity, this.productRate, this.vehicleNumber);
    if (challanObj != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: challanObj
      };
      // Redirect it to View Product screen
      this.router.navigate(['/view-challan-copy'], navigationExtras);
    }
  }
}

