import { Component, ViewChild, OnInit } from '@angular/core';
import { DieselEntryService } from "../add-diesel-entry/diesel-entry.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'view-diesel-entry',
  templateUrl: './view-diesel-entry.component.html',
  styleUrls: ['./view-diesel-entry.component.css']
})
export class ViewDieselEntryComponent implements OnInit {

  dieselEntries;
  isLogin = false;

  displayedColumns = ['date', 'name', 'quantity', 'amount'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dieselEntryService: DieselEntryService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.appService.showDrawer(true);

    this.dieselEntryService.getDieselEntries().subscribe(response => {
      this.dieselEntries = response.dieselEntries;
      for (let i = 0; i < this.dieselEntries.length; i++) {
        this.dieselEntries[i].diesel_filling_date = moment(this.dieselEntries[i].diesel_filling_date).format('DD MMM YYYY');
      }
        this.dataSource = new MatTableDataSource<DIESELENTRY>(this.dieselEntries);
        this.dataSource.paginator = this.paginator;      
    },
      error => {
        console.log(error)
      });
  }

  showDieselEntryDetails(dieselEntry) {
    if (dieselEntry != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: {diesel_entry_id : dieselEntry.diesel_entry_id }
      };
      // Redirect it to Add Cheque Entry screen
      this.router.navigate(['/add-diesel-entry'], navigationExtras);
    } else {
      // Redirect it to Add Cheque Entry screen without data
      this.router.navigate(['/add-diesel-entry']);
    }
  }
}

export interface DIESELENTRY {
  diesel_entry_id: number;
  diesel_filling_date: Date;
  emp_id: number;
  diesel_qty: number;
  diesel_amount: number;
}
