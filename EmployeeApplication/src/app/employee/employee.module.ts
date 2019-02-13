import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatDialogModule,MatRadioModule,MatDatepickerModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { DialogComponent } from '../shared/dialog.component';
import { AuthGuard } from '../auth/auth.guard';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeAddComponent } from './employee-add.component';
import { EmployeeEditComponent } from './employee-edit.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {MatSortModule} from '@angular/material/sort';
const appRoutes: Routes = [
  {
    path: 'Employee',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Employee List' }
  },
  {
    path: 'Employee/:id',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard],
    data: { title: 'Employee Details' }
  },
   {    
    path: 'Employee/:id/add',     
    // component: EmployeeAddComponent,
    component:EmployeeEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Employee Add' }
   },
  {
    path: 'Employee/:id/edit',         
     component: EmployeeEditComponent,
     canActivate: [AuthGuard],
     data: { title: 'Employee Edit' }
  },
  { path: '',
    redirectTo: '/Employee',
    pathMatch: 'full'
  }
  
];

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent,
    
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
    MatRadioModule,
    MatDatepickerModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,    
    RouterModule.forRoot(appRoutes),  
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  providers: [],
})

export class EmployeeModule { }



