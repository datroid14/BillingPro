import { Component, ViewChild, OnInit } from '@angular/core';
import { TripDetailService } from "../add-trip-detail/trip-detail.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'view-trip-detail',
  templateUrl: './view-trip-detail.component.html',
  styleUrls: ['./view-trip-detail.component.css']
})
export class ViewTripDetailComponent implements OnInit {

  tripDetails;

  displayedColumns = ['trip_date', 'vehicle_no', 'source', 'destination', 'qty'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tripDetailService: TripDetailService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);
    debugger;
    this.tripDetailService.getTripDetails().subscribe(response => {
      this.tripDetails = response.trip_details;
      // Format the date in required format
      for (let i = 0; i < this.tripDetails.length; i++) {
        this.tripDetails[i].trip_date = moment(this.tripDetails[i].trip_date).format('DD MMM YYYY');
      }
      this.dataSource = new MatTableDataSource<TRIPDETAIL>(this.tripDetails);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showTripDetails(trip) {

    if (trip != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { trip_id: trip.trip_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-trip-detail'], navigationExtras);
    } else {
      this.router.navigate(['/add-trip-detail']);
    }
  }
}

export interface TRIPDETAIL {
  trip_id: number;
  trip_date: Date;
  veh_id: number;
  loading_place: string;
  unloading_place: string;
  material_qty: number;
  driver_id: number;
  driver_expenses_amount: number;
  diesel_expenses_amount: string;
  toll_charges: number;
  worker_charges: number;
  washing_charges: number;
  maintenance_charges: string;
}