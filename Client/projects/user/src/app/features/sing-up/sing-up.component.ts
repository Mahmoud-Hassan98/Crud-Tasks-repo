import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {
  singUpFrom! : FormGroup ;
  constructor(private fb:FormBuilder){

    this.singUpFrom =   this.fb.group({
          userName : ["" , [Validators.required]],
         email : ["" , [Validators.required , Validators.email]],
         password : [ "" , [Validators.required , Validators.minLength(5)]],
    })



  }

  onSubmit():void{
    console.log("sing up sucss" );
    
  }

}
