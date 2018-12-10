import { Component, OnInit } from '@angular/core';
import { AccountService } from "../add-account/account.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  accounts;
  accountId: number;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
  accountType: string;

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

  public constructor(private route: ActivatedRoute, private appService: AppService, private accountService: AccountService,
    private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.accountId = params["account_id"];
    });
    // Image paths
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
    if (this.accountId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getAccountDetailById();
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

  addAccount() {
    if (this.buttonLabel == "SAVE") {
      if (this.accountNumber != undefined && this.bankName != undefined && this.bankAddress != undefined) {
        if (this.isEditClicked) {
          this.isEditClicked = false;
          const updatePayload = { "data": { "account_id": this.accountId, "account_number": this.accountNumber, "bank_name": this.bankName, "bank_address": this.bankAddress, "account_type": this.accountType } };
          this.accountService.updateAccount(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "account_number": this.accountNumber, "bank_name": this.bankName, "bank_address": this.bankAddress, "account_type": this.accountType } };
          this.accountService.addAccount(addPayload).subscribe(response => {
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
      this.isEditClicked = true;
      this.buttonLabel = "SAVE";
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
      this.isDeleteDisabled = true;
    }
  }

  clearFields() {
    this.accountNumber = undefined;
    this.bankName = undefined;
    this.bankAddress = undefined;
    this.accountType = undefined;
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewAccount() {
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
      this.getAccountDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  deleteCustomer() {
    const deletePayload = { "data": { "account_id": this.accountId } };
    this.accountService.deleteAccount(deletePayload).subscribe(response => {
      if (response.status == 200) {
        console.log("Delete customer " + response.message);
        this.location.back();
      } else if (response.status == 501) {
        console.log(response.message);
      }
    },
      error => {
        console.log(error)
      });
  }

  getAccountDetailById() {
    if (this.accountId != undefined) {
      const payload = { "data": { "account_id": this.accountId } };
      this.accountService.getAccountById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.account_details != undefined && response.account_details.length > 0) {
            this.setCustomerDetail(response.account_details[0]);
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

  setCustomerDetail(customer) {

    this.accountNumber = customer.account_number;
    this.bankName = customer.bank_name;
    this.bankAddress = customer.bank_address;
    this.accountType = customer.account_type;
  }
}
