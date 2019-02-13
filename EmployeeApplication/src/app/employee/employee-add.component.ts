import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../service/alert.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { IEmployee, ICategory } from './employee';

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
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
  providers: [    
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class EmployeeAddComponent implements OnInit {  
  pageTitle='';
    date = new FormControl(moment());
    employee:any;
  employeeForm: FormGroup;
  loading = false;
  submitted = false;
  categorys: ICategory[] = [
    {key: 0, value: 'Permanant'},
    {key: 1, value: 'Probation'},
    {key: 2, value: 'Contract'}
  ];  
  genderSelected: string='Male';
  gender: string[] = ['Male', 'Female'];
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,      
      private authenticationService: AuthenticationService,
      private EmployeeService: EmployeeService,
      private route :ActivatedRoute, 
      private alertService: AlertService
  ) { 
    router.events  
    .forEach(e => {
      this.pageTitle = route.root.firstChild.snapshot.data['title'];
    });
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {           
          this.router.navigate(['/Employee/0/add']);
      }
      else{
        this.router.navigate(['/Employee']);
      }
  }
  ngOnInit() {    
    this.employeeForm = this.formBuilder.group({
        // empId:['', Validators.required],   
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
        // password: ['', [Validators.required, Validators.minLength(6)]]
    });
}


    // convenience getter for easy access to form fields
    get f() { return this.employeeForm.controls; }

    onSubmit() {
        debugger
        this.submitted = true;

        // stop here if form is invalid
        if (this.employeeForm.invalid) {
            return;
        }
        this.loading = true;        
        this.employee =this.employeeForm.value;
    this.employee.BirthDate = moment(this.employee.BirthDate).format().substring(0, 10); 
    this.employee.JoiningDate = moment(this.employee.JoiningDate).format().substring(0, 10); 
   
        // this.EmployeeService.addEmployee(this.employeeForm.value)
        this.EmployeeService.addEmployee(this.employee)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Record added successfully!!!', true);
                    this.router.navigate(['/Employee']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}