import { Component, OnInit } from '@angular/core';
import { IEmployee, ICategory } from './employee';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, Sort} from '@angular/material';
import { DialogComponent } from '../shared/dialog.component';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DepartmentService } from '../department/department.service';
import { IDepartment } from '../department/department';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],  
})
export class EmployeeListComponent implements OnInit {
  pageTitle: string  ='';
  employees: IEmployee[];
  departments: IDepartment[];
  errorMessage:'';

  filteredEmployees: IEmployee[] = [];
  categorys: ICategory[] = [
    {key: 0, value: 'Permanant'},
    {key: 1, value: 'Probation'},
    {key: 2, value: 'Contract'}
  ];  

  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'JoiningDate','DeptName','CatName','Detail','Edit','Delete'];
  dataSource = new MatTableDataSource(this.employees);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeService:EmployeeService,             
            private route: ActivatedRoute,  
            private router: Router,
            private dialog: MatDialog,     
            private departmentService:DepartmentService,       
            )   { 
              router.events  
              .forEach(e => {
                this.pageTitle = route.root.firstChild.snapshot.data['title'];
              });              
            }
 
 ngOnInit(): void {
  this.getDepartments();
  this.getEmployees();   
  
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
 performFilter(filterBy: string): IEmployee[] {
   filterBy = filterBy.toLocaleLowerCase();
   return this.employees.filter((employee: IEmployee) =>
   employee.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
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
      this.getEmployees();
    });
  }

  getEmployees() {
    this.employees =[];    
    this.employeeService.getEmployees().subscribe(
      employee => {
        this.employees = employee;    
        this.filteredEmployees = this.employees;           
        this.filteredEmployees.forEach(element => {
            element.CatName = this.categorys.filter(x => x.key ===+ element.Category)[0].value;           
            element.DeptName = this.departments.filter(x => x.DeptId ===+ element.DeptId)[0].Name;           
        });
        //  compare two list and assign value to model
        // this.employees.forEach((obj)=>{
        //   var existNotification = this.departments.find(({DeptId}) => obj.DeptId ===DeptId);          
        //   if (existNotification !=undefined) 
        //   {
        //     obj.DeptName=existNotification.Name;          
        //     alert(obj.DeptName);
        //   }         
        // });

      
        //sorting,pagging
        this.dataSource = new MatTableDataSource(this.filteredEmployees);      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
       error => this.errorMessage = <any>error
    );        
  }
  
  applyFilter(filterValue: string) {  
    filterValue = filterValue.trim().toLowerCase(); // Remove whitespace and  lowercase matches
    this.dataSource.filter = filterValue;
  }
}
