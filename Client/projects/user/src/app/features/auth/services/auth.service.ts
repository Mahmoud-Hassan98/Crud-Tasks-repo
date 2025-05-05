import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  url : string = "/user"

  constructor(private http : HttpClient) { 
  }
 

  singUp(user : any ) : any{ 
    console.log(111111);
    console.log(this.url);
    return this.http.post(this.url , user)
      
 }
 login(user : any ) : any{ 
    console.log("login sucss");
    
    console.log(this.url);
    console.log(user);
    
    // return this.http.post(this.url , user)
      
 }
}
