import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatDialogModule } from '@angular/material';
import { AuthGuard } from '../auth/auth.guard';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { DepartmentListComponent } from './department-list.component';
import { DepartmentDetailComponent } from './department-detail.component';
// import { DepartmentAddComponent } from './department-add.component';
import { DepartmentEditComponent } from './department-edit.component';

const appRoutes: Routes = [
  {
    path: 'Department',
    component: DepartmentListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Department List' }
  },
  {
    path: 'Department/:id',
    component: DepartmentDetailComponent,
    canActivate: [AuthGuard],
    data: { title: 'Department  Details' }
  },
   {    
    path: 'Department/:id/add',     
    component: DepartmentEditComponent,
    // component: DepartmentAddComponent,
    canActivate: [AuthGuard],
    data: { title: 'Department Add' }
   },
  {
    path: 'Department/:id/edit',         
     component: DepartmentEditComponent,
     canActivate: [AuthGuard],
     data: { title: 'Department Edit' }
  },
  { path: '',
    redirectTo: '/Department ',
    pathMatch: 'full'
  }
  
];
@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentDetailComponent,
    DepartmentEditComponent,
    // DepartmentAddComponent,
  ],
 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,    
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
     RouterModule.forRoot(appRoutes),  
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  providers: [],
})
export class DepartmentModule { }

