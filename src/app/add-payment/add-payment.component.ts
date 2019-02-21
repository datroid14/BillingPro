import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PaymentService } from "../add-payment/payment.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"
import { EmployeeService } from "../add-employee/employee.service"
import { Employee } from '../add-employee/employee';
import * as moment from 'moment';

@Component({
  selector: 'add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  isDeleteDisabled: boolean;

  // Variables for payments
  payments = [];
  paymentId: number;
  paymentDate: Date;
  paymentAmount: number;
  paymentMode: string;
  paymentType: string;

  // Variables for employees
  employees: Employee[];
  employeeId: number;
  employeeName: string;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private paymentService: PaymentService,
    private location: Location, private employeeService: EmployeeService) {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params["payment_id"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();

    // Get HSN codes from service
    this.employeeService.getEmployees().subscribe(response => {
      this.employees = response.employees;
    },
      error => {
        console.log(error)
      });
  }

  showUIChanges() {
    if (this.paymentId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getPaymentDetailById();
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

  addNewPaymentDetail() {
    this.isFieldDisabled = false;
    this.isCancelDisabled = false;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearPaymentFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = false;

    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getPaymentDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addPaymentDetail() {
    debugger;
    if (this.buttonLabel == "SAVE") {
      if (this.paymentDate != undefined && this.employeeId != undefined && this.paymentAmount != undefined) {
        this.isDeleteDisabled = false;
        var formattedPaymentDate = moment(this.paymentDate).format('YYYY-MM-DD');
        if (this.isEditClicked) {
          const updatePayload = { "data": { "payment_id": this.paymentId, "payment_date": formattedPaymentDate, "emp_id": this.employeeId, "payment_amount": this.paymentAmount, "payment_mode": this.paymentMode, "payment_type": this.paymentType } };

          this.paymentService.updatePaymentDetail(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "payment_date": formattedPaymentDate, "emp_id": this.employeeId, "payment_amount": this.paymentAmount, "payment_mode": this.paymentMode, "payment_type": this.paymentType } };

          this.paymentService.addPaymentDetail(addPayload).subscribe(response => {
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

  clearPaymentFields() {
    this.paymentDate = undefined;
    this.employeeName = undefined;
    this.paymentAmount = undefined;
    this.paymentType = undefined;
  }

  deletePaymentDetail() {
    const deletePayload = { "data": { "payment_id": this.paymentId } };
    this.paymentService.deletePaymentDetail(deletePayload).subscribe(response => {
      if (response.status == 200) {
        console.log(response.message);
        this.location.back();
      } else if (response.status == 501) {
        console.log(response.message);
      }
    },
      error => {
        console.log(error)
      });
  }

  setPaymentDetail(payment) {
    this.paymentDate = payment.payment_date;
    this.employeeId = payment.emp_id;
    this.employeeName = payment.emp_name;
    this.paymentAmount = payment.payment_amount;
    this.paymentMode = payment.payment_mode;
    this.paymentType = payment.payment_type;
  }

  setEmployeeDetail(employee) {
    this.employeeId = employee.emp_id;
    this.employeeName = employee.emp_name;
  }

  getPaymentDetailById() {
    if (this.paymentId != undefined) {
      // Get product details by id
      const payload = { "data": { "payment_id": this.paymentId } };
      this.paymentService.getPaymentDetailById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.paymentDetails != undefined && response.paymentDetails.length > 0) {
            this.setPaymentDetail(response.paymentDetails[0]);
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

