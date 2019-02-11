import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { DepFlags } from '@angular/core/src/view';

const endpoint = 'http://localhost:53343/api/user';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {                 
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

addUser (user): Observable<any> {          
    debugger
  return this.http.post(endpoint , JSON.stringify(user), httpOptions)
  .pipe(
  catchError(this.handleError<any>('addUser')));
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