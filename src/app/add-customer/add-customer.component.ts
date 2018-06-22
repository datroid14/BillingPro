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
  customerId: number;
  customerName: string;
  contactPerson: string;
  customerAddress: string;
  contactNo: string;
  emailAddress: string;

  // Flag for enabling/disabling all fields in view mode
  isFieldDisabled: boolean;

  // Flag for enabling/disabling cancel button
  isCancelDisabled: boolean;

  // Change button label as per requirement
  buttonLabel: string;

  isEditClicked: boolean;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private customerService: CustomerService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.customerId = params["cust_id"];
      this.customerName = params["cust_name"];
      this.contactPerson = params["cust_contact_person"];
      this.contactNo = params["cust_contact"];
      this.emailAddress = params["cust_email"];
      this.customerAddress = params["cust_address"];
    });
    // Image paths
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {

    this.appService.showDrawer(true);

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
        if (this.isEditClicked) {
          this.isEditClicked = false;
          const updatePayload = { "data": { "cust_id": this.customerId, "cust_name": this.customerName, "cust_contact_person": this.contactPerson, "cust_contact": this.contactNo, "cust_email": this.emailAddress, "cust_address": this.customerAddress } };
          this.customerService.updateCustomer(updatePayload).subscribe(response => {
            if (response.status == 200) {
              console.log("Update customer " + response);
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "cust_name": this.customerName, "cust_contact_person": this.contactPerson, "cust_contact": this.contactNo, "cust_email": this.emailAddress, "cust_address": this.customerAddress } };
          this.customerService.addCustomer(addPayload).subscribe(response => {
            if (response.status == 200) {
              console.log("Add customer " + response);
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
    }
  }

  removeCustomer(customer) {

  }

  clearFields() {
    this.customerName = undefined;
    this.contactNo = undefined;
    this.contactPerson = undefined;
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

  deleteCustomer() {
    const deletePayload = { "data": { "cust_id": this.customerId } };
    this.customerService.deleteCustomer(deletePayload).subscribe(response => {
      if (response.status == 200) {
        console.log("Delete customer " + response);
        this.location.back();
      }
    },
      error => {
        console.log(error)
      });
  }
}
