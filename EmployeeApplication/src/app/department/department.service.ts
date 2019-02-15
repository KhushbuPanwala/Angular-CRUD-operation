import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:53343/api/department';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {}
    
  private extractData(res: Response) {
      let body = res;
      return body || { };
    }
  
    getDepartments(): Observable<any> {        
      return this.http.get(endpoint).pipe(  
        map(this.extractData));
    }
    getDepartment(id): Observable<any> {                
      return this.http.get(endpoint +'/'+  id).pipe(          
        map(this.extractData));
    }
    
    addDepartment (department): Observable<any> {          
      return this.http.post(endpoint , JSON.stringify(department), httpOptions)
      .pipe(
        catchError(this.handleError<any>('addDepartment'))); 
    }
    
    updateDepartment (id, department): Observable<any> {                    
          return this.http.put(endpoint + '/' + id, JSON.stringify(department), httpOptions).pipe(            
        catchError(this.handleError<any>('updateDepartment'))
      );          
    }
    
    deleteDepartment (id): Observable<any> {          
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