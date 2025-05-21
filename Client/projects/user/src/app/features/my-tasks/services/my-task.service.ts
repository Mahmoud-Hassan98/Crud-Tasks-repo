import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class MyTaskService {
  getUserTasks(): Observable<any[]> {
    console.log("Just to keep the streak going");
    return this.http.get<any[]>("http://localhost:8080/user/tasks");
  }
  constructor(private http: HttpClient) {}
}
