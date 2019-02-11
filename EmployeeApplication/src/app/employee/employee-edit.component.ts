import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../service/alert.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ICategory } from './employee';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'], 
  providers: [    
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class EmployeeEditComponent implements OnInit {  
  date = new FormControl(moment());
  @Input() employee: 
  any = { 
          emp_EmpId:'',    
          emp_FirstName:'',
          emp_LastName:'', 
          emp_Email:'',    
          emp_MobileNo:'',
          emp_BirthDate:'',
          emp_JoiningDate:'',
          emp_DeptId:'', 
          emp_Address:'',
          emp_Salary:0,
          emp_Category:'',
          emp_Gender:'',
         };
  
  id:number; //user to get avlue from routing
  employeeUpdateForm: FormGroup;
  loading = false;
  submitted = false;    
  categorys: ICategory[] = [
    {key: 0, value: 'Permanant'},
    {key: 1, value: 'Probation'},
    {key: 2, value: 'Contract'}
  ];  
  gender: string[] = ['Male', 'Female'];
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,      
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private spinnerService: Ng4LoadingSpinnerService
) 
{ 
  this.id =+this.route.snapshot.params['id'];  
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/Employee/'+this.id +'/edit']);      
    }
    else{
      this.router.navigate(['/Employee']);
    }
}

ngOnInit() {  
  this.employeeService.getEmployee(this.id).subscribe((data: {}) => {        
    this.employee = data;
  });
  this.employeeUpdateForm = this.formBuilder.group({
    empId:['', Validators.required],   
    firstName:['', Validators.required],
    lastName:['', Validators.required],    
    email: ['', [Validators.required, Validators.email]],    
    mobileNo: ['', [Validators.required, Validators.minLength(10)]],
    birthDate:['', Validators.required],
    joiningDate:['', Validators.required],
    deptId:['', Validators.required], 
    address:['', Validators.required],
    salary:['', Validators.required],
    category:['', Validators.required],
    gender:['', Validators.required],
      // name: ['', Validators.required],
      // address: ['', Validators.required],
      // salary: ['', Validators.required],
      // id: ['', Validators.required],
      // password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

// convenience getter for easy access to form fields
 get f() { return this.employeeUpdateForm.controls; }
 selectedDate:Date;
 onSubmit() {
  
     this.submitted = true;
     // stop here if form is invalid
     if (this.employeeUpdateForm.invalid) {
         return;
     }
     this.loading = true;               
    //  alert( moment(this.selectedDate).format().substring(0, 10));
    
    this.employee.BirthDate = moment(this.employee.BirthDate).format().substring(0, 10); 
    this.employee.JoiningDate = moment(this.employee.JoiningDate).format().substring(0, 10); 
    
    //  this.employeeService.updateEmployee(this.id,this.employeeUpdateForm.value)    
    this.employeeService.updateEmployee(this.id,this.employee)    
     .pipe(first())
     .subscribe(       
             data => {
                // this.spinnerService.show();   
                 this.alertService.success('Record updated successfully!!!', true);
                 this.router.navigate(['/Employee']);
             },
            error => {
                 this.alertService.error(error);
                 this.loading = false;
             });
             
 }
//  show()
//  {
//    this.spinnerService.show();
//    setTimeout(()=>this.spinnerService.hide(),3000)
//  }
}