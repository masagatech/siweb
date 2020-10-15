import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global/global';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogService } from 'primeng/primeng';
import { ToastService } from '../../../services/other/toast-service';
import { IndexLayoutComponent } from '../../index.component';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  providers: [UserService, DialogService],
  styleUrls: ['./userprofile-comp.scss']
})
export class UserprofileComponent implements OnInit {
  @ViewChild('template') popupContainer;

  profile: any = {
    name: '',
    email: '',
    ph_no: '',
    userid: '',
    active: '',
    bevmail:''
  }
  onModelShow = null;

  updatepass: any = {
    id: 0,
    old_pass: '',
    new_pass: '',
    cnf_pass: '' //cnf: Confirm
  }
  buttons: any = [];

  display: boolean = false;

  constructor(private router: Router, private global: GlobalService, private translate: TranslateService, private user: UserService, private modalService: BsModalService,
    private dialogService: DialogService, private message: ToastService, private index: IndexLayoutComponent) {
    translate.use(global.getLang());

  }
  modalRef: BsModalRef;

  ngOnInit() {
    this.onModelShow = this.modalService.onShown.subscribe((evt) => {
      $('#old_pass').focus();
    });
    // this.getUserinfo();

    // this.buttons = [
    //   {
    //     'id': 'chpwd', 'color': 'white', 'bg': 'info', 'text': 'Change Password', 'icon': 'plus', 'shortcut': 'ctrl+shift+c'
    //   }
    //   // {
    //   //   'id': 'filter', 'color': 'white', 'bg': 'primary', 'text': 'Advance Search', 'iconi': 'fa fa-search', 'shortcut': 'ctrl+shift+f'
    //   // }
    // ];
    
    this.getProfile();
  }

  clear() {
    this.updatepass = {
      id: 0,
      old_pass: '',
      new_pass: '',
      cnf_pass: '' //cnf: Confirm
    }
    setTimeout(() => {
      $('#old_pass').focus();

    }, 150);
  }
  buttonClicks(id) {
    switch (id) {
      // case 'filter':
      //   this.grid.advt.showModal()
      //   break;
      case 'save':
        // this.add();
        this.save();

        break;
      // case 'fav':
      //   this.isfav = !this.isfav;
      //   break;
      default:
        break;
    }
  }
  getProfile() {

    this.user.getUser({
      'type': 'userprofile',
      'id': this.global.getUser().id,
    }).subscribe((data: any) => {

      const _rdata = data['resultValue'];
      this.profile = {
        // name: _rdata.name,
        email: _rdata.email,
        // name: this.global.user.name,
        mobileno: _rdata.mobileno,
        phone1: _rdata.phone1,
        phone2: _rdata.phone2,
        active: _rdata.active == 1 ? 'Yes' : 'No',
        bevmail:_rdata.bevmail
      }


      this.profile.userid = this.global.getUser().id;
      this.profile.name = this.global.user.name;
      //this.profile.email = this.global.user.email;

    });
  }
  // getUserinfo() {



  // }

  openModal(content: string) {
    this.modalRef = this.modalService.show(content);
  }
  closeModal() {
    this.modalRef.hide();
  }
  // showDialog() {

  //   this.display = true;
  //   $('#old_pass').focus();
  // }
  // CloseDialog() {
  //   this.display = false;
  // }
  add() {
    this.clear();
    this.openModal(this.popupContainer);
  }
  onLinkClick(data) {
    this.openModal(this.popupContainer);
    // this.dialogService.open(LogsComponent, {
    //   data: {
    //     id: data[1].id,
    //     columnName: data[0]
    //   },
    //   header: 'Contract Logs',
    //   width: '100%',
    //   styleClass: 'pop'
    // });
  }
  save() {

    this.user.changePass({
      // 'type': ,
      "id": this.global.getUser().id,
      "old_pass": this.updatepass.old_pass,
      "new_pass": this.updatepass.new_pass,
      "cnf_pass": this.updatepass.cnf_pass
    }).subscribe((data: any) => {
      if (data.errorCode !== null) {
        this.message.showTranslate("error", data.defaultError, 'error', this.translate);
      }
      else {
        let isSuccess = true
        if (isSuccess) {
          this.message.showTranslate("done", 'saved_success', 'success', this.translate);
          //  this.CloseDialog();
          this.index.logout();
          // this.router.navigate(['/login']);
        }
      }
    });
    this.clear();
    this.closeModal();
    setTimeout(() => {
      this.message.showTranslate("done", 'saved_success', 'success', this.translate);

    }, 1000);



  }

}
