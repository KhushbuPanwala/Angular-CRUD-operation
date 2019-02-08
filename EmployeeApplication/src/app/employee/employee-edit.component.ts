import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../service/alert.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {
  @Input() employee: 
  any = { 
          emp_id:'',      
          emp_name: '',
          emp_address: '', 
          emp_salary:0 };
id:number;
  employeeUpdateForm: FormGroup;
  loading = false;
  submitted = false;  
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
      name: ['', Validators.required],
      address: ['', Validators.required],
      salary: ['', Validators.required],
      id: ['', Validators.required],
      // password: ['', [Validators.required, Validators.minLength(6)]]
  });
}
 // convenience getter for easy access to form fields
 get f() { return this.employeeUpdateForm.controls; }

 onSubmit() {
  
     this.submitted = true;
     // stop here if form is invalid
     if (this.employeeUpdateForm.invalid) {
         return;
     }
    
     this.loading = true;
     this.employeeService.updateEmployee(this.id,this.employeeUpdateForm.value)     
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