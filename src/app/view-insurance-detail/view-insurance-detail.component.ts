import { Component, ViewChild, OnInit } from '@angular/core';
import { InsuranceService } from "../add-insurance-detail/insurance.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'view-insurance-detail',
  templateUrl: './view-insurance-detail.component.html',
  styleUrls: ['./view-insurance-detail.component.css']
})
export class ViewInsuranceDetailComponent implements OnInit {

  insurance_details;

  displayedColumns = ['policy_no', 'issued_date', 'vehicle_no', 'amount', 'company'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private insuranceService: InsuranceService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);
    
    this.insuranceService.getInsuranceDetails().subscribe(response => {
      this.insurance_details = response.insurance_details;
      // Format the date in required format
      for (let i = 0; i < this.insurance_details.length; i++) {
        this.insurance_details[i].policy_issued_date = moment(this.insurance_details[i].policy_issued_date).format('DD MMM YYYY');
      }
      this.dataSource = new MatTableDataSource<INSURANCE>(this.insurance_details);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showInsuranceDetail(insurance_detail) {

    if (insurance_detail != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { insurance_id: insurance_detail.insurance_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-insurance-detail'], navigationExtras);
    } else {
      this.router.navigate(['/add-insurance-detail']);
    }
  }
}

export interface INSURANCE {
  insurance_id: number;
  policy_no: string;
  issued_date: string;
  vehicle_no: string;
  premium_amount: number;
  premium_company: string;
}
