import { Component, OnInit } from '@angular/core';
import { InsuranceService } from "../add-insurance-detail/insurance.service";
import { VehicleService } from "../add-vehicle/vehicle.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { Insurance } from './insurance';
import { Vehicle } from '../add-vehicle/vehicle';
import * as moment from 'moment';

@Component({
  selector: 'add-insurance-detail',
  templateUrl: './add-insurance-detail.component.html',
  styleUrls: ['./add-insurance-detail.component.css']
})
export class AddInsuranceDetailComponent implements OnInit {

  vehicles: Vehicle[];
  insurance_details: Insurance[];
  insuranceId: number;
  policyNumber: string;
  policyIssuedDate: Date;
  vehicleId: number;
  vehicleNumber: string;
  premiumAmount: string;
  insuranceCompany: string;
  nomineeName: string;
  additionalComments: string;

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

  public constructor(private route: ActivatedRoute, private appService: AppService, private insuranceService: InsuranceService,
    private vehicleService: VehicleService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.insuranceId = params["insurance_id"];
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

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();

  }

  showUIChanges() {
    if (this.insuranceId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getInsuranceDetailById();
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

  addInsuranceDetail() {
    if (this.buttonLabel == "SAVE") {
      if (this.policyNumber != undefined && this.policyIssuedDate != undefined && this.vehicleNumber != undefined && this.premiumAmount != undefined && this.insuranceCompany != undefined && this.nomineeName != undefined) {
        var formattedIssuedDate = moment(this.policyIssuedDate).format('YYYY-MM-DD');
        if(this.additionalComments == undefined){
          this.additionalComments = "";
        }
        if (this.isEditClicked) {
          this.isEditClicked = false;
          const updatePayload = { "data": { "insurance_id": this.insuranceId, "policy_no": this.policyNumber, "policy_issued_date": formattedIssuedDate, "vehicle_id": this.vehicleId, "premium_amount": this.premiumAmount, "insurance_company": this.insuranceCompany, "nominee_name":this.nomineeName, "additional_comments": this.additionalComments } };
          this.insuranceService.updateInsuranceDetail(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "policy_no": this.policyNumber, "policy_issued_date": formattedIssuedDate, "vehicle_id": this.vehicleId, "premium_amount": this.premiumAmount, "insurance_company": this.insuranceCompany, "nominee_name":this.nomineeName, "additional_comments": this.additionalComments } };
          this.insuranceService.addInsuranceDetail(addPayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
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
    this.policyNumber = undefined;
    this.policyIssuedDate = undefined;
    this.vehicleNumber = undefined;
    this.premiumAmount = undefined;
    this.insuranceCompany = undefined;
    this.nomineeName = undefined;
    this.additionalComments = undefined;
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewInsuranceDetail() {

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
      this.getInsuranceDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  deleteInsuranceDetail() {
    const deletePayload = { "data": { "insurance_id": this.insuranceId } };
    this.insuranceService.deleteInsuranceDetail(deletePayload).subscribe(response => {
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

  getInsuranceDetailById() {
    if (this.insuranceId != undefined) {
      const payload = { "data": { "insurance_id": this.insuranceId } };
      this.insuranceService.getInsuranceDetailById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.insurance_details != undefined && response.insurance_details.length > 0) {
            this.setInsuranceDetail(response.insurance_details[0]);
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

  setInsuranceDetail(insurance) {

    this.policyNumber = insurance.policy_no;
    this.policyIssuedDate = insurance.policy_issued_date;
    this.vehicleId = insurance.vehicle_id;
    this.vehicleNumber = insurance.vehicle_no;
    this.premiumAmount = insurance.premium_amount;
    this.insuranceCompany = insurance.insurance_company;
    this.nomineeName = insurance.nominee_name;
    this.additionalComments = insurance.additional_comments;
  }

  setVehicleDetail(vehicle) {
    this.vehicleId = vehicle.veh_id;
  }
}
