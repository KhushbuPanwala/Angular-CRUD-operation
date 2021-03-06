import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

const endpoint = 'http://localhost:53343/api/user';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    constructor(private http: HttpClient,
        // private router: Router
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    login(username: string, password: string) {        
        // return this.http.post<any>(`/users/authenticate`, { username, password })              
            return this.http.get<any>(endpoint +'/'+  username)
            .pipe(map(user => {                
                // login successful if there's a jwt token in the response                
                user.token= "fake-jwt-token";
                //   if (user && user.token) {                
                if (user && user.token && user.Password==password) {                             
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
}