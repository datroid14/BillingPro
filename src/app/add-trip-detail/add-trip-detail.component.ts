import { Component, OnInit } from '@angular/core';
import { VehicleService } from "../add-vehicle/vehicle.service";
import { EmployeeService } from "../add-employee/employee.service";
import { TripDetailService } from "../add-trip-detail/trip-detail.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'add-trip-detail',
  templateUrl: './add-trip-detail.component.html',
  styleUrls: ['./add-trip-detail.component.css']
})
export class AddTripDetailComponent implements OnInit {

  employees;
  vehicles;
  tripDetails;

  employeeId: number;
  employeeName: string;
  vehicleId: number;
  vehicleNumber: string;
  tripId: number;
  tripDate: Date;
  loadingPlace: string;
  unloadingPlace: string;
  quantity: number;
  driverExpenses: number;
  dieselExpenses: number;
  tollCharges: number;
  workerCharges: number;
  washingCharges: number;
  maintenanceCharges: number;

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

  public constructor(private route: ActivatedRoute, private appService: AppService, private vehicleService: VehicleService,
    private location: Location, private employeeService: EmployeeService, private tripDetailService: TripDetailService) {
    this.route.queryParams.subscribe(params => {
      this.tripId = params["trip_id"];
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

    this.employeeService.getEmployees().subscribe(response => {
      this.employees = response.employees;
    },
      error => {
        console.log(error)
      });

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();
  }

  showUIChanges() {
    if (this.tripId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getTripDetailById();
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

  addTripDetail() {
    debugger;
    if (this.buttonLabel == "SAVE") {
      if (this.tripDate != undefined && this.vehicleId != undefined && this.loadingPlace != undefined && this.unloadingPlace != undefined && this.employeeId != undefined) {
        var formattedTripDate = moment(this.tripDate).format('YYYY-MM-DD');
        if (this.isEditClicked) {
          this.isEditClicked = false;

          const updatePayload = { "data": { "trip_id": this.tripId, "trip_date": formattedTripDate, "vehicle_id": this.vehicleId, "loading_place": this.loadingPlace, "unloading_place": this.unloadingPlace, "material_qty": this.quantity, "driver_id": this.employeeId, "driver_expenses_amount": this.driverExpenses, "diesel_expenses_amount": this.dieselExpenses, "toll_charges": this.tollCharges, "worker_charges": this.workerCharges, "washing_charges": this.washingCharges, "maintenance_charges": this.maintenanceCharges } };
          this.tripDetailService.updateTripDetail(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "trip_date": formattedTripDate, "vehicle_id": this.vehicleId, "loading_place": this.loadingPlace, "unloading_place": this.unloadingPlace, "material_qty": this.quantity, "driver_id": this.employeeId, "driver_expenses_amount": this.driverExpenses, "diesel_expenses_amount": this.dieselExpenses, "toll_charges": this.tollCharges, "worker_charges": this.workerCharges, "washing_charges": this.washingCharges, "maintenance_charges": this.maintenanceCharges } };
          this.tripDetailService.addTripDetail(addPayload).subscribe(response => {
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

    this.employeeId = undefined;
    this.employeeName = undefined;
    this.vehicleId = undefined;
    this.vehicleNumber = undefined;
    this.tripId = undefined;
    this.tripDate = undefined;
    this.loadingPlace = undefined;
    this.unloadingPlace = undefined;
    this.quantity = undefined;
    this.driverExpenses = undefined;
    this.dieselExpenses = undefined;
    this.tollCharges = undefined;
    this.workerCharges = undefined;
    this.washingCharges = undefined;
    this.maintenanceCharges = undefined;
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewTripDetail() {
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
      this.getTripDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  deleteTripDetail() {
    const deletePayload = { "data": { "trip_id": this.tripId } };
    this.tripDetailService.deleteTripDetail(deletePayload).subscribe(response => {
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

  getTripDetailById() {
    if (this.tripId != undefined) {
      const payload = { "data": { "trip_id": this.tripId } };
      this.tripDetailService.getTripDetailById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.trip_details != undefined && response.trip_details.length > 0) {
            this.setTripDetail(response.trip_details[0]);
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

  setTripDetail(trip) {
    this.vehicleId = trip.vehicle_id;
    this.vehicleNumber = trip.veh_number;
    this.tripDate = trip.trip_date;
    this.loadingPlace = trip.loading_place;
    this.unloadingPlace = trip.unloading_place;
    this.quantity = trip.material_qty;
    this.employeeId = trip.driver_id
    this.employeeName = trip.emp_name;
    this.driverExpenses = trip.driver_expenses_amount;
    this.dieselExpenses = trip.diesel_expenses_amount;
    this.tollCharges = trip.toll_charges;
    this.workerCharges = trip.worker_charges;
    this.washingCharges = trip.washing_charges;;
    this.maintenanceCharges = trip.maintenance_charges;;
  }

  setEmployeeDetail(employee) {
    this.employeeId = employee.emp_id;
  }

  setVehicleDetail(vehicle) {
    this.vehicleId = vehicle.veh_id;
  }
}
