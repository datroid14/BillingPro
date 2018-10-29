import { Component, ViewChild, OnInit } from '@angular/core';
import { EmployeeService } from "../add-employee/employee.service";
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';

@Component({
  selector: 'view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employees;

  displayedColumns = ['name', 'contact', 'role', 'address'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    // Show drawer
    this.appService.showDrawer(true);
    
    this.employeeService.getEmployees().subscribe(response => {
      this.employees = response.employees;
      this.dataSource = new MatTableDataSource<EMPLOYEE>(this.employees);
      this.dataSource.paginator = this.paginator;
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

  showEmployeeDetails(employee) {

    if (employee != undefined) {
      let navigationExtras: NavigationExtras = {
        queryParams: { emp_id: employee.emp_id }
      };
      // Redirect it to View Product screen
      this.router.navigate(['/add-employee'], navigationExtras);
    } else {
      this.router.navigate(['/add-employee']);
    }
  }
}

export interface EMPLOYEE {
  emp_id: number;
  emp_name: string;
  emp_contact: string;
  emp_address: string;
  emp_role: string;
}
