import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { AppComponent }  from './app.component';
import { AlertComponent } from './shared/alert.component';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { fakeBackendProvider } from './helper/fake-backend';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { EmployeeModule } from './employee/employee.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { DepartmentModule } from './department/department.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdCarouselNavigation } from './shared/carousel-navigation';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },    
    { path: 'Login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
@NgModule({
   
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        NgbdCarouselNavigation,        
               
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,        
        // Routing,       
        RouterModule.forRoot(appRoutes),
        Ng4LoadingSpinnerModule.forRoot(),
        NgbModule,
        EmployeeModule,
        DepartmentModule,
        
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        fakeBackendProvider        
    ],
    
    bootstrap: [AppComponent]
})

export class AppModule { }