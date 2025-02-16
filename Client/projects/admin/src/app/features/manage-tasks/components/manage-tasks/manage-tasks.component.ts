import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ManageTaskService } from '../../services/manage-task.service';
import { DatePipe } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-manage-tasks',
  imports: [MatTableModule, MatButtonModule, DatePipe],
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.css'],
  providers: [DatePipe],
})
export class ManageTasksComponent implements OnInit {
  tasks: any[] = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'user',
    'deadline',
    'description',
  ];

  constructor(
    private dialog: MatDialog,
    private manageTaskService: ManageTaskService,
    private cdr: ChangeDetectorRef,
    private toaster: ToastrService,


  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.manageTaskService.getTasks();
    this.cdr.detectChanges();
  }

  addTask(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadTasks();
        this.toaster.success('success', 'Task added successfully');
        console.log('Task added successfully!');
      }
    });
  }
}
