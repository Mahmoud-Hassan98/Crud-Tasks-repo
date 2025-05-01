import { ManageUsersService } from './../../services/manage-users.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-users',
  imports: [MatButtonModule , MatTableModule , DatePipe],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
  providers:[DatePipe,]
})
export class ManageUsersComponent implements OnInit {

  users: any[] = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'assigned task',
    'status',
     'action'
    
  ];

  constructor(private ManageUsersService : ManageUsersService){
    
    
  }
     ngOnInit(): void {
      this.loadUsers();
     }   
    loadUsers(){
      this.users =  this.ManageUsersService.getUsers()
    }


}
