import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ManageTaskService } from '../../services/manage-task.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-tasks',
  imports: [MatTableModule, MatButtonModule, DatePipe, MatIconModule],
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.css'],
  providers: [DatePipe],
})
export class ManageTasksComponent implements OnInit {
  tasks = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'position',
    'name',
    'user',
    'deadline',
    'description',
    'status',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private manageTaskService: ManageTaskService,
    private cdr: ChangeDetectorRef,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.manageTaskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.data = tasks ?? [];
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
      },
    });
  }

  addTask(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.tasks.data = [...this.tasks.data, result.task];

        this.toaster.success('success', 'Task added successfully');
      }
    });
  }
  deleteTask(taskId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this task?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.manageTaskService.removeTask(taskId).subscribe({
          next: () => {
            console.log('Task deleted!');
            this.tasks.data = this.tasks.data.filter(
              (task) => task.id !== taskId
            );
            this.toaster.success('success', 'Task deleted successfully');
          },
          error: (err) => {
            console.error('Delete failed:', err);
          },
        });
      } else {
        console.log('Delete cancelled');
      }
    });
  }
  updateTask(task: any) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '800px',
      data: { task: task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        const updatedTask = result.task;
        const index = this.tasks.data.findIndex(task=> task.id === updatedTask.id)
        this.tasks.data[index] = updatedTask
        this.tasks.data = [...this.tasks.data]
        this.toaster.success('success', 'Task updated successfully');
      }
      
    });
  }
}
