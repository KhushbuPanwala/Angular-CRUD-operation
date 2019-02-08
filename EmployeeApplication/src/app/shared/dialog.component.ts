import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { EmployeeService } from '../employee/employee.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {  
  constructor(
    private employeeService:EmployeeService,    
    private alertService:AlertService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
 ) { }
   ngOnInit(){    
  }
  onNoClick(): void {
    this.dialogRef.close();
  } 
  delete() {        
    this.employeeService.deleteEmployee(this.data.dataKey)
      .subscribe(res => {
        this.alertService.success('Record deleted successfully!!!', true);
        //  alert("Record deleted successfully!!!");
         this.onNoClick();                    
        }, (err) => {
          console.log(err);
        }
      );
  }
 
}

