
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute } from '@angular/router';
import {Observable, observable} from 'rxjs';
import {ActivatedRouteSnapshot,RouterStateSnapshot}  from "@angular/router";
import { map, catchError, tap } from 'rxjs/operators';
import { IDepartment } from './department';
import { DepartmentService } from './department.service';

@Injectable({
providedIn: 'root'
})
export class DepartmentResolverService implements Resolve<IDepartment>{
moduleName:string='';

constructor(private departmentService:DepartmentService,
private router:Router,
private route:ActivatedRoute,
) {             
   
  //  this.moduleName = window.location.pathname.replace('/','');   
  if(window.location.pathname!='/')
    this.moduleName = window.location.pathname.split('/')[1];
  //  if (this.route.snapshot.firstChild!=null)
  //     this.moduleName = this.route.snapshot.firstChild.url[0].path; 
}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IDepartment |
Observable<IDepartment> | Promise<IDepartment> 
{  
  if  (this.moduleName=='Department'){
      let id=+route.params['id'];
        if (isNaN(id)){                      
        return this.departmentService.getDepartments().pipe(map
            (department=>{       
              if(department){
                return department;
              }
              this.router.navigate(['/Department']);
            }));
        }

        return this.departmentService.getDepartment(+id).pipe(map
          (department=>{       
            if(department){
              return department;
            }
            this.router.navigate(['/Department']);
            return null;
          }));
      }
  else if  (this.moduleName=='Employee'){          
    return this.departmentService.getDepartments().pipe(map
      (department=>{       
        if(department){
          return department;
        }
        this.router.navigate(['/Employee']);
      }));
  }  
  else{

  }
 
}
}
