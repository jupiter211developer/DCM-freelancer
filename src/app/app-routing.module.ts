
import { RegisterComponent } from './auth/register/register.component';
import { SendRequestComponent } from './auth/reset-password/send-request/send-request.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MyProfileHomeComponent } from './core/my-profile-home/my-profile-home.component';

const routes: Routes = [

  //{ path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'send-request', component: SendRequestComponent },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  {
    path: 'me', component: MyProfileHomeComponent, children: [
      { path: '', loadChildren: () => import('./me/me.module').then(m => m.MeModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
