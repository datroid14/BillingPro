import { Component, ViewChild, OnInit } from '@angular/core';
import { VehicleService } from "../add-vehicle/vehicle.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';

@Component({
  selector: 'view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  vehicles;

  displayedColumns = ['name', 'number', 'desc'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private vehicleService: VehicleService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {

    this.appService.showDrawer(true);

    this.vehicleService.getVehicles().subscribe(response => {
      this.vehicles = response.vehicles;
      this.dataSource = new MatTableDataSource<VEHICLE>(this.vehicles);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showVehicleDetails(vehicle) {

    if (vehicle != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { veh_id : vehicle.veh_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-vehicle'], navigationExtras);
    } else {
      this.router.navigate(['/add-vehicle']);
    }
  }
}

export interface VEHICLE {
  veh_id: number;
  veh_name: string;
  veh_number: string;
  veh_desc: string;
}

