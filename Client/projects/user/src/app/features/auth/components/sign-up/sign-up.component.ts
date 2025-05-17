import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  logoImage = 'assets/images/Logo.png';

  signImage = 'assets/images/signup.png';
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  get userName() {
  return this.signUpForm.get('userName');
}
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  onSubmit(): void {
    console.log(this.signUpForm.value);

    this.AuthService.signUp(this.signUpForm.value).subscribe({
      next: (response) => {
        this.spinner.show();
        console.log('Signup successful:', response);
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/my-tasks']);
        }, 2000);
      },
      error: (error) => {
        console.error('Signup failed:', error);
      },
    });
  }
}
