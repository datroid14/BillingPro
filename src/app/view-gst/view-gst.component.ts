import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GSTService } from '../add-gst/gst.service';
import { AppService } from '../app.service';

@Component({
  selector: 'view-gst',
  templateUrl: './view-gst.component.html',
  styleUrls: ['./view-gst.component.css']
})
export class ViewGstComponent implements OnInit {

  gst_details;
  displayedColumns = ['hsn', 'percentage', 'desc'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private gstService: GSTService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {

    this.appService.showDrawer(true);

    this.gstService.getGSTDetails().subscribe(response => {
      this.gst_details = response.gst_details;
      console.log("GST "+this.gst_details);
      this.dataSource = new MatTableDataSource<GST>(this.gst_details);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showGSTDetails(gst) {

    if (gst != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { gst_id : gst.gst_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-gst'], navigationExtras);
    } else {
      this.router.navigate(['/add-gst']);
    }
  }
}

export interface GST {
  gst_id: number;
  gst_name: string;
  gst_percentage: string;
  gst_desc: string;
  
}
