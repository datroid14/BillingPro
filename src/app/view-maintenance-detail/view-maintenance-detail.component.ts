import { Component, ViewChild, OnInit } from '@angular/core';
import { MaintenanceService } from "../add-maintenance-detail/maintenance.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'view-maintenance-detail',
  templateUrl: './view-maintenance-detail.component.html',
  styleUrls: ['./view-maintenance-detail.component.css']
})
export class ViewMaintenanceDetailComponent implements OnInit {

  maintenance_details;

  displayedColumns = ['invoice_date', 'invoice_no', 'supplier', 'vehicle_no', 'amount'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private maintenanceService: MaintenanceService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);
    
    this.maintenanceService.getMaintenanceDetails().subscribe(response => {
      this.maintenance_details = response.maintenance_details;
      // Format the date in required format
      for (let i = 0; i < this.maintenance_details.length; i++) {
        this.maintenance_details[i].maint_invoice_date = moment(this.maintenance_details[i].policy_issued_date).format('DD MMM YYYY');
      }
      this.dataSource = new MatTableDataSource<INSURANCE>(this.maintenance_details);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showMaintenanceDetail(maintenance_detail) {

    if (maintenance_detail != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { maintenance_id: maintenance_detail.maint_invoice_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-maintenance-detail'], navigationExtras);
    } else {
      this.router.navigate(['/add-maintenance-detail']);
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
