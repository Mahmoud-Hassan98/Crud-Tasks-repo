import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ManageTaskService } from './../../services/manage-task.service';
import {
  MatNativeDateModule,
  DateAdapter,
  NativeDateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
export interface Task {
  name: string;
  user: string;
  deadline: string;
  description: string;
}
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
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
   users! : any[];
  taskForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private fb: FormBuilder,
    private ManageTaskService : ManageTaskService ,
  ) {}
  ngOnInit(): void {
     this.ManageTaskService.getAllUsers().subscribe(
      (data)=>{
        this.users = data
        console.log(this.users);
        
      },
      (error) => {
                console.error('Error fetching users', error);

      }
     )

    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      deadline: [null, Validators.required],
      description: [''],
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value as Task;
      this.ManageTaskService.addTask(task);  // Save task in localStorage
      this.dialogRef.close({ success: true });  // Close dialog and notify success
    } else {
      alert('Please fill in all the required fields');
    }
  }
  
}
