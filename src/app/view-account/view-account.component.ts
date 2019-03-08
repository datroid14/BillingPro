import { Component, ViewChild, OnInit } from '@angular/core';
import { AccountService } from "../add-account/account.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';

@Component({
  selector: 'view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {

  accountDetails;

  displayedColumns = ['account_number', 'bank_name', 'bank_address', 'account_type'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private accountService: AccountService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);
    this.accountService.getAccounts().subscribe(response => {
      this.accountDetails = response.account_details;
      this.dataSource = new MatTableDataSource<ACCOUNT>(this.accountDetails);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showAccountDetails(account) {
    if (account != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { account_id: account.account_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-account'], navigationExtras);
    } else {
      this.router.navigate(['/add-account']);
    }
  }
}

export interface ACCOUNT {
  acc_id: number;
  acc_number: number;
  bank_name: string;
  bank_address: string;
  acc_type: string;
}

