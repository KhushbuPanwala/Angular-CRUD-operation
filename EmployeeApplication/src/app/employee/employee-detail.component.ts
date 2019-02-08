import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee :any;
  constructor(private employeeService: EmployeeService,
    private route :ActivatedRoute, 
    private router:Router    
) { }

  ngOnInit() {
    this.employeeService.getEmployee(this.route.snapshot.params['id'])
      .subscribe((data: {}) => {
      // console.log(data);
      this.employee = data;
    });
  }
   onBack(): void {
    this.router.navigate(['/Employee']);
  }
 
}