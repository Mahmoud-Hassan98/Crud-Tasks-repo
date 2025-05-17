import { Component  ,ChangeDetectionStrategy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-my-tasks',
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule  ],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class MyTasksComponent {
      logoImage = 'assets/images/Logo.png';
}

