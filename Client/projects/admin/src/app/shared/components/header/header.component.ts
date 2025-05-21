import { LoginService } from './../../../features/auth/services/login.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ScrollNavbarDirective } from '../../../../../../user/src/app/shared/directives/scroll-navbar.directive';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule , CommonModule , ScrollNavbarDirective], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  logoImage = 'assets/images/Logo2.png';
  constructor(private loginService : LoginService , private router : Router){
    loginService.loggedIn$.subscribe(state=>{
      this.isLoggedIn = state
    })
    
  }
    logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
