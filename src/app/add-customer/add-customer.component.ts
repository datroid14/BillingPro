import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../add-customer/customer.service";
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

  isDeleteDisabled: boolean;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private customerService: CustomerService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.customerId = params["cust_id"];
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

    // Get details of customer by id fetched from view customer
    this.getCustomerDetailById();
  }

  addCustomer() {
    if (this.buttonLabel == "SAVE") {
      if (this.customerName != undefined && this.customerAddress != undefined && this.contactNo != undefined) {
        if (this.isEditClicked) {
          this.isEditClicked = false;
          const updatePayload = { "data": { "cust_id": this.customerId, "cust_name": this.customerName, "cust_contact_person": this.contactPerson, "cust_contact": this.contactNo, "cust_email": this.emailAddress, "cust_address": this.customerAddress } };
          this.customerService.updateCustomer(updatePayload).subscribe(response => {
            if (response.status == 200) {
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
      this.isDeleteDisabled = true;
    }
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
      this.getCustomerDetailById();
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

  getCustomerDetailById(){

    const payload = { "data": { "cust_id": this.customerId } };
      this.customerService.getCustomerById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.customers != undefined && response.customers.length > 0) {
            this.setCustomerDetail(response.customers[0]);
          }
        }
      },
        error => {
          console.log(error)
        });
  }

  setCustomerDetail(customer){

    this.customerName = customer.cust_name;
    this.customerAddress = customer.cust_address;
    this.contactNo = customer.cust_contact;
    this.contactPerson = customer.cust_contact_person;
    this.emailAddress = customer.cust_email;
  }
}
