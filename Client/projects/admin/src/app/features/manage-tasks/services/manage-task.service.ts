import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageTaskService {
 getTasks(): Observable<any[]> {
  return this.http.get<any[]>("http://localhost:8080/admin/get-tasks").pipe(
    tap(response => {
    }),
    catchError((error) => {
      console.error("Error during fetch tasks:", error);
      return throwError(() => error);
    })
  );
}
addTask(formData: FormData): Observable<any> {  
  console.log(formData);
  
  return this.http.post<any>('http://localhost:8080/admin/add-task', formData).pipe(
    tap({
      next: (response) => {
      },
      error: (error) => {
        console.error('Error occurred while adding task:', error);
      }
    })
  );
}

  getAllUsers(): Observable<any[]> {
   return this.http.get<any[]>("http://localhost:8080/admin/get-users")

  }

public removeTask(taskId: number): Observable<any> {
  if (!taskId) {
    console.error('Invalid task ID:', taskId);
    return throwError(() => new Error('Invalid task ID'));
  }
   
  const url = `http://localhost:8080/admin/${taskId}/remove-task`;
  return this.http.delete<any>(url).pipe(
    tap(() => console.log(`Task ${taskId} deleted successfully`)),
    catchError(error => {
      console.error('Error deleting task:', error);
      return throwError(() => error);
    })
  );
}

  updateTask(formData : FormData , taskId : number) : Observable<any> {
    return this.http.put(`http://localhost:8080/admin/${taskId}/update-task`, formData) 
  }
  constructor(private http : HttpClient) {}
}
