import { Routes } from '@angular/router';
import { SignUpComponent } from './features/auth/components/sign-up/sign-up.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { MyTasksComponent } from './features/my-tasks/components/my-tasks/my-tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'my-tasks', pathMatch: 'full' }, 
  { path: 'sign-up', component: SignUpComponent },         
  { path: 'login', component: LoginComponent },
  { path: 'my-tasks', component: MyTasksComponent },
  { path: '**', redirectTo: 'my-tasks' }                    
];