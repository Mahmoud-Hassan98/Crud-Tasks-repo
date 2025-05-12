import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  getAllUsers(): Observable<any[]> {
   return this.http.get<any[]>("http://localhost:8080/user/get-users")

  }
  constructor(private http : HttpClient) {}
}
