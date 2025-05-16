import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ManageTaskService } from '../../services/manage-task.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-tasks',
  imports: [MatTableModule, MatButtonModule, DatePipe , MatIconModule],
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
        console.log(result.task);
        this.tasks.data = [...this.tasks.data, result.task];

        this.toaster.success('success', 'Task added successfully');
      }
    });
  }
}
