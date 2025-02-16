import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManageTaskService {
  getTasks(): any[] {
    let tasks: any[] = [];
    const tasksJson = localStorage.getItem('tasks');
    tasks = tasksJson ? JSON.parse(tasksJson) : [];
    return tasks;
  }
  addTask(task: any): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  removeTask(taskIndex: number): void {
    const tasks = this.getTasks();
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  constructor() {}
}
