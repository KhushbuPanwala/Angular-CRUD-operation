import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  pageTitle='';
  department :any;
  constructor(private departmentService: DepartmentService,
    private route :ActivatedRoute, 
    private router:Router    
) { 
  router.events  
  .forEach(e => {
    this.pageTitle = route.root.firstChild.snapshot.data['title'];
  });
}

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