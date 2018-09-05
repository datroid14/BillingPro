import { Component, ViewChild, OnInit } from '@angular/core';
import { ChequeEntryService } from "../add-cheque-details/cheque-entry.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';

@Component({
  selector: 'view-cheque-details',
  templateUrl: './view-cheque-details.component.html',
  styleUrls: ['./view-cheque-details.component.css']
})
export class ViewChequeDetailsComponent implements OnInit {

  chequeEntries;
  isLogin = false;

  displayedColumns = ['date', 'name', 'cheque', 'amount'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private chequeEntryService: ChequeEntryService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {

    this.appService.showDrawer(true);

    this.chequeEntryService.getChequeEntries().subscribe(response => {
      this.chequeEntries = response.chequeEntries;
      if(this.chequeEntries.length > 0){
      this.dataSource = new MatTableDataSource<CHEQUEENTRY>(this.chequeEntries);
      this.dataSource.paginator = this.paginator;
      }else{
        this.showChequeEntryDetails(undefined);
      }
    },
      error => {
        console.log(error)
      });
  }

  showChequeEntryDetails(chequeEntry) {
    if (chequeEntry != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: chequeEntry
      };
      // Redirect it to Add Cheque Entry screen
      this.router.navigate(['/add-cheque-details'], navigationExtras);
    }else{
      // Redirect it to Add Cheque Entry screen without data
      this.router.navigate(['/add-cheque-details']);
    }
  }
}

export interface CHEQUEENTRY {
  cheque_entry_id: number;
  cheque_date: Date;
  cheque_name: string;
  cheque_number: string;
  cheque_amount: number;
}
