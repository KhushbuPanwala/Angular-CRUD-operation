import { Injectable } from '@angular/core';

// import { IEmployee } from './employee';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:53343/api/home';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
        private employeeUrl = './assets/employee.json';

        constructor(private http: HttpClient) {         
        
        }
        private extractData(res: Response) {
          let body = res;
          return body || { };
        }
      
         getEmployees(): Observable<any> {
          
          // httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:53343/api/home');
          // httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          // httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          // httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
          // return this.http.get(endpoint + 'Employee').pipe(
          // return this.http.get(endpoint,httpOptions).pipe(            
                    return this.http.get(endpoint).pipe(  
                  map(this.extractData));
        }
        getEmployee(id): Observable<any> {          
          return this.http.get(endpoint +'/'+  id).pipe(          
            map(this.extractData));
        }
        
        addEmployee (employee): Observable<any> {          
          // console.log(employee);
          // return  this.http.post(endpoint ,JSON.stringify(employee))
          // .pipe( map(this.extractData) );

          return this.http.post(endpoint , JSON.stringify(employee), httpOptions)
          .pipe(
            catchError(this.handleError<any>('addEmployee')));

          // return this.http.post<any>(endpoint + 'Employee', JSON.stringify(employee), httpOptions).pipe(
          //   tap((product) => console.log(`added product w/ id=${product.id}`)),
          //   catchError(this.handleError<any>('addProduct'))
          // );
        }
        
        updateEmployee (id, employee): Observable<any> {          
            return this.http.put(endpoint + '/' + id, JSON.stringify(employee), httpOptions).pipe(
            catchError(this.handleError<any>('updateEmployee'))
          );          
        }
        
        deleteEmployee (id): Observable<any> {          
            return this.http.delete(endpoint+ "/" + id).pipe(  
              map(this.extractData));                    
        }
     
        private handleError<T> (operation = 'operation', result?: T) {
          return (error: any): Observable<T> => {        
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
        
            // TODO: better job of transforming error for user consumption
            console.log('${operation} failed: ${error.message}');
        
            // Let the app keep running by returning an empty result.
            return of(result as T);
          };
        }

       
  }
   
       
        
