import { Routes } from '@angular/router';
import { SignUpComponent } from './features/auth/components/sing-up/sign-up.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { MyTasksComponent } from './features/my-tasks/components/my-tasks/my-tasks.component';

export const routes: Routes = [
  { path: '', component: MyTasksComponent },
  { path: 'sing-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-tasks', component: MyTasksComponent },

];
