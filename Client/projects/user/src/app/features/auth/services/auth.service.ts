import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  url : string = "loaclhost:8080/authee"

  constructor(private http : HttpClient) { 
  }
 

  signUp(user: any): Observable<any> {
    return this.http.post("http://localhost:8080/auth/register", user).pipe(
      catchError((error) => {
        console.error("Error during signup:", error);
        return throwError(error);  
      })
    );
  }
  
 login(user : any ) : any{ 
    console.log("login sucss");
    
    console.log(this.url);
    console.log(user);
    
    // return this.http.post(this.url , user)
      
 }
}
