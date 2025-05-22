import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  logoImage = 'assets/images/Logo.png';
  loginImage = 'assets/images/login-image.png';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.AuthService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/my-tasks']);
        }, 2000);
      },
      error: (err) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);

        console.log(err);
      },
    });
  }
}
