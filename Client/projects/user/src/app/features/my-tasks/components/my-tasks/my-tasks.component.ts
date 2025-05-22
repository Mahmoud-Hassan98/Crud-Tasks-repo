import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MyTaskService } from '../../services/my-task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-tasks',
  imports: [
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
  constructor(private myTaskService: MyTaskService) {}
  logoImage = 'assets/images/Logo.png';

  ngOnInit(): void {
    this.loadUserTasks();
  }

  loadUserTasks(): void {
    this.myTaskService.getUserTasks().subscribe({
      next: (value) => {
        this.tasks = value
      },
      error: (err) => {
        console.error('Failed to load tasks:', err);
      },
    });
  }
}
