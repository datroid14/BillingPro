import { Component, ViewChild, OnInit } from '@angular/core';
import { CardDetailService } from "../add-card-detail/card-detail.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'view-card-detail',
  templateUrl: './view-card-detail.component.html',
  styleUrls: ['./view-card-detail.component.css']
})
export class ViewCardDetailComponent implements OnInit {

  cardDetails;

  displayedColumns = ['card_date', 'vehicle_no', 'rto_pune', 'rto_pcmc'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cardDetailService: CardDetailService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);
    
    this.cardDetailService.getCardDetails().subscribe(response => {
      this.cardDetails = response.card_details;
      // Format the date in required format
      for (let i = 0; i < this.cardDetails.length; i++) {
        this.cardDetails[i].card_date = moment(this.cardDetails[i].card_date).format('DD MMM YYYY');
      }
      this.dataSource = new MatTableDataSource<CARDDETAIL>(this.cardDetails);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error)
      });
  }

  showCardDetails(card) {

    if (card != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { card_id: card.card_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-card-detail'], navigationExtras);
    } else {
      this.router.navigate(['/add-card-detail']);
    }
  }
}

export interface CARDDETAIL {
  card_date: Date;
  vehicle_id: number;
  rto_pune_amount: number;
  rto_pcmc_amount: number;
  police_shirval_amount: number;
  police_chakan_amount: number;
  police_other_amount: number;
}

