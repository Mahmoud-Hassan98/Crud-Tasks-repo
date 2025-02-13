
import { Component , ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, NgForm } from '@angular/forms';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'l',  
  },
  display: {
    dateInput: 'l',  
    monthYearLabel: 'MMM YYYY',  
    dateA11yLabel: 'LL',  
    monthYearA11yLabel: 'MMMM YYYY',  
  },
};
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,  
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },  
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },  
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },  
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @ViewChild('taskForm') taskForm: NgForm | undefined;

  constructor(private dialogRef: MatDialogRef<TaskFormComponent>) {}
   task = {
    name: '',
    user: '',
    deadline: null,
    description: '',
   }
   
  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log(5115511551151);

    if (this.taskForm?.valid) {
      console.log(5115511551151);
      
      // Save data to localStorage
      localStorage.setItem('task', JSON.stringify(this.task));
      this.dialogRef.close({ success: true });
    } else {
      alert('Please fill in all the required fields');
    }
  }
}





