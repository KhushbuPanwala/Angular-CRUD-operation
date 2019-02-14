import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../model/user';

// const endpoint = 'http://localhost:53343/api/user';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

login(username: string, password: string) {         
     return this.http.post<any>(`/users/authenticate`, { username, password })        
        .pipe(map(user => {          
            // // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
}
logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

//   getUsers(): Observable<any> {          
//       return this.http.get(endpoint).pipe(  
//     map(this.extractData));
//   }
// getUser(id): Observable<any> {          
// return this.http.get(endpoint +'/'+  id).pipe(          
// map(this.extractData));
// }

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
