import { CommonModule } from '@angular/common';
import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.loginForm.valueChanges.subscribe((value: any) => {
console.log(value);

    })
    
  }
  get email()
    {
    return this.loginForm.get('email');
  }
  get password()
    {
    return this.loginForm.get('password');
  }
      
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Login completed');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  
}
