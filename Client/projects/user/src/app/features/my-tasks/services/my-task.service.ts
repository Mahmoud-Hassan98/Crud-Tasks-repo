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
    
    const userId = this.getUserId();
    
    return this.http.get<any[]>("http://localhost:8080/user/tasks");
  }
  constructor(private http: HttpClient) {}
  getUserId(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub;
    }
    return;
  }
}
