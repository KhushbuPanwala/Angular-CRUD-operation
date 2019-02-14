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
 pageTitle: string  ='';
  departments: IDepartment[];
  errorMessage:'';
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDepartments = this.listFilter ? this.performFilter(this.listFilter) : this.departments;
  }
  filteredDepartments: IDepartment[] = [];

  constructor(public departmentService:DepartmentService, 
            private route: ActivatedRoute,    
            private router: Router,
            private dialog: MatDialog,            
            )   {
              router.events  
              .forEach(e => {
                this.pageTitle = route.root.firstChild.snapshot.data['title'];
              });
             }
 
 ngOnInit(): void {
  this.getDepartments();
 
 }

 performFilter(filterBy: string): IDepartment[] {
   filterBy = filterBy.toLocaleLowerCase();
   return this.departments.filter((department: IDepartment) =>
   department.Name.toLocaleLowerCase().indexOf(filterBy) !== -1);
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
        this.filteredDepartments= this.departments;             
      },
       error => this.errorMessage = <any>error
    );    
  }
  
 }
 