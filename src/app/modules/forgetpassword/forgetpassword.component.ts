import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogService } from 'primeng/primeng';
import { ToastService } from '../../services/other/toast-service';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global/global';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
  providers: [DialogService, UserService]
})

export class ForgetpasswordComponent implements OnInit {
  // @ViewChild('template') popupContainer;
  constructor(private message: ToastService, private global: GlobalService, private translate: TranslateService, private dialogService: DialogService, private modalService: BsModalService, private router: Router, private user: UserService) {
    translate.use(global.getLang());
  }
  userbevmail: any;
  forgetPass: any = false;
  changePassflaf: any = false;
  changePAsswordData: any = { id: '', new_pass: '', cnf_pass: '' };
  changePasswordOTPdata: any = { otp: '', bevmail: '' };
  ngOnInit() {


    //  this.openModal(this.popupContainer);
  }
  // openModal(content: string) {
  //   this.modalRef = this.modalService.show(content);
  // }
  // closeModal() {
  //   this.modalRef.hide();
  //   this.router.navigateByUrl('/login');
  // }

  save() {
    this.global.showLoader('Seding mail');
    // this.forgetPass = true;
    this.user.forgetPassword({
      'userbevmail': this.userbevmail,
      'type': 'user',
      'step': 1
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {

        this.message.showTranslate("OTP sent", 'sent_otp', 'success', this.translate);
        this.forgetPass = true;
        // this.message.showTranslate("Warning", 'sel_contract', 'warn', this.translate);
      }
      else {

        this.message.showTranslate("Warning", 'valid_user', 'warn', this.translate);
      }

      this.global.hideLoader();
    }, (err) => {
      this.global.hideLoader();
    })

  }


  submitOTP() {
    debugger
    this.user.otpSubmission({
      'userbevmail': this.userbevmail,
      'otp': this.changePasswordOTPdata.otp,
      'step': 2
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {

        this.changePassflaf = true;
        this.forgetPass = false;
      }
      else {
        this.message.showTranslate("Warning", 'val_otp', 'warn', this.translate);

      }

    })
  }


  changePAssword() {

    debugger
    this.user.updatePassword({
      'new_pass': this.changePAsswordData.new_pass,
      // 'cnf_pass': this.changePAsswordData.cnf_pass,
      'userbevmail': this.userbevmail,
      'step': 3

    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.message.showTranslate("done", 'sucess_password', 'success', this.translate);
        setTimeout(() => {
          this.global.clearUser();
          this.router.navigateByUrl('/login');
        }, 200);

      }
      else {

      }
    })


  }
}
