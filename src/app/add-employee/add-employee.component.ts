import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../add-employee/employee.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employees;
  employeeId: number;
  employeeName: string;
  employeeContact: string;
  employeeAddress: string;
  employeeAge: number;
  employeeAadhar: string;
  joiningDate: Date;
  employmentType: string;
  employeeRole: string;

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

  public constructor(private route: ActivatedRoute, private appService: AppService, private employeeService: EmployeeService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params["emp_id"];
    });
    // Image paths
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {

    this.appService.showDrawer(true);

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();

  }

  showUIChanges() {
    if (this.employeeId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getEmployeeDetailById();
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

  addEmployee() {
    debugger;
    if (this.buttonLabel == "SAVE") {
      if (this.employeeName != undefined && this.employeeAddress != undefined && this.employeeContact != undefined) {
        var formattedJoiningDate = moment(this.joiningDate).format('YYYY-MM-DD');
        if (this.isEditClicked) {
          this.isEditClicked = false;
          const updatePayload = { "data": { "emp_id": this.employeeId, "emp_name": this.employeeName, "emp_age": this.employeeAge, "emp_contact": this.employeeContact, "emp_address": this.employeeAddress, "date_of_joining": formattedJoiningDate, "emp_adhar_no": this.employeeAadhar, "emp_role": this.employeeRole, "employment_type": this.employmentType } };
          this.employeeService.updateEmployee(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "emp_name": this.employeeName, "emp_age": this.employeeAge, "emp_contact": this.employeeContact, "emp_address": this.employeeAddress, "date_of_joining": formattedJoiningDate, "emp_adhar_no": this.employeeAadhar, "emp_role": this.employeeRole, "employment_type": this.employmentType } };
          this.employeeService.addEmployee(addPayload).subscribe(response => {
            if (response.status == 200) {
              console.log("Add Employee " + response);
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
    this.employeeName = undefined;
    this.employeeContact = undefined;
    this.employeeAge = undefined;
    this.employeeAddress = undefined;
    this.joiningDate = undefined;
    this.employmentType = undefined;
    this.employeeRole = undefined;
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewEmployee() {

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
      this.getEmployeeDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  deleteEmployee() {
    const deletePayload = { "data": { "emp_id": this.employeeId } };
    this.employeeService.deleteEmployee(deletePayload).subscribe(response => {
      if (response.status == 200) {
        console.log("Delete employee " + response.message);
        this.location.back();
      } else if (response.status == 501) {
        console.log(response.message);
      }
    },
      error => {
        console.log(error)
      });
  }

  getEmployeeDetailById() {
    if (this.employeeId != undefined) {
      const payload = { "data": { "emp_id": this.employeeId } };
      this.employeeService.getEmployeeById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.employees != undefined && response.employees.length > 0) {
            this.setEmployeeDetail(response.employees[0]);
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

  setEmployeeDetail(employee) {

    this.employeeName = employee.emp_name;
    this.employeeAddress = employee.emp_address;
    this.employeeContact = employee.emp_contact;
    this.employeeAge = employee.emp_age;
    this.employeeAadhar = employee.emp_adhar_no;
    this.joiningDate = employee.date_of_joining;
    this.employmentType = employee.employment_type;
    this.employeeRole = employee.emp_role;
  }
}

