import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MyTaskService {
  private url: string = 'http://localhost:8080';
  getUserTasks(status: string): Observable<any[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<any[]>('http://localhost:8080/user/tasks', { params });
  }
  completeTask(taskId: number): Observable<any> {
    return this.http.post<any>(
      `${this.url}/user/${taskId}/complete-task`,
      null
    );
  }

  constructor(private http: HttpClient) {}
}
