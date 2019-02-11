import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from '@angular/material';
import { DialogComponent } from '../shared/dialog.component';
import { IDepartment } from './department';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
 pageTitle: string  ='Department  List';
  departments: IDepartment[];
  errorMessage:'';
  constructor(public departmentService:DepartmentService, 
            private route: ActivatedRoute,    
            private router: Router,
            private dialog: MatDialog,            
            )   { }

 
 ngOnInit(): void {
  this.getDepartments();
 }

 openDialog(id): void {
  const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px' ,      
      data: {
        dataKey: id,
        deletionModule:'Department',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.getDepartments();
    });
  }

  getDepartments() {
    this.departments =[];    
    this.departmentService.getDepartments().subscribe(
      department => {
        this.departments = department;                     
      },
       error => this.errorMessage = <any>error
    );    
  }
  
 }
