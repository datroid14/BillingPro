import { Component, OnInit } from '@angular/core';
import { CardDetailService } from "../add-card-detail/card-detail.service";
import { VehicleService } from "../add-vehicle/vehicle.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'add-card-detail',
  templateUrl: './add-card-detail.component.html',
  styleUrls: ['./add-card-detail.component.css']
})
export class AddCardDetailComponent implements OnInit {

  cardDetails;
  vehicles;

  cardId: number;
  cardDate: Date;
  vehicleId: number;
  vehicleNumber: string;
  rtoPuneAmount: number;
  rtoPCMCAmount: number;
  policeShirvalAmount: number;
  policeChakanAmount: number;
  policeOtherAmount: number;

  // Flag for enabling/disabling all fields in view mode
  isFieldDisabled: boolean;

  // Flag for enabling/disabling cancel button
  isCancelDisabled: boolean;

  // Change button label as per requirement
  buttonLabel: string;

  isEditClicked: boolean;

  isDeleteDisabled: boolean;

  // Variables for image paths
  addImagePath: string;
  removeImagePath: string;

  public constructor(private route: ActivatedRoute, private appService: AppService, private cardDetailService: CardDetailService,
    private location: Location, private vehicleService: VehicleService) {
    this.route.queryParams.subscribe(params => {
      this.cardId = params["card_id"];
    });
    // Image paths
    this.addImagePath = "assets/images/ic_add_circle.svg";
    this.removeImagePath = "assets/images/ic_remove_circle.svg";
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);

    this.vehicleService.getVehicles().subscribe(response => {
      this.vehicles = response.vehicles;
    },
      error => {
        console.log(error)
      });

    // Make necessary changes based on selection from view payment details
    this.showUIChanges();
  }

  showUIChanges() {
    if (this.cardId != undefined) {

      // Disable all fields for view mode
      this.isFieldDisabled = true;

      // Disable cancel button initially
      this.isCancelDisabled = true;

      // Enable delete button initially
      this.isDeleteDisabled = false;

      // Get payment details by id
      this.getCardDetailById();
    } else {
      // Enable all fields for view mode
      this.isFieldDisabled = false;

      // Enable cancel button initially
      this.isCancelDisabled = false;

      // Disable delete button initially
      this.isDeleteDisabled = true;
    }
    // Change button label to save
    this.changeButtonLabel(this.isFieldDisabled);
  }

  addCardDetail() {
    if (this.buttonLabel == "SAVE") {
      if (this.cardDate != undefined && this.vehicleNumber != undefined) {
        var formattedCardDate = moment(this.cardDate).format('YYYY-MM-DD');

        if (this.isEditClicked) {
          this.isEditClicked = false;
          const updatePayload = { "data": { "card_id": this.cardId, "card_date": formattedCardDate, "vehicle_id": this.vehicleId, "rto_pune_amount": this.rtoPuneAmount, "rto_pcmc_amount": this.rtoPCMCAmount, "police_shirval_amount": this.policeShirvalAmount,  "police_chakan_amount": this.policeChakanAmount, "police_other_amount": this.policeOtherAmount} };
          this.cardDetailService.updateCardDetail(updatePayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        } else {
          const addPayload = { "data": { "card_date": formattedCardDate, "vehicle_id": this.vehicleId, "rto_pune_amount": this.rtoPuneAmount, "rto_pcmc_amount": this.rtoPCMCAmount, "police_shirval_amount": this.policeShirvalAmount,  "police_chakan_amount": this.policeChakanAmount, "police_other_amount": this.policeOtherAmount } };
          this.cardDetailService.addCardDetail(addPayload).subscribe(response => {
            if (response.status == 200) {
              this.location.back();
            }
          },
            error => {
              console.log(error)
            });
        }
      } else {
        alert('Please fill all mandatory fields');
      }
    } else {
      this.isEditClicked = true;
      this.buttonLabel = "SAVE";
      this.isFieldDisabled = false;
      this.isCancelDisabled = false;
      this.isDeleteDisabled = true;
    }
  }

  clearFields() {
    this.cardId = undefined;
    this.cardDate= undefined;
    this.vehicleId= undefined;
    this.vehicleNumber= undefined;
    this.rtoPuneAmount= undefined;
    this.rtoPCMCAmount= undefined;
    this.policeShirvalAmount= undefined;
    this.policeChakanAmount= undefined;
    this.policeOtherAmount= undefined;
  }

  changeButtonLabel(isDisabled) {
    if (isDisabled) {
      this.buttonLabel = "EDIT";
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  addNewCard() {

    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = true;
    this.changeButtonLabel(this.isFieldDisabled);
    this.clearFields();
  }

  cancelClicked() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.isCancelDisabled = !this.isCancelDisabled;
    this.isDeleteDisabled = false;

    if (this.buttonLabel == "SAVE") {
      this.buttonLabel = "EDIT";
      // Show last shown record
      this.getCardDetailById();
    } else {
      this.buttonLabel = "SAVE";
    }
  }

  deleteCardDetail() {
    const deletePayload = { "data": { "card_id": this.cardId } };
    this.cardDetailService.deleteCardDetail(deletePayload).subscribe(response => {
      if (response.status == 200) {
        this.location.back();
      } else if (response.status == 501) {
        console.log(response.message);
      }
    },
      error => {
        console.log(error)
      });
  }

  getCardDetailById() {
    if (this.cardId != undefined) {
      const payload = { "data": { "card_id": this.cardId } };
      this.cardDetailService.getCardDetailById(payload).subscribe(response => {
        if (response.status == 200) {
          if (response.card_details != undefined && response.card_details.length > 0) {
            this.setCardDetail(response.card_details[0]);
          }
        }
      },
        error => {
          console.log(error)
        });
    } else {
      this.location.back();
    }
  }

  setCardDetail(card) {
    this.cardId = card.card_id;
    this.cardDate= card.card_date
    this.vehicleId= card.veh_id;
    this.vehicleNumber= card.veh_number;
    this.rtoPuneAmount= card.rto_pune_amount;
    this.rtoPCMCAmount= card.rto_pcmc_amount;
    this.policeShirvalAmount= card.police_shirval_amount;
    this.policeChakanAmount= card.police_chakan_amount;
    this.policeOtherAmount= card.police_other_amount;
  }

  setVehicleDetail(vehicle) {
    this.vehicleId = vehicle.veh_id;
  }
}
