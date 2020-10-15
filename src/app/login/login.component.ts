import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginApiService } from '../services/login/login-api.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Helper } from '../helper';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from '../services/global/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../services/other/toast-service';
// import { passValidator} from '../modules/validator';
import { Momservice } from '../services/mom-service';
import { SettingsService } from '../services/settings/settings.service';
import { UserModel } from '../intefaces/userModel';
export class LoginDetail {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  providers: [SettingsService]
})
export class LoginComponent implements OnInit {
  contactReportlist: any = [];

  form: FormGroup; // for validation
  objlogindtl = new LoginDetail();
  lang: any = [];
  helper = {};
  constructor(private router: Router,
    private loginService: LoginApiService,
    private toastr: ToastrService, private translate: TranslateService,
    private http: HttpClientModule,
    public global: GlobalService,
    //private deviceService: DeviceDetectorService,
    private fb: FormBuilder, private message: ToastService,
    private momService: Momservice, private settingService: SettingsService
  ) {

    this.helper = new Helper();
    localStorage.setItem('lang', 'en');
    translate.setDefaultLang(localStorage.getItem('lang'));
  }

  onSubmit() {
    this.form.markAsTouched();
  }

  onChangeDropDown = function (objData) {
    this.translate.use(objData.id);
    localStorage.setItem('lang', objData.id);
  };

  ngOnInit() {
    $('#username').focus();
    this.checkIfUserLoggedIn();
    //this.bindLang();
  }

  validation = function () {
    if (this.objlogindtl.username === '') {
      this.toastr.error(this.helper.translate(this.translate, 'loginlogin'), this.helper.translate(this.translate, 'regreg'));
      return false;
    } else if (this.objlogindtl.password === '') {
      this.toastr.error(this.helper.translate(this.translate, 'loginlogin'), this.helper.translate(this.translate, 'regreg'));
      return false;
    }
    return true;
  };

  login = function () {
    
    this.global.clearUser();
    if (this.validation()) {
      this.loginService.checkCredential({ email: this.objlogindtl.username, password: this.objlogindtl.password, cmpcode: this.objlogindtl.cmpcode, nocomp: true }).subscribe(
        data1 => {

          let data = { 'resultValue': data1.resultValue.result, 'resultKey': data1.resultKey }

          if (data.resultKey === 1 || data.resultKey === 2) {

            const user: UserModel = {
              id: data.resultValue.userid,
              name: data.resultValue.name,
              token: data.resultValue.token,
              usertype:data.resultValue.usertype,
              rolename:data.resultValue.rolename
            };
            this.global.setUser(user);
            //this.setSetting();
            if (data.resultKey === 2) {
              this.router.navigateByUrl('/changepassword');
              return false;
            }
            this.router.navigateByUrl('/dashboard');

          } else {
            this.message.show('error', data1.defaultError, 'error', this.translate);
          }
        },
        error => {

          this.toastr.error(this.helper.translate(this.translate, 'loginlogin'),
            this.helper.translate(this.translate, 'regreg'));
        }
      );
    }
  };

  checkIfUserLoggedIn() {
    if (this.global.getUser() !== null && this.global.getUser().id !== undefined) {
      this.router.navigateByUrl('/dashboard');
      return;
    }

  }

  setSetting() {
    this.settingService.show({
      'type': 'GENERAL',
      'user_id': this.global.getUser().id
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        let data = JSON.parse(res.resultValue.jsondata);
        this.global.setEnvData({
          'decimal': data.decimal,
          'dateformat': data.dateformat,
          'defaultCur': data.currency
        });
      }
    })
  }

  bindLang() {
    this.momService.getLanguage({
      'type': 'ddl',
      'group': 'language'
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        this.lang = data.resultValue;
      }
    })
  }
  onLangChange = function (objData) {
    this.translate.use(objData.code);
    localStorage.setItem('lang', objData.code);

  }


}
