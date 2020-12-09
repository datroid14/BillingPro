import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { Invoice } from '../create-invoice/invoice';
import { Purchase } from '../add-purchase/purchase';
import { Maintenance } from '../add-maintenance-detail/maintenance';
import { DieselEntry } from '../add-diesel-entry/diesel-entry';
import { EmiDetail } from '../add-emi-detail/emi-detail';
import { Insurance } from '../add-insurance-detail/insurance';
import { CardDetail } from '../add-card-detail/card-detail';
import { TripDetail } from '../add-trip-detail/trip-detail';

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css']
})
export class ShowInventoryComponent implements OnInit {

  invoices: Invoice[];
  purchases: Purchase[];
  maintenanceDetails: Maintenance[];
  dieselEntries: DieselEntry[];
  emiDetails: EmiDetail[];
  insuranceDetails: Insurance[];
  tripDetails: TripDetail[];
  cardDetails: CardDetail[];
  invoiceTotal = 0;
  purchaseTotal = 0;
  maintenanceTotal = 0;
  dieselTotal = 0;
  emiTotal = 0;
  insuranceTotal = 0;
  tripTotal = 0;
  cardTotal = 0;
  debitTotal = 0;
  selectedMonth = 0;
  selectedYear = 0;

  months: Month[] = [{'index': 1, 'value': 'January'}, {'index': 2, 'value': 'February'}, {'index': 3, 'value': 'March'},
  {'index': 4, 'value': 'April'}, {'index': 5, 'value': 'May'}, {'index': 6, 'value': 'June'}, {'index': 7, 'value': 'July'},
  {'index': 8, 'value': 'August'}, {'index': 9, 'value': 'September'}, {'index': 10, 'value': 'October'},
  {'index': 11, 'value': 'November'}, {'index': 12, 'value': 'December'}];

  years: Year[] = [{'value': 2018}, {'value': 2019}, {'value': 2020}];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  getInventoryDetails() {
    this.debitTotal = 0;
    this.invoiceTotal = 0;
    this.purchaseTotal = 0;
    this.maintenanceTotal = 0;
    this.dieselTotal = 0;
    this.emiTotal = 0;
    this.insuranceTotal = 0;
    this.tripTotal = 0;
    this.cardTotal = 0;

    const payload = {'data': {'selected_month': this.selectedMonth, 'selected_year': this.selectedYear }};

    this.dashboardService.getInventoryDetails(payload).subscribe(response => {
      this.invoices = response.inventory.invoices;
      this.purchases = response.inventory.purchases;
      this.maintenanceDetails = response.inventory.maintenance_details;
      this.dieselEntries = response.inventory.diesel_entries;
      this.emiDetails = response.inventory.emi_details;
      this.insuranceDetails = response.inventory.insurance_details;
      this.tripDetails = response.inventory.trip_details;
      this.cardDetails = response.inventory.card_details;

      for (let i = 0; i < this.invoices.length; i++) {
        this.invoiceTotal = this.invoiceTotal + this.invoices[i].inv_total_amount;
      }

      for (let j = 0; j < this.purchases.length; j++) {
        this.purchaseTotal = this.purchaseTotal + this.purchases[j].pur_total_amount;
      }
      for (let k = 0; k < this.maintenanceDetails.length; k++) {
        this.maintenanceTotal = this.maintenanceTotal + this.maintenanceDetails[k].maint_invoice_amount;
      }

      for (let l = 0; l < this.dieselEntries.length; l++) {
        this.dieselTotal = this.dieselTotal + this.dieselEntries[l].diesel_amount;
      }

      for (let m = 0; m < this.emiDetails.length; m++) {
        this.emiTotal = this.emiTotal + this.emiDetails[m].emi_amount;
      }

      for (let n = 0; n < this.insuranceDetails.length; n++) {
        this.insuranceTotal = this.insuranceTotal + this.insuranceDetails[n].premium_amount;
      }

      for (let p = 0; p < this.tripDetails.length; p++) {
        this.tripTotal = this.tripTotal + this.tripDetails[p].driver_expenses_amount +
        this.tripDetails[p].diesel_expenses_amount +  this.tripDetails[p].toll_charges +
        this.tripDetails[p].worker_charges + this.tripDetails[p].washing_charges +
        this.tripDetails[p].maintenance_charges;
      }

      for (let q = 0; q < this.cardDetails.length; q++) {
        this.cardTotal = this.cardTotal + this.cardDetails[q].rto_pune_amount +
        this.cardDetails[q].rto_pcmc_amount + this.cardDetails[q].police_shirval_amount +
        this.cardDetails[q].police_chakan_amount + this.cardDetails[q].police_other_amount;
      }

      this.debitTotal = this.purchaseTotal + this.maintenanceTotal + this.dieselTotal +
      this.emiTotal + this.insuranceTotal + this.tripTotal + this.cardTotal;
    },
      error => {
        console.log(error);
      });
  }

  setMonthSelected(month: number) {
    this.selectedMonth = month;
    if(this.selectedMonth !== 0 && this.selectedYear !== 0) {
      this.getInventoryDetails();
    }
  }

  setYearSelected(year: number) {
    this.selectedYear = year;
    if (this.selectedMonth !== 0 && this.selectedYear !== 0) {
      this.getInventoryDetails();
    }
  }
}

interface Month {
  index: number;
  value: string;
}

interface Year {
  value: number;
}

