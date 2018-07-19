import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ChequeEntryService } from "../add-cheque-details/cheque-entry.service";
import { CustomerService } from "../add-customer/customer.service";
import { Location } from '@angular/common';
import { AppService } from "../app.service"

@Component({
  selector: 'add-cheque-details',
  templateUrl: './add-cheque-details.component.html',
  styleUrls: ['./add-cheque-details.component.css']
})
export class AddChequeDetailsComponent implements OnInit {

  buttonLabel: string;
  isFieldDisabled: boolean;
  isCancelDisabled: boolean;
  isEditClicked: boolean;
  isDeleteDisabled: boolean;

  chequeEntries = [];
  customers;
  chequeEntryId: number;
  chequeDate: string;
  customerName: string;
  chequeNumber: string;
  chequeAmount: number;
  accountNo: number;
  chequeCustomerId: number;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private chequeEntryService: ChequeEntryService,
    private customerService: CustomerService, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.chequeEntryId = params["cheque_entry_id"];
      this.chequeDate = params["cheque_date"];
      this.chequeCustomerId = params["cheque_cust_id"];
      this.customerName = params["cust_name"];
      this.chequeNumber = params["cheque_number"];
      this.chequeAmount = params["cheque_amount"];
      this.accountNo = params["account_no"];
    });
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";

    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.customers;
    },
      error => {
        console.log(error)
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
      this.buttonLabel = "SAVE";
    }
  }

  addChequeEntry() {
    if (this.buttonLabel == "SAVE") {
      if (this.chequeDate != undefined && this.customerName != undefined && this.chequeNumber != undefined && this.chequeAmount != undefined && this.accountNo != undefined) {
        this.isDeleteDisabled = false;

        if (this.isEditClicked) {
          const updatePayload = { "data": { "cheque_entry_id": this.chequeEntryId, "cheque_date": "2018-05-27", "cheque_number": this.chequeNumber, "cheque_amount": this.chequeAmount, "account_no": this.accountNo, "cheque_cust_id": this.chequeCustomerId } };
          this.chequeEntryService.updateChequeEntry(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "cheque_date": this.chequeDate, "cheque_number": this.chequeNumber, "cheque_amount": this.chequeAmount, "account_no": this.accountNo, "cheque_cust_id": this.chequeCustomerId } };
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
    this.accountNo = undefined;
  }

  deleteChequeEntry() {
    const deletePayload = { "data": { "cheque_entry_id": this.chequeEntryId } };
    this.chequeEntryService.deleteChequeEntry(deletePayload).subscribe(response => {
      if (response.status == 200) {
        this.location.back();
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
    this.chequeNumber = cheque_entry.cheque_number;
    this.chequeAmount = cheque_entry.cheque_amount;
    this.accountNo = cheque_entry.account_no;
  }

  setCustomerDetail(customer){
    this.chequeCustomerId = customer.cust_id;
  }
}
