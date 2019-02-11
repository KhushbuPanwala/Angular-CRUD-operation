import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from '@angular/material';
import { DialogComponent } from '../shared/dialog.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],  
})
export class EmployeeListComponent implements OnInit {

  pageTitle: string  ='Employee List';
  employees: IEmployee[];
  errorMessage:'';
  constructor(public employeeService:EmployeeService, 
            private route: ActivatedRoute,  
            private router: Router,
            private dialog: MatDialog,            
            )   { }

 
 ngOnInit(): void {
  this.getEmployees();
 }


 openDialog(id): void {
  const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px' ,      
      data: {
        dataKey: id,
        deletionModule:'Employee',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.getEmployees();
    });
  }

  getEmployees() {
    this.employees =[];    
    this.employeeService.getEmployees().subscribe(
      employee => {
        this.employees = employee;                     
      },
       error => this.errorMessage = <any>error
    );    
  }
  
  // delete(id) {    
  //   this.employeeService.deleteEmployee(id)
  //     .subscribe(res => {
  //       alert("Record deleted successfully!!!");
  //         this.getEmployees();
  //       }, (err) => {
  //         console.log(err);
  //       }
  //     );
  // }
 }