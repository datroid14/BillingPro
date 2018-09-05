import { Component, ViewChild, OnInit } from '@angular/core';
import { QuatationService } from "../create-quatation/quatation.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';

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

  constructor(private quatationService: QuatationService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {

    this.appService.showDrawer(true);

    this.quatationService.getQuatations().subscribe(response => {
      this.quatations = response.quatations;
      this.dataSource = new MatTableDataSource<QUATATION>(this.quatations);
      this.dataSource.paginator = this.paginator;
      console.log(this.quatations);
    },
      error => {
        console.log(error)
      });
  }

  /**
  * Set the paginator after the view init since this component will
  * be able to query its view for the initialized paginator.
  */
  ngAfterViewInit() {

  }

  showQuatationDetails(quatation) {

    if (quatation != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { quat_id: quatation.quat_id}
      };
      // Redirect it to View Product screen
      this.router.navigate(['/create-quatation'], navigationExtras);
    }
  }
}

export interface QUATATION {
  quat_id: number;
  quat_cust_name: string;
  quat_cust_address: string;
  quat_contact_person: string;
  quat_contact_no: string;
}

