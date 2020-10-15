import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginApiService } from '../services/login/login-api.service';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  objregl = new RegistrDetail();
  env = {}
  constructor(private router: Router,
              private loginService: LoginApiService,
              private toastr: ToastrService, private translate: TranslateService) { 
 
    this.env = environment;
    translate.setDefaultLang(this.env["selLang"]);
  }
  register = function(){
    this.env["users"].push({username: this.objregl.username, password: this.objregl.password });
 // for (let index = 0; index < this.env["user"].length; index++) {
    if(this.objregl.password==this.objregl.rep)
    this.router.navigateByUrl('/login');
    else
    {
      this.router.navigateByUrl('/register');
      this.toastr.success('password missmatch' );

    }
  }
}
export class RegistrDetail {
  username: string;
  password: string;
  email: string;
  rep: string;
}