import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PaymentService } from "../add-payment/payment.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"
import { EmployeeService } from "../add-employee/employee.service"
import { AccountService } from "../add-account/account.service"
import { VendorService } from "../add-vendor/vendor.service"
import { Employee } from '../add-employee/employee';
import * as moment from 'moment';
import { Account } from '../add-account/account';
import { Vendor } from '../add-vendor/vendor';
import { ViewPurchaseCopyComponent } from '../view-purchase-copy/view-purchase-copy.component';

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
  payeeTypeId: number;
  payeeType: string;
  payeeId: number;
  payeeName: string;
  paymentAmount: number;
  paymentMode: string;
  paymentAccountId: number;
  paymentAccountNo: string;
  paymentBankDetails: string;
  paymentDesc: string;

  // Variables for employees
  employees: Employee[];
  employeeName: string;

  accounts: Account[];
  vendors: Vendor[];
  payeeNames: Payee[];

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;
  payeeTypes = [{ payee_id: 101, payee_type: "Employee" }, { payee_id: 102, payee_type: "Vendor" }];
  paymentModes = [{ payment_mode: "Cash" }, { payment_mode: "Cheque" }, { payment_mode: "Demand Draft" }];


  public constructor(private route: ActivatedRoute, private appService: AppService, private paymentService: PaymentService,
    private location: Location, private employeeService: EmployeeService, private accountService: AccountService, private vendorService: VendorService) {
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

    this.accountService.getAccounts().subscribe(response => {
      this.accounts = response.account_details;
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
    if (this.buttonLabel == "SAVE") {
      if (this.paymentDate != undefined && this.payeeType != undefined && this.payeeName != undefined && this.paymentAmount != undefined && this.paymentMode != undefined && this.paymentAccountId != undefined) {
        this.isDeleteDisabled = false;
        var formattedPaymentDate = moment(this.paymentDate).format('YYYY-MM-DD');
        if (this.isEditClicked) {
          const updatePayload = { "data": { "payment_id": this.paymentId, "payment_date": formattedPaymentDate, "payee_type": this.payeeType, "payee_id": this.payeeId, "payee_name": this.payeeName, "payment_amount": this.paymentAmount, "payment_mode": this.paymentMode, "payment_acc_id": this.paymentAccountId, "payment_desc": this.paymentDesc } };

          this.paymentService.updatePaymentDetail(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "payment_date": formattedPaymentDate, "payee_type": this.payeeType, "payee_id": this.payeeId, "payee_name": this.payeeName, "payment_amount": this.paymentAmount, "payment_mode": this.paymentMode, "payment_acc_id": this.paymentAccountId, "payment_desc": this.paymentDesc } };

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
    this.payeeType = undefined;
    this.payeeId = undefined;
    this.payeeName = undefined;
    this.paymentAmount = undefined;
    this.paymentMode = undefined;
    this.paymentAccountNo = undefined;
    this.paymentBankDetails = undefined;
    this.paymentDesc = undefined;
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
    this.payeeType = payment.payee_type;
    this.payeeId = payment.payee_id;
    this.payeeName = payment.payee_name;
    this.payeeNames = [];
    this.payeeNames.push(new Payee(this.payeeId, this.payeeName));
    this.paymentAmount = payment.payment_amount;
    this.paymentMode = payment.payment_mode;
    this.paymentAccountId = payment.payment_acc_id;
    this.paymentAccountNo = payment.account_number;
    this.paymentBankDetails = payment.bank_name + " " + payment.bank_address;
    this.paymentDesc = payment.payment_desc;
  }

  setAccountDetail(account) {
    this.paymentAccountId = account.account_id;
    this.paymentBankDetails = account.bank_name + ", " + account.bank_address;
  }

  setPayeeType(payeeTypeId) {
    this.payeeTypeId = payeeTypeId;
    this.payeeNames = [];
    if (payeeTypeId == 101) {
      // Get employees from service
      this.employeeService.getEmployees().subscribe(response => {
        if (response.employees != undefined && response.employees.length > 0) {
          for (let i = 0; i < response.employees.length; i++) {
            this.payeeNames.push(new Payee(response.employees[i].emp_id, response.employees[i].emp_name));
          }
        }
      },
        error => {
          console.log(error)
        });
    } else if (payeeTypeId == 102) {
      // Get vendors from service
      this.vendorService.getVendors().subscribe(response => {
        if (response.vendors != undefined && response.vendors.length > 0) {
          for (let i = 0; i < response.vendors.length; i++) {
            this.payeeNames.push(new Payee(response.vendors[i].vend_id, response.vendors[i].vend_name));
          }
        }
      },
        error => {
          console.log(error)
        });
    }
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

export class Payee {
  payee_id: number;
  payee_name: string;
  constructor(payeeId, payeeName) {
    this.payee_id = payeeId;
    this.payee_name = payeeName;
  }
}

