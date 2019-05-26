import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ChequeEntryService } from "../add-cheque-detail/cheque-entry.service";
import { CustomerService } from "../add-customer/customer.service";
import { AccountService } from "../add-account/account.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"
import * as moment from 'moment';
import { ACCOUNT } from '../view-account/view-account.component';

@Component({
  selector: 'add-cheque-detail',
  templateUrl: './add-cheque-detail.component.html',
  styleUrls: ['./add-cheque-detail.component.css']
})
export class AddChequeDetailsComponent implements OnInit {

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  isDeleteDisabled: boolean;

  chequeEntries = [];
  customers;
  accounts;
  chequeEntryId: number;
  chequeDate: string;
  customerName: string;
  customerAddress: string;
  chequeNumber: string;
  chequeAmount: number;
  accountId: number;
  accountNo: string;
  bankDetail: string;
  clearenceDate: string;
  chequeCustomerId: number;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private chequeEntryService: ChequeEntryService,
    private customerService: CustomerService, private accountService: AccountService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.chequeEntryId = params["cheque_entry_id"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.customers;
    },
      error => {
        console.log(error)
      });

      this.accountService.getAccounts().subscribe(response => {
        this.accounts = response.account_details;
      },
        error => {
          console.log(error)
        });

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();

  }

  showUIChanges() {
    if (this.chequeEntryId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getChequeEntryById();
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

  addNewChequeEntry() {
    this.isFieldDisabled = false;
    this.isCancelDisabled = false;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearChequeEntryFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = false;

    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getChequeEntryById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addChequeEntry() {
    if (this.buttonLabel == "SAVE") {
      if (this.chequeDate != undefined && this.customerName != undefined && this.chequeNumber != undefined && this.chequeAmount != undefined && this.accountId != undefined) {
        this.isDeleteDisabled = false;
        var formattedChequeDate = moment(this.chequeDate).format('YYYY-MM-DD');
        var formattedClearenceDate = moment(this.clearenceDate).format('YYYY-MM-DD');
        if (this.isEditClicked) {
          const updatePayload = { "data": { "cheque_entry_id": this.chequeEntryId, "cheque_date": formattedChequeDate, "cheque_number": this.chequeNumber, "cheque_amount": this.chequeAmount, "account_id": this.accountId, "cheque_clearence_date":formattedClearenceDate, "cheque_cust_id": this.chequeCustomerId } };
          this.chequeEntryService.updateChequeEntry(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "cheque_date": formattedChequeDate, "cheque_number": this.chequeNumber, "cheque_amount": this.chequeAmount, "account_id": this.accountId, "cheque_clearence_date":formattedClearenceDate, "cheque_cust_id": this.chequeCustomerId } };
          this.chequeEntryService.addChequeEntry(addPayload).subscribe(response => {
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

  clearChequeEntryFields() {
    this.chequeDate = undefined;
    this.customerName = undefined;
    this.chequeNumber = undefined;
    this.chequeAmount = undefined;
    this.clearenceDate = undefined;
    this.accountNo = undefined;
  }

  deleteChequeEntry() {
    const deletePayload = { "data": { "cheque_entry_id": this.chequeEntryId } };
    this.chequeEntryService.deleteChequeEntry(deletePayload).subscribe(response => {
      if (response.status == 200) {
        this.location.back();
      } else if (response.status == 501) {
        console.log(response.message);
      }
    },
      error => {
        console.log(error)
      });
  }

  setChequeEntryDetail(cheque_entry) {
    this.chequeDate = cheque_entry.cheque_date;
    this.chequeCustomerId = cheque_entry.cheque_cust_id;
    this.customerName = cheque_entry.cust_name;
    this.customerAddress = cheque_entry.cust_address;
    this.chequeNumber = cheque_entry.cheque_number;
    this.chequeAmount = cheque_entry.cheque_amount;
    this.clearenceDate = cheque_entry.cheque_clearence_date;
    this.accountId = cheque_entry.account_id;
    this.accountNo = cheque_entry.account_number;
    this.bankDetail = cheque_entry.bank_name + ", " + cheque_entry.bank_address;
  }

  setCustomerDetail(customer) {
    this.chequeCustomerId = customer.cust_id;
    this.customerAddress = customer.cust_address;
  }

  getChequeEntryById() {
    if (this.chequeEntryId != undefined) {
      const payload = { "data": { "cheque_entry_id": this.chequeEntryId } };
      this.chequeEntryService.getChequeEntryById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.chequeEntries != undefined && response.chequeEntries.length > 0) {
            this.setChequeEntryDetail(response.chequeEntries[0]);
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

  setAccountDetail(account) {
    this.accountId = account.account_id;
    this.bankDetail = account.bank_name + ", " + account.bank_address;
  }
}
