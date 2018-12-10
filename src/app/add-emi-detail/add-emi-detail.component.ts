import { Component, OnInit } from '@angular/core';
import { EmiDetailService } from "../add-emi-detail/emi-detail.service";
import { VehicleService } from "../add-vehicle/vehicle.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'add-emi-detail',
  templateUrl: './add-emi-detail.component.html',
  styleUrls: ['./add-emi-detail.component.css']
})
export class AddEmiDetailComponent implements OnInit {

  vehicles;
  emiDetails;
  
  emiId: number;
  emiDate: Date;
  vehicleId: number;
  vehicleNumber: string;
  emiMonthYear: string;
  emiAmount: number;
  paymentMode: string;
  chequeDate: Date;
  chequeNumber: number;
  chequeBank: string;

  // Flag for enabling/disabling all fields in view mode
  isFieldDisabled: boolean;

  // Flag for enabling/disabling cancel button
  isCancelDisabled: boolean;

  // Change button label as per requirement
  buttonLabel: string;

  isEditClicked: boolean;

  isDeleteDisabled: boolean;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private emiDetailService: EmiDetailService,
    private location: Location, private vehicleService: VehicleService) {
    this.route.queryParams.subscribe(params => {
      this.emiId = params["emi_id"];
    });
    // Image paths
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    this.vehicleService.getVehicles().subscribe(response => {
      this.vehicles = response.vehicles;
    },
      error => {
        console.log(error)
      });

    // Make necessary changes based on selection from view emi details
    this.showUIChanges();
  }

  showUIChanges() {
    if (this.emiId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getEmiDetailById();
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

  addEmiDetail() {
    if (this.buttonLabel == "SAVE") {
      if (this.emiDate != undefined && this.vehicleId != undefined && this.emiMonthYear != undefined && this.emiAmount != undefined) {
        var formattedEmiDate = moment(this.emiDate).format('YYYY-MM-DD');
        var formattedChequeDate = moment(this.chequeDate).format('YYYY-MM-DD');
        if (this.isEditClicked) {
          this.isEditClicked = false;
          const updatePayload = { "data": { "emi_id": this.emiId, "emi_date": formattedEmiDate, "vehicle_id": this.vehicleId, "emi_month_year": this.emiMonthYear, "emi_amount": this.emiAmount, "payment_mode": this.paymentMode, "cheque_date": formattedChequeDate, "cheque_no": this.chequeNumber, "cheque_bank": this.chequeBank } };
          this.emiDetailService.updateEmiDetail(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.showUIChanges();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "emi_date": formattedEmiDate, "vehicle_id": this.vehicleId, "emi_month_year": this.emiMonthYear, "emi_amount": this.emiAmount, "payment_mode": this.paymentMode, "cheque_date": formattedChequeDate, "cheque_no": this.chequeNumber, "cheque_bank": this.chequeBank } };
          this.emiDetailService.addEmiDetail(addPayload).subscribe(response => {
            if (response.status == 200) {
              this.showUIChanges();
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
      this.isEditClicked = true;
      this.buttonLabel = "SAVE";
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
      this.isDeleteDisabled = true;
    }
  }

  clearFields() {
    this.emiDate = undefined;
    this.vehicleId = undefined;
    this.vehicleNumber = undefined;
    this.emiMonthYear = undefined;
    this.emiAmount = undefined;
    this.paymentMode = undefined;
    this.chequeDate = undefined;
    this.chequeNumber = undefined;
    this.chequeBank = undefined;
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewEmiDetail() {

    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = false;

    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getEmiDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  deleteEmiDetail() {
    const deletePayload = { "data": { "emi_id": this.emiId } };
    this.emiDetailService.deleteEmiDetail(deletePayload).subscribe(response => {
      if (response.status == 200) {
        this.location.back();
      } else if (response.status == 501) {
        console.log(response.message);
      }
    },
      error => {
        console.log(error)
      });
  }

  getEmiDetailById() {
    if (this.emiId != undefined) {
      const payload = { "data": { "emi_id": this.emiId } };
      this.emiDetailService.getEmiDetailById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.emi_details != undefined && response.emi_details.length > 0) {
            this.setEmiDetail(response.emi_details[0]);
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

  setEmiDetail(emi){
    this.vehicleId = emi.vehicle_id;
    this.vehicleNumber = emi.veh_number;
    this.emiDate = emi.emi_date;
    this.emiMonthYear = emi.emi_month_year;
    this.emiAmount = emi.emi_amount;
    this.paymentMode = emi.payment_mode;
    this.chequeDate = emi.cheque_date;
    this.chequeNumber = emi.cheque_no;
    this.chequeBank = emi.cheque_bank;
  }

  setVehicleDetail(vehicle) {
    this.vehicleId = vehicle.veh_id;
  }
}
