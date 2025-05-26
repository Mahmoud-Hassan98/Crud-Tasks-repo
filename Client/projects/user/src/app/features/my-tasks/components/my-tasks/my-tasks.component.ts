import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MyTaskService } from '../../services/my-task.service';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../../../shared/services/websocket.service';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-tasks',
  imports: [
    FormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MyTasksComponent implements OnInit {
  tasks: any[] = [];
  selectedStatus: string = '';
  constructor(
    private cdr: ChangeDetectorRef,
    private toaster: ToastrService,
    private myTaskService: MyTaskService,
    private wsService: WebSocketService
  ) {}
  logoImage = 'assets/images/Logo.png';

  ngOnInit(): void {
    this.loadUserTasks();
    this.wsService.subscribeToUserTasks((newTask) => {
      this.tasks.push(newTask);
      this.tasks = [...this.tasks];
    });
  }

  loadUserTasks(): void {
    this.myTaskService.getUserTasks(this.selectedStatus).subscribe({
      next: (value) => {
        this.tasks = value;
      },
      error: (err) => {
        console.error('Failed to load tasks:', err);
      },
    });
  }
  completeTask(taskId: number) {
    console.log("test");
    
    this.myTaskService.completeTask(taskId).subscribe({
      next: (completedTask) => {
        this.toaster.success('success', 'Task completed successfully!');
        this.tasks = this.tasks.filter((task) => {
          if (task.id === completedTask.id) {
            return (
              this.selectedStatus === '' ||
              completedTask.status === this.selectedStatus
            );
          }
          return true;
        });
      },
      error: (err) => {
        console.error(err, 'Failed to complete task');
      },
    });
  }
}
