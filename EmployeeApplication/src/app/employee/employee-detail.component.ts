import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IDepartment } from '../department/department';
import { DepartmentService } from '../department/department.service';
import { ICategory, IEmployee } from './employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  pageTitle:'';  
  employee :any;
  errorMessage='';
  departments: IDepartment[];
  categorys: ICategory[] = [
    {key: 0, value: 'Permanant'},
    {key: 1, value: 'Probation'},
    {key: 2, value: 'Contract'}
  ]; 
  constructor(
    // private employeeService: EmployeeService,
    // private departmentService:DepartmentService,
    private route :ActivatedRoute, 
    private router:Router    
) {  
  router.events  
  .forEach(e => {
    this.pageTitle = route.root.firstChild.snapshot.data['title'];
    
  });
}

  ngOnInit():void {
    this.departments=this.route.snapshot.data['department'];    
    this.employee =this.route.snapshot.data['employee'];    
    this.employee.DeptName= this.departments.filter(x => x.DeptId === this.employee.DeptId)[0].Name;        
    this.employee.CatName= this.categorys.filter(x => x.key === this.employee.Category)[0].value;                  
    //  this.getDepartments();
    
    // this.employeeService.getEmployee(this.route.snapshot.params['id'])
    //   .subscribe((data: {}) => {      
    //   this.employee = data;
    //   // this.departments= this.departments.filter(x => x.DeptId === this.employee.DeptId);           
    //   //  this.employee.DeptName=this.departments[0].Name;
    //   if  (this.departments.length>0)
    //    this.employee.DeptName= this.departments.filter(x => x.DeptId === this.employee.DeptId)[0].Name;                  
        
    //   this.employee.CatName= this.categorys.filter(x => x.key === this.employee.Category)[0].value;                  
    // });
    
  }
  // getDepartments() {
  //   this.departments =[];    
  //   this.departmentService.getDepartments().subscribe(
  //     department => {
  //       this.departments = department;               
  //     },
  //      error => this.errorMessage = <any>error
  //   );    
  // }
   onBack(): void {
    this.router.navigate(['/Employee']);
  }
 
}