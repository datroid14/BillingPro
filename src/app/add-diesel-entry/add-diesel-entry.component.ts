import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DieselEntryService } from "../add-diesel-entry/diesel-entry.service";
import { EmployeeService } from "../add-employee/employee.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"
import * as moment from 'moment';

@Component({
  selector: 'add-diesel-entry',
  templateUrl: './add-diesel-entry.component.html',
  styleUrls: ['./add-diesel-entry.component.css']
})
export class AddDieselEntryComponent implements OnInit {

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  isDeleteDisabled: boolean;

  employees;
  employeeId: number;
  employeeName: string;

  dieselEntries = [];
  dieselEntryId: number;
  dieselFilledDate: string;
  dieselQuantity: number;
  dieselAmount: number;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private dieselEntryService: DieselEntryService,
    private employeeService: EmployeeService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.dieselEntryId = params["diesel_entry_id"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();

    this.employeeService.getEmployees().subscribe(response => {
      this.employees = response.employees;
    },
      error => {
        console.log(error)
      });
  }

  showUIChanges() {
    if (this.dieselEntryId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getDieselEntryById();
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

  addNewDieselEntry() {
    this.isFieldDisabled = false;
    this.isCancelDisabled = false;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearDieselEntryFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = false;

    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getDieselEntryById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addDieselEntry() {
    if (this.buttonLabel == "SAVE") {
      if (this.dieselFilledDate != undefined && this.employeeName != undefined && this.dieselQuantity != undefined && this.dieselAmount != undefined) {
        var formattedDieselDate = moment(this.dieselFilledDate).format('YYYY-MM-DD');
        if (this.isEditClicked) {
          const updatePayload = { "data": { "diesel_entry_id": this.dieselEntryId, "diesel_filling_date": formattedDieselDate, "diesel_qty": this.dieselQuantity, "diesel_amount": this.dieselAmount, "emp_id": this.employeeId } };
          this.dieselEntryService.updateDieselEntry(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "diesel_filling_date": formattedDieselDate, "diesel_qty": this.dieselQuantity, "diesel_amount": this.dieselAmount, "emp_id": this.employeeId } };
          this.dieselEntryService.addDieselEntry(addPayload).subscribe(response => {
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

  clearDieselEntryFields() {
    this.employeeName = undefined;
    this.dieselEntryId = undefined;
    this.dieselFilledDate = undefined;
    this.dieselQuantity = undefined;
    this.dieselAmount = undefined;
  }

  deleteDieselEntry() {
    const deletePayload = { "data": { "diesel_entry_id": this.dieselEntryId } };
    this.dieselEntryService.deleteDieselEntry(deletePayload).subscribe(response => {
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

  setDieselEntryDetail(dieselEntry) {
    this.dieselFilledDate = dieselEntry.diesel_filling_date;
    this.dieselQuantity = dieselEntry.diesel_qty;
    this.dieselAmount = dieselEntry.diesel_amount;
    this.employeeId = dieselEntry.emp_id;
    this.employeeName = dieselEntry.emp_name;

  }

  setEmployeeDetail(employee) {
    this.employeeId = employee.emp_id;
    this.employeeName = employee.emp_name;

  }

  getDieselEntryById() {
    if (this.dieselEntryId != undefined) {
      const payload = { "data": { "diesel_entry_id": this.dieselEntryId } };
      this.dieselEntryService.getDieselEntryById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.dieselEntries != undefined && response.dieselEntries.length > 0) {
            this.setDieselEntryDetail(response.dieselEntries[0]);
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
