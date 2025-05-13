import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageTaskService {
 getTasks(): Observable<any[]> {
  return this.http.get<any[]>("http://localhost:8080/task/get-tasks").pipe(
    tap(response => {
    }),
    catchError((error) => {
      console.error("Error during fetch tasks:", error);
      return throwError(() => error);
    })
  );
}
addTask(task: any): Observable<any> {
  return this.http.post<any>('http://localhost:8080/task/add-task', task).pipe(
    tap({
      next: (response) => {
      },
      error: (error) => {
        console.error('Error occurred while adding task:', error);
      }
    })
  );
}
  removeTask(taskIndex: number): void {

  }
  getAllUsers(): Observable<any[]> {
   return this.http.get<any[]>("http://localhost:8080/user/get-users")

  }
  constructor(private http : HttpClient) {}
}
