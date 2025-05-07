import { AuthService } from './../../../features/auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  constructor(private  authService : AuthService, private router : Router){
     this.authService.loggedIn$.subscribe(state =>{
      this.isLoggedIn = state
     })

   
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
