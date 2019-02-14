import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { IEmployee } from './employee';
import {Observable, observable} from 'rxjs';
import {ActivatedRouteSnapshot,RouterStateSnapshot}  from "@angular/router";
import { EmployeeService } from './employee.service';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeResolverService implements Resolve<IEmployee> {
  
  constructor(private employeeService:EmployeeService,
    private router:Router ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IEmployee |
   Observable<IEmployee> | Promise<IEmployee> 
   {
     let id=+route.params['id'];
     if (isNaN(id)){
        this.router.navigate(['/Employee']);
     }

     return this.employeeService.getEmployee(+id).pipe(map
     (employee=>{
       if(employee){
         return employee;
      }
      this.router.navigate(['/Employee']);
      return null;
     }));
    }


}
