import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { VehicleService } from "../add-vehicle/vehicle.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"

@Component({
  selector: 'add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  isDeleteDisabled: boolean;

  vehicles = [];
  vehicleId: number;
  vehicleName: string;
  vehicleDesc: string;
  vehicleNumber: number;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private vehicleService: VehicleService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.vehicleId = params["veh_id"];
      this.vehicleName = params["veh_name"];
      this.vehicleDesc = params["veh_desc"];
      this.vehicleNumber = params["veh_number"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();

  }

  showUIChanges() {
    if (this.vehicleId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getVehicleDetailsById();
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

  addNewVehicle() {
    this.isFieldDisabled = false;
    this.isCancelDisabled = false;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearVehicleFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = !this.isDeleteDisabled;

    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getVehicleDetailsById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addVehicle() {
    if (this.buttonLabel == "SAVE") {
      if (this.vehicleName != undefined && this.vehicleNumber != undefined) {
        if (this.vehicleDesc == undefined) {
          this.vehicleDesc = "";
        }

        if (this.isEditClicked) {
          const updatePayload = { "data": { "veh_id": this.vehicleId, "veh_name": this.vehicleName, "veh_number": this.vehicleNumber, "veh_desc": this.vehicleDesc } };
          this.vehicleService.updateVehicle(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "veh_name": this.vehicleName, "veh_number": this.vehicleNumber, "veh_desc": this.vehicleDesc } };
          this.vehicleService.addVehicle(addPayload).subscribe(response => {
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
      this.buttonLabel = "SAVE";
      this.isEditClicked = true;
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
      this.isDeleteDisabled = true;
    }
  }

  clearVehicleFields() {
    this.vehicleName = undefined;
    this.vehicleNumber = undefined;
    this.vehicleDesc = undefined;
  }

  deleteVehicle() {
    const deletePayload = { "data": { "veh_id": this.vehicleId } };
    this.vehicleService.deleteVehicle(deletePayload).subscribe(response => {
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

  setVehicleDetail(vehicle) {
    this.vehicleName = vehicle.veh_name;
    this.vehicleNumber = vehicle.veh_number;
    this.vehicleDesc = vehicle.veh_desc;
  }

  getVehicleDetailsById() {
    if (this.vehicleId != undefined) {
      const payload = { "data": { "veh_id": this.vehicleId } };
      this.vehicleService.getVehicleDetailsById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.vehicles != undefined && response.vehicles.length > 0) {
            this.setVehicleDetail(response.vehicles[0]);
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

