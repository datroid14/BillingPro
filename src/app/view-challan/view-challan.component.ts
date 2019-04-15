import { Component, ViewChild, OnInit } from '@angular/core';
import { ChallanService } from "../create-challan/challan.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'view-chalan',
  templateUrl: './view-challan.component.html',
  styleUrls: ['./view-challan.component.css']
})

export class ViewChallanComponent implements OnInit {

  challans;

  displayedColumns = ['name', 'address', 'material', 'unit', 'quantity', 'vehicle'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private challanService: ChallanService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {

    this.appService.showDrawer(true);

    this.challanService.getChallans().subscribe(response => {
      this.challans = response.challans;
      for (let i = 0; i < this.challans.length; i++) {
        this.challans[i].cheque_date = moment(this.challans[i].cheque_date).format('DD MMM YYYY');
      }
      this.dataSource = new MatTableDataSource<CHALLAN>(this.challans);
      this.dataSource.paginator = this.paginator;

    },
      error => {
        console.log(error)
      });
  }

  showChallanDetails(challan) {
    if (challan != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { chal_id: challan.chal_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/create-challan'], navigationExtras);
    } else {
      this.router.navigate(['/create-challan']);
    }
  }
}

export interface CHALLAN {
  chal_id: number;
  chal_cust_name: string;
  chal_cust_address: string;
  chal_prod_name: string;
  chal_prod_unit: string;
  chal_quantity: number;
  chal_veh_no: string;
}

