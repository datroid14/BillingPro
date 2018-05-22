import { Component, OnInit } from '@angular/core';
import { VendorService } from "../add-vendor/vendor.service";
import { Vendor } from '../add-vendor/vendor';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent {

  vendors;
  vendorName: string;
  vendorAddress: string;
  contactNo: string;
  emailAddress: string;
  errorMessage: String;

  public constructor(private route: ActivatedRoute, private vendorService: VendorService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.vendorName = params["vend_name"];
      this.contactNo = params["vend_contact"];
      this.emailAddress = params["vend_email"];
      this.vendorAddress = params["vend_address"];
    });
  }

  addVendor() {
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
  }

  removeVendor(vendor) {

  }

  clearFields() {
    this.vendorName = "";
    this.contactNo = "";
    this.emailAddress = ""
    this.vendorAddress = "";
  }
}
