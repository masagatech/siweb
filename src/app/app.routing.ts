import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
//import { DefaultLayoutComponent } from './containers';
// import { DefaultLayoutComponent } from './containers';

import { P404Component } from './error/404.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetpasswordComponent } from './modules/forgetpassword/forgetpassword.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
      code: '999'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    data: {
      title: 'Change Password'
    }
  }
  ,
  {
    path: '',
    loadChildren: './modules/index.module#IndexModule',

  }
  , {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
