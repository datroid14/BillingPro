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
  isEditClicked: boolean;
  isDeleteDisabled: boolean;

  vendorId: number;
  vendorName: string;
  contactPerson: string;
  vendorAddress: string;
  contactNo: string;
  emailAddress: string;
  errorMessage: String;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private vendorService: VendorService, private appService: AppService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.vendorId = params["vend_id"];
      this.vendorName = params["vend_name"];
      this.contactPerson = params["vend_contact_person"];
      this.contactNo = params["vend_contact"];
      this.emailAddress = params["vend_email"];
      this.vendorAddress = params["vend_address"];
    });
    // Image paths
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
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
    
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearVendorFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;

    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      this.isDeleteDisabled = false;

      // Show first record
      const payload = { "data": { "vend_id": this.vendorId} };
      this.vendorService.getVendorById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.vendors != undefined && response.vendors.length > 0) {
            this.setVendorDetail(response.vendors[0]);
          }
        }
      },
        error => {
          console.log(error)
        });
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addVendor() {
    if (this.buttonLabel == "SAVE") {
      if (this.vendorName != undefined && this.vendorAddress != undefined && this.contactNo != undefined) {
        if (this.isEditClicked) {
          const updatePayload = { "data": { "vend_id": this.vendorId, "vend_name": this.vendorName, "vend_contact_person": this.contactPerson, "vend_contact": this.contactNo, "vend_email": this.emailAddress, "vend_address": this.vendorAddress } };
          this.vendorService.updateVendor(updatePayload).subscribe(response => {
            if (response.status == 200) {
              console.log("Update Vendor " + response);
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "vend_name": this.vendorName, "vend_contact_person": this.contactPerson, "vend_contact": this.contactNo, "vend_email": this.emailAddress, "vend_address": this.vendorAddress } };
          this.vendorService.addVendor(addPayload).subscribe(response => {
            if (response.status == 200) {
              console.log("Add Vendor " + response);
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

  removeVendor(vendor) {

  }

  clearVendorFields() {
    this.vendorName = undefined;
    this.contactNo = undefined;
    this.contactPerson = undefined;
    this.emailAddress = undefined;
    this.vendorAddress = undefined;
  }

  deleteVendor() {
    const deletePayload = { "data": { "vend_id": this.vendorId } };
    this.vendorService.deleteVendor(deletePayload).subscribe(response => {
      if (response.status == 200) {
        console.log("Delete vendor " + response);
        this.location.back();
      }
    },
      error => {
        console.log(error)
      });
  }

  setVendorDetail(vendor) {
    this.vendorName = vendor.vend_name;
    this.vendorAddress = vendor.vend_address;
    this.contactNo = vendor.vend_contact;
    this.contactPerson = vendor.vend_contact_person;
    this.emailAddress = vendor.vend_email;
  }
}
