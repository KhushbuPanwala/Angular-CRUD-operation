import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  department :any;
  constructor(private departmentService: DepartmentService,
    private route :ActivatedRoute, 
    private router:Router    
) { }

  ngOnInit() {    
    this.departmentService.getDepartment(this.route.snapshot.params['id'])
      .subscribe((data: {}) => {      
      this.department = data;
    });
  }
   onBack(): void {
    this.router.navigate(['/Department']);
  }
 
}