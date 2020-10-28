import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from "../add-maintenance-detail/maintenance.service";
import { VehicleService } from "../add-vehicle/vehicle.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { Maintenance } from './maintenance';
import { Vehicle } from '../add-vehicle/vehicle';
import * as moment from 'moment';
import { AccountService } from '../add-account/account.service';
import { Account } from '../add-account/account';

@Component({
  selector: 'add-maintenance-detail',
  templateUrl: './add-maintenance-detail.component.html',
  styleUrls: ['./add-maintenance-detail.component.css']
})

export class AddMaintenanceDetailComponent implements OnInit {

  vehicles: Vehicle[];
  accounts: Account[];
  maintenance_details: Maintenance[];
  maintenanceId: number;
  invoiceDate: Date;
  invoiceNumber: string;
  supplierName: string;
  vehicleId: number;
  vehicleNumber: string;
  invoiceAmount: number;
  paymentMethod: string;
  accountNo: string;
  bankDetails: string;

  paymentModes = [{ payment_mode: "Cash" }, { payment_mode: "Cheque" }];

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

  public constructor(private route: ActivatedRoute, private appService: AppService, private maintenanceService: MaintenanceService,
    private vehicleService: VehicleService, private location: Location, private accountService: AccountService) {
    this.route.queryParams.subscribe(params => {
      this.maintenanceId = params["maintenance_id"];
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

      this.accountService.getAccounts().subscribe(response => {
        this.accounts = response.account_details;
      },
        error => {
          console.log(error)
        });

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();

  }

  showUIChanges() {
    if (this.maintenanceId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getMaintenanceDetailById();
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

  addMaintenanceDetail() {
    if (this.buttonLabel == "SAVE") {
      if (this.invoiceDate != undefined && this.invoiceNumber != undefined && this.supplierName != undefined && this.vehicleNumber != undefined && this.invoiceAmount != undefined) {
        var formattedInvoiceDate = moment(this.invoiceDate).format('YYYY-MM-DD');
        if(this.paymentMethod === 'Cash'){
          this.accountNo = '';
          this.bankDetails = '';
        }
        if (this.isEditClicked) {
          this.isEditClicked = false;
          const updatePayload = { "data": { "maintenance_id": this.maintenanceId, "maint_invoice_date": formattedInvoiceDate, "maint_invoice_no": this.invoiceNumber, "maint_supplier":this.supplierName, "maint_vehicle_id": this.vehicleId, "maint_invoice_amount": this.invoiceAmount, "maint_payment_method": this.paymentMethod, "maint_account_no": this.accountNo, "maint_bank_name": this.bankDetails } };
          this.maintenanceService.updateMaintenanceDetail(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "maint_invoice_date": formattedInvoiceDate, "maint_invoice_no": this.invoiceNumber, "maint_supplier":this.supplierName, "maint_vehicle_id": this.vehicleId, "maint_invoice_amount": this.invoiceAmount, "maint_payment_method": this.paymentMethod, "maint_account_no": this.accountNo, "maint_bank_name": this.bankDetails }};
          this.maintenanceService.addMaintenanceDetail(addPayload).subscribe(response => {
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
    this.invoiceDate = undefined;
    this.invoiceNumber = undefined;
    this.supplierName = undefined;
    this.vehicleId = undefined;
    this.vehicleNumber = undefined;
    this.invoiceAmount = undefined;
    this.paymentMethod = undefined;
    this.accountNo = undefined;
    this.bankDetails = undefined;
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewMaintenanceDetail() {

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
      this.getMaintenanceDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  deleteMaintenanceDetail() {
    const deletePayload = { "data": { "maintenance_id": this.maintenanceId } };
    this.maintenanceService.deleteMaintenanceDetail(deletePayload).subscribe(response => {
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

  getMaintenanceDetailById() {
    if (this.maintenanceId != undefined) {
      const payload = { "data": { "maintenance_id": this.maintenanceId } };
      this.maintenanceService.getMaintenanceDetailById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.maintenance_details != undefined && response.maintenance_details.length > 0) {
            this.setMaintenanceDetail(response.maintenance_details[0]);
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

  setMaintenanceDetail(maintenance) {

    this.invoiceDate = maintenance.maint_invoice_date
    this.invoiceNumber = maintenance.maint_invoice_no;
    this.supplierName = maintenance.maint_supplier;
    this.vehicleId = maintenance.maint_vehicle_id;
    this.vehicleNumber = maintenance.maint_vehicle_no;
    this.invoiceAmount = maintenance.maint_invoice_amount;
    this.paymentMethod = maintenance.maint_payment_method;
  }

  setVehicleDetail(vehicle) {
    this.vehicleId = vehicle.veh_id;
  }
}
