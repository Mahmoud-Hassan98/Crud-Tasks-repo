import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
}
