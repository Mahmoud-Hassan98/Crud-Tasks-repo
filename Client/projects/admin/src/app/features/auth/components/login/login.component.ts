import { CommonModule } from '@angular/common';
import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  logoImage = 'assets/images/Logo.png';
  loginImage = 'assets/images/login-image.png';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    // this.loginForm.valueChanges.subscribe((value: any) => {});
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.toaster.success('success', 'Login Success');
            this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
              this.router.navigate(['/tasks']);
            }, 1000);
          },
          error: (error) => {
            this.spinner.hide();

            this.toaster.error(error.error.message);
            this.spinner.hide();
          },
          complete: () => {
            console.log('Login completed');
          },
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
