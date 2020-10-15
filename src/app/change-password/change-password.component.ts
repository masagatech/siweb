import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global/global';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../services/other/toast-service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [UserService]
})
export class ChangePasswordComponent implements OnInit {
  imgParentPath: string = '';

  constructor(private router: Router, private global: GlobalService, private translate: TranslateService, private message: ToastService, private userService: UserService) {
    translate.use('en');
  }

  data: any = { newpwd: '', confpwd: '' };
  email: any = '';
  ngOnInit() {
    this.imgParentPath = this.global.getDomainEnvData().cloudinary_url + "cmp" + this.global.getCompany() + "/" + this.global.getCompanyLogo();
    this.email = this.global.getUser().email;
  }

  save() {
    if (this.data.newpwd !== this.data.confpwd) {
      this.message.showTranslate('warn', 'password_not_match', 'warn', this.translate);
      return false;
    }
    this.userService.changePwd({
      "id": this.global.getUser().id,
      "new_pass": this.data.newpwd,
      'operate': 'changepassword',
      'usertype': this.global.getUser().usertype
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.message.showTranslate('done', 'pwd_change_success', 'success', this.translate);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 200);
      }
      else {
        this.message.showTranslate('error', 'error_in_change_pwd', 'error', this.translate);
      }
    }, (error) => {
      this.message.show('error', error, 'error', this.translate);
    })
  }

}
