import { Component } from '@angular/core';
import { FormBuilder , FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFrom  : FormGroup
  constructor(private fb : FormBuilder) { 

    this.loginFrom  = this.fb.group({ 
      email : ['' , [Validators.required , Validators.email]],
      password : ['' , Validators.required]
    
    })
  }
  onSubmit() {
    console.log(this.loginFrom.value);
    
  }

}
