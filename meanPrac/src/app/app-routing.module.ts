import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register-page/register-page.component';
import { AppComponent } from './app.component';
import { HomeLoginComponent } from './login-page/home-login.component';
import { UsersComponent } from './users-page/user.component';


const routes: Routes = [
  {path: '', component: HomeLoginComponent},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'users/:name', component: UsersComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [HomeLoginComponent, RegisterComponent, UsersComponent];
