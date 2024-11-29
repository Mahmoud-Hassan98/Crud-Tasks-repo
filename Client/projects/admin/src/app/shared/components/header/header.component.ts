import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule if you are using router directives

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], // Import RouterModule to use router directives
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}
