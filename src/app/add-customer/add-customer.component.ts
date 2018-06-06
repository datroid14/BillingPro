import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../add-customer/customer.service";
import { Customer } from '../add-customer/customer';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customers;
  customerName: string;
  customerAddress: string;
  contactNo: string;
  emailAddress: string;
  // Flag for enabling/disabling all fields in view mode
  isFieldDisabled: boolean;
  // Flag for editing fields
  isEditMode: boolean;
  // Flag for enabling/disabling add button
  isCancelDisabled: boolean;
  buttonLabel: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private customerService: CustomerService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.customerName = params["cust_name"];
      this.contactNo = params["cust_contact"];
      this.emailAddress = params["cust_email"];
      this.customerAddress = params["cust_address"];
    });
  }

  ngOnInit() {
    // Disable all fields for view mode
    this.isFieldDisabled = true;

    // Disable cancel button initially
    this.isCancelDisabled = true;

    // Change button label to save
    this.changeButtonLabel(this.isFieldDisabled);
  }

  addCustomer() {

    if (this.buttonLabel == "SAVE") {
      if (this.customerName != undefined && this.customerAddress != undefined && this.contactNo != undefined) {
        const payload = { "data": { "cust_name": this.customerName, "cust_contact": this.contactNo, "cust_email": this.emailAddress, "cust_address": this.customerAddress } };
        this.customerService.addCustomer(payload).subscribe(response => {
          if (response.status == 200) {
            console.log("Add customer " + response);
            this.location.back();
          }
        },
          error => {
            console.log(error)
          });
      } else {
        alert('Please fill all mandatory fields');
      }
    } else {
      this.buttonLabel = "SAVE";
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
    }
  }

  removeCustomer(customer) {

  }

  clearFields() {
    this.customerName = undefined;
    this.contactNo = undefined;
    this.emailAddress = undefined;
    this.customerAddress = undefined;
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewCustomer() {

    this.isFieldDisabled = false;
    this.isCancelDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show first record
    } else {
      this.buttonLabel = "SAVE";
    }
  }
}
