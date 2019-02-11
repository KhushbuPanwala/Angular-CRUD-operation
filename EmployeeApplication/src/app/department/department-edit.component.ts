import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../service/alert.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})

export class DepartmentEditComponent implements OnInit {
  @Input() department: 
  any = { 
          dept_Id:'',    
          dept_Name:'',
        };
  
  id:number; //user to get avlue from routing
  departmentUpdateForm: FormGroup;
  loading = false;
  submitted = false;    
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,      
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private departmentService: DepartmentService,
    private alertService: AlertService,
    private spinnerService: Ng4LoadingSpinnerService
) 
{ 
  this.id =+this.route.snapshot.params['id'];  
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/Department/'+this.id +'/edit']);      
    }
    else{
      this.router.navigate(['/Department']);
    }
}

ngOnInit() {  
  this.departmentService.getDepartment(this.id).subscribe((data: {}) => {        
    this.department = data;
  });
  this.departmentUpdateForm = this.formBuilder.group({
    deptId:['', Validators.required],   
    name:['', Validators.required],
    
  });
}

// convenience getter for easy access to form fields
 get f() { return this.departmentUpdateForm.controls; }
 selectedDate:Date;
 onSubmit() {
  
     this.submitted = true;
     // stop here if form is invalid
     if (this.departmentUpdateForm.invalid) {
         return;
     }
     this.loading = true;               
    //  alert( moment(this.selectedDate).format().substring(0, 10));
    
    //  this.employeeService.updateEmployee(this.id,this.employeeUpdateForm.value)    
    this.departmentService.updateDepartment(this.id,this.department)    
     .pipe(first())
     .subscribe(       
             data => {
                // this.spinnerService.show();   
                 this.alertService.success('Record updated successfully!!!', true);
                 this.router.navigate(['/Department']);
             },
            error => {
                 this.alertService.error(error);
                 this.loading = false;
             });
 }
}