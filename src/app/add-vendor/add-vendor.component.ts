import { Component, OnInit } from '@angular/core';
import { VendorService } from "../add-vendor/vendor.service";
import { Vendor } from '../add-vendor/vendor';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {

  vendors;

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;

  vendorName: string;
  vendorAddress: string;
  contactNo: string;
  emailAddress: string;
  errorMessage: String;

  public constructor(private route: ActivatedRoute, private vendorService: VendorService, private appService: AppService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.vendorName = params["vend_name"];
      this.contactNo = params["vend_contact"];
      this.emailAddress = params["vend_email"];
      this.vendorAddress = params["vend_address"];
    });
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    // Disable all fields for view mode
    this.isFieldDisabled = true;

    // Disable cancel button initially
    this.isCancelDisabled = true;

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

  addNewVendor() {
    this.isFieldDisabled = false;
    this.isCancelDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearVendorFields();
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

  addVendor() {
    if (this.buttonLabel == "SAVE") {
      if (this.vendorName != undefined && this.vendorAddress != undefined && this.contactNo != undefined) {
        const payload = { "data": { "vend_name": this.vendorName, "vend_contact": this.contactNo, "vend_email": this.emailAddress, "vend_address": this.vendorAddress } };
        this.vendorService.addVendor(payload).subscribe(response => {
          if (response.status == 200) {
            console.log("Add Vendor " + response);
          }
        },
          error => {
            console.log(error)
          });
        this.location.back();
      } else {
        alert('Please fill all mandatory fields');
      }
    } else {
      this.buttonLabel = "SAVE";
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
    }
  }

  removeVendor(vendor) {

  }

  clearVendorFields() {
    this.vendorName = undefined;
    this.contactNo = undefined;
    this.emailAddress = undefined;
    this.vendorAddress = undefined;
  }
}
