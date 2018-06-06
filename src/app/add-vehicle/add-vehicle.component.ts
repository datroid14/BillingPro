import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service"

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(private appService:AppService) { }

  ngOnInit() {
    this.appService.showDrawer(true);
  }

}
