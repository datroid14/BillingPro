import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GSTService } from "../add-gst/gst.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"

@Component({
  selector: 'add-gst',
  templateUrl: './add-gst.component.html',
  styleUrls: ['./add-gst.component.css']
})
export class AddGstComponent implements OnInit {

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  isDeleteDisabled: boolean;

  gstDetails = [];
  gstId: number;
  gstHSN: string;
  gstPercentage: number;
  gstDesc: string;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private gstService: GSTService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.gstId = params["gst_id"];
      this.gstHSN = params["gst_hsn"];
      this.gstPercentage = params["gst_percentage"];
      this.gstDesc = params["gst_desc"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();
  }

  showUIChanges() {
    if (this.gstId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getGSTDetailById();
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

  addNewGSTDetail() {
    this.isFieldDisabled = false;
    this.isCancelDisabled = false;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearGSTFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      this.isDeleteDisabled = false;

      this.getGSTDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addGSTDetail() {
    if (this.buttonLabel == "SAVE") {
      if (this.gstHSN != undefined && this.gstPercentage != undefined) {
        if (this.gstDesc == undefined) {
          this.gstDesc = "";
        }

        if (this.isEditClicked) {
          const updatePayload = { "data": { "gst_id": this.gstId, "gst_hsn": this.gstHSN, "gst_percentage": this.gstPercentage, "gst_desc": this.gstDesc } };
          this.gstService.updateGSTDetails(updatePayload).subscribe(response => {
            if (response.status == 200) {
              console.log("Add product " + response);
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "gst_hsn": this.gstHSN, "gst_percentage": this.gstPercentage, "gst_desc": this.gstDesc } };
          this.gstService.addGSTDetails(addPayload).subscribe(response => {
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

  clearGSTFields() {
    this.gstHSN = undefined;
    this.gstPercentage = undefined;
    this.gstDesc = undefined;
  }

  deleteGSTDetail() {
    const deletePayload = { "data": { "gst_id": this.gstId } };
    this.gstService.deleteGSTDetails(deletePayload).subscribe(response => {
      if (response.status == 200) {
        console.log("Delete vendor " + response);
        this.location.back();
      } else if (response.status == 501) {
        console.log(response.message);
      }
    },
      error => {
        console.log(error)
      });
  }

  setGSTDetail(gst) {
    this.gstHSN = gst.gst_hsn;
    this.gstPercentage = gst.gst_percentage;
    this.gstDesc = gst.gst_desc;
  }

  getGSTDetailById() {
    if (this.gstId != undefined) {
      const payload = { "data": { "gst_id": this.gstId } };
      this.gstService.getGSTDetailsById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.gst_details != undefined && response.gst_details.length > 0) {
            this.setGSTDetail(response.gst_details[0]);
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
