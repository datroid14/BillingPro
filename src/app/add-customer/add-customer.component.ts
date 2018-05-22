import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../add-customer/customer.service";
import { Customer } from '../add-customer/customer';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

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
  isAddDisabled: boolean;
  buttonLabel: string;

  public constructor(private route: ActivatedRoute, private customerService: CustomerService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.customerName = params["cust_name"];
      this.contactNo = params["cust_contact"];
      this.emailAddress = params["cust_email"];
      this.customerAddress = params["cust_address"];
    });
  }

  ngOnInit() {
    this.isFieldDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
  }

  addCustomer() {

    if (this.buttonLabel == ("EDIT")) {
      this.isEditMode = true;
      this.isAddDisabled = true;
      this.isFieldDisabled = !this.isFieldDisabled;
      this.changeButtonLabel(this.isFieldDisabled);
    } else {
      if (this.customerName != undefined && this.customerAddress != undefined && this.contactNo != undefined) {
        const payload = { "data": { "cust_name": this.customerName, "cust_contact": this.contactNo, "cust_email": this.emailAddress, "cust_address": this.customerAddress } };
        this.customerService.addCustomer(payload).subscribe(response => {
          if (response.status == 200) {
              
          }
          console.log("Add customer " + response);
        },
          error => {
            console.log(error)
          });
        this.location.back();
      } else {
        alert('Please fill all mandatory fields');
      }
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

    this.clearFields();
    this.isEditMode = false;
    this.isFieldDisabled = !this.isFieldDisabled;
    this.changeButtonLabel(this.isFieldDisabled);
    this.isAddDisabled = true;
  }

  cancel() {
    if (this.isEditMode) {
      this.isEditMode = false;
    } else {
      // Show last fetched record
    }
    this.isAddDisabled = false;
    this.isFieldDisabled = !this.isFieldDisabled;
    this.changeButtonLabel(this.isFieldDisabled);
  }
}
