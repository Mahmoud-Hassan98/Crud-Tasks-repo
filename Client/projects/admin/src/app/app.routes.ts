import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { ManageUsersComponent } from './features/manage-users/components/manage-users/manage-users.component';
import { ManageTasksComponent } from './features/manage-tasks/components/manage-tasks/manage-tasks.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: ManageUsersComponent },
  { path: 'tasks', component: ManageTasksComponent },
  { path: 'tasks', component: NotFoundComponent },
];
