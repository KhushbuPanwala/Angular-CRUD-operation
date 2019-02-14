import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../service/alert.service';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {
    department:any;
    departmentForm: FormGroup;
    loading = false;
    submitted = false;
 
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,      
      private authenticationService: AuthenticationService,
      private departmentService: DepartmentService,      
      private alertService: AlertService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {           
          this.router.navigate(['/Department/0/add']);
      }
      else{
        this.router.navigate(['/Department']);
      }
  }
  ngOnInit() {    
    this.departmentForm = this.formBuilder.group({
        //deptId:['', Validators.required],   
        name:['', Validators.required],        
    });
  }
    // convenience getter for easy access to form fields
    get f() { return this.departmentForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.departmentForm.invalid) {
            return;
        }
        this.loading = true;        
        this.departmentService.addDepartment(this.departmentForm.value)        
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Record added successfully!!!', true);
                    this.router.navigate(['/Department']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}