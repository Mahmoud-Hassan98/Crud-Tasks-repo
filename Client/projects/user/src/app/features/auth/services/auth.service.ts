import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  url : string = "loaclhost:8080/auth"
  private readonly tokenKey = 'token'
  public  loggedIn$ = new BehaviorSubject<boolean>(this.hasToken())

  constructor(private http : HttpClient) { 
  }
 
  

  signUp(user: any): Observable<any> {
    return this.http.post<{ token: string }>("http://localhost:8080/auth/register", user).pipe(
      tap(response =>{
        if(response?.token) {
          localStorage.setItem(this.tokenKey , response.token)
          this.loggedIn$.next(true);


        }
      }) ,catchError((error) => {
        console.error("Error during signup:", error);
        return throwError(error);  
      })
    );
  }
  
 login(user : any ) : Observable<any>{ 
  
  return this.http.post<{token : string}>("http://localhost:8080/auth/login" , user).pipe(
    tap(response =>{
        if(response.token) {
          localStorage.setItem(this.tokenKey , response.token)
          this.loggedIn$.next(true);
        }

    }),catchError((error) => {
      console.error("Error during signup:", error);
      return throwError(error);  
    })
  
  
  
  ) ;
 }

 logout() {
  localStorage.removeItem(this.tokenKey);
  this.loggedIn$.next(false)
}
private hasToken() :boolean {
  return !!localStorage.getItem(this.tokenKey);
    
}

}
