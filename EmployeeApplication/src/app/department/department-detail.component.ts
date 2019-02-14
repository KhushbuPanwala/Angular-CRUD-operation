import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DepartmentService } from './department.service';
import { IDepartment } from './department';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  pageTitle='';
  department :IDepartment;
  constructor(
    // private departmentService: DepartmentService,    
    private route :ActivatedRoute, 
    private router:Router,    
) { 
  // this.department = route.snapshot.data['department'],   
  router.events  
  .forEach(e => {
    this.pageTitle = route.root.firstChild.snapshot.data['title'];
  });
}
  ngOnInit():void {       
    this.department =this.route.snapshot.data['department'];
    // this.departmentService.getDepartment(this.route.snapshot.params['id'])
    //   .subscribe((data: {}) => {      
    //   this.department = data;
    // });
  }
   onBack(): void {
    this.router.navigate(['/Department']);
  } 
}