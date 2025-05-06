import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent   {
  signUpForm! : FormGroup ;
  
  constructor(private fb:FormBuilder ,  private AuthService : AuthService){

    this.signUpForm =   this.fb.group({
          userName : ["" , [Validators.required]],
          email : ["" , [Validators.required , Validators.email]],
          password : [ "" , [Validators.required , Validators.minLength(5)]],

    })
  }

  

  get email (){
    return this.signUpForm.get('email')
  }
  get password (){
    return this.signUpForm.get('password')
  }

  onSubmit(): void {
    console.log(this.signUpForm.value);
    
    this.AuthService.signUp(this.signUpForm.value).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        // Optionally redirect or show a success message
      },
      error: (error) => {
        console.error('Signup failed:', error);
        // Optionally show an error message to the user
      }
    });
  }
  

}
