import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule , CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm! : FormGroup ;

  constructor(private fb :FormBuilder , 
    private AuthService : AuthService
  ) {

   
     this.loginForm = this.fb.group({
       email  : ['' , [Validators.required  , Validators.email]] , 
       password  : ['' , Validators.required ]

     })
  }
  get email (){
    return this.loginForm.get('email')
  }
  get password (){
    return this.loginForm.get('password')
  }

  onSubmit():void{
    this.AuthService.login(this.loginForm.value)
  
}
  

}
