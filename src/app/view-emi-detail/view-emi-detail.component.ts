import { Component, ViewChild, OnInit } from '@angular/core';
import { EmiDetailService } from "../add-emi-detail/emi-detail.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'view-emi-detail',
  templateUrl: './view-emi-detail.component.html',
  styleUrls: ['./view-emi-detail.component.css']
})
export class ViewEmiDetailComponent implements OnInit {

  emiDetails;

  displayedColumns = ['emi_date', 'vehicle_no', 'month_year', 'amount'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private emiDetailService: EmiDetailService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    this.emiDetailService.getEmiDetails().subscribe(response => {
      this.emiDetails = response.emi_details;
      // Format the date in required format
      for (let i = 0; i < this.emiDetails.length; i++) {
        this.emiDetails[i].emi_date = moment(this.emiDetails[i].emi_date).format('DD MMM YYYY');
      }
      this.dataSource = new MatTableDataSource<EMIDETAIL>(this.emiDetails);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showEmiDetails(emi) {

    if (emi != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { emi_id: emi.emi_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-emi-detail'], navigationExtras);
    } else {
      this.router.navigate(['/add-emi-detail']);
    }
  }
}

export interface EMIDETAIL {
  emi_id: number;
  emi_date: Date;
  veh_number: string;
  emi_month_year: string;
  emi_amount: number;
}