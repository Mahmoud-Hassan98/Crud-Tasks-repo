import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  tokenKey : string = 'token'
  public loggedIn$ = new BehaviorSubject<boolean>(this.hasToken())
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>("http://localhost:8080/auth/login", {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response?.token) {
           this.loggedIn$.next(true)
            this.storeToken(response.token);
          }
        })
      );
  }

  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

 public logout(): void {
    localStorage.removeItem(this.tokenKey)
    this.loggedIn$.next(false)
 }
 
  private hasToken():boolean {
     return !!localStorage.getItem(this.tokenKey)
   }

}
