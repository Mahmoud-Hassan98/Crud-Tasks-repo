import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, formatDate } from '@angular/common';
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
import { ManageUsersService } from '../../../manage-users/services/manage-users.service';
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
  userId: number;
  deadline: string;
  description: string;
  status: string;
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
  users!: any[];
  taskForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: any },
    private fb: FormBuilder,
    private ManageTaskService: ManageTaskService,
    private ManageUsersService: ManageUsersService
  ) {}
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      userId: ['', Validators.required],
      deadline: [null, Validators.required],
      description: [''],
      status: 'In-Progress',
      taskImage: [null],
    });

    this.ManageUsersService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
    if (this.data?.task) {
      this.taskForm.patchValue({
        ...this.data.task,
        deadline: new Date(this.data.task.deadline),
      });
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value as Task;
      const formattedDeadline = formatDate(
        task.deadline,
        'yyyy-MM-dd',
        'en-US'
      );
      task.deadline = formattedDeadline;
      const formData = new FormData();
      formData.append(
        'task',
        new Blob([JSON.stringify(task)], { type: 'application/json' })
      );
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      if (this.data?.task) {
        const updatedTask = { ...this.data.task, ...task };
        this.ManageTaskService.updateTask(
          formData,
          this.data.task.id
        ).subscribe({
          next: (response) => {
            this.dialogRef.close({ success: true, task: response });
          },
          error: (err) => {
            console.error(err, 'An error occurred while editing the task');
            alert('An error occurred while saving the task.');
          },
        });
        return;
      }
      this.ManageTaskService.addTask(formData).subscribe({
        next: (response) => {
          this.dialogRef.close({ success: true, task: response });
        },
        error: (error) => {
          console.error('Error adding task:', error);
          alert('An error occurred while saving the task.');
        },
      });
    } else {
      alert('Please fill in all the required fields');
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
