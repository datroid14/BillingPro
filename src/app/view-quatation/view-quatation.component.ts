import { Component, ViewChild, OnInit } from '@angular/core';
import { QuatationService } from "../create-quatation/quatation.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'view-quatation',
  templateUrl: './view-quatation.component.html',
  styleUrls: ['./view-quatation.component.css']
})
export class ViewQuatationComponent implements OnInit {

  quatations;

  displayedColumns = ['date', 'customer', 'contact_person', 'contact'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private quatationService: QuatationService, private appService: AppService, private router: Router, private location: Location) {
  }

  ngOnInit() {
    this.appService.showDrawer(true);

    this.quatationService.getQuatations().subscribe(response => {
      this.quatations = response.quatations;
      for (let i = 0; i < this.quatations.length; i++) {
        this.quatations[i].quat_date = moment(this.quatations[i].quat_date).format('DD MMM YYYY');
      }
      this.dataSource = new MatTableDataSource<QUATATION>(this.quatations);
      this.dataSource.paginator = this.paginator;
      console.log(this.quatations);
    },
      error => {
        console.log(error)
      });
  }

  showQuatationDetails(quatation) {

    if (quatation != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { quat_id: quatation.quat_id}
      };
      // Redirect it to View Product screen
      this.router.navigate(['/create-quatation'], navigationExtras);
    } else {
      this.router.navigate(['/create-quatation']);
    }
  }

  back() {
    this.location.back();
  }
}

export interface QUATATION {
  quat_id: number;
  quat_date: Date;
  quat_cust_name: string;
  quat_cust_address: string;
  quat_contact_person: string;
  quat_contact_no: string;
}

