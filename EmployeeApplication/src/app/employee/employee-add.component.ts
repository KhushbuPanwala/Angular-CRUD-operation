import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {  


  employeeForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,      
      private authenticationService: AuthenticationService,
      private EmployeeService: EmployeeService,
      
      private alertService: AlertService
  ) { 
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
        name: ['', Validators.required],
        address: ['', Validators.required],
        salary: ['', Validators.required],
        // password: ['', [Validators.required, Validators.minLength(6)]]
    });
}


    // convenience getter for easy access to form fields
    get f() { return this.employeeForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.employeeForm.invalid) {
            return;
        }
        this.loading = true;        
        this.EmployeeService.addEmployee(this.employeeForm.value)
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