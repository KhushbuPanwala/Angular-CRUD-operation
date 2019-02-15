import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { RegistrationService } from '../register/registration.service';
import { AlertService } from '../service/alert.service';
 


@Component({ 
    styleUrls: ['home.component.css'],
    templateUrl: 'home.component.html' ,
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[];

    constructor(
        private authenticationService: AuthenticationService,
        // private userService: UserService,
        private userService:RegistrationService,
        private alertService:AlertService,
        
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.deleteUser(id).pipe(first()).subscribe(() => {
            this.alertService.success('Record deleted successfully!!!', true);
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {        
        this.userService.getAllUser().pipe(first()).subscribe(users => {
            this.users = users;            
        });
    }
   
}