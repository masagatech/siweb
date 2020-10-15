import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../../services/global/global';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../.././../services/settings/settings.service';
import { ToastService } from '../../../services/other/toast-service';
import { EnvData } from '../../../intefaces/env';
import { Momservice } from './../../../services/mom-service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  env: EnvData;
  constructor(private global: GlobalService, private translate: TranslateService,
    private settingService: SettingsService, private confirmationService: ConfirmationService, private message: ToastService, private MomService: Momservice) {
    translate.use(global.getLang());
    // this.env = this.global.getEnvData();
    // this.generaldata.decimal = this.env.decimal;
    // this.generaldata.dateformat = this.env.dateformat;

  }
  generaldata: any = {
    id: 0, company_name: '', address1: '', address2: '',
    telephone: '', currency: '', timezone: '', decimal: '', dateformat: '', loginattempt: '', interestrate: ''
  };  // Declared for form data
  generalList: any = [];
  currencyList: any = [];
  timezoneList: any = [];
  dateformatList: any = [];
  buttons = [];
  enableApi: boolean = false;
  isfav = false;
  ngOnInit() {
    this.bindGeneral();
    this.bindClientConfig();
    this.bindGroupDDL();
    this.buttons = [
      {
        'id': 'add', 'color': 'white', 'bg': 'success', 'text': 'Save', 'iconi': 'fa fa-save',
        'shortcut': 'ctrl+s',
        'disabled': false, 'type': 'submit'
      }, {
        'id': 'reset', 'color': 'white', 'bg': 'danger', 'text': 'Reset',
        'icon': 'refresh', 'shortcut': 'ctrl+r',
        'disabled': false
      }
    ]



  }
  buttonClicks(id) {
    switch (id) {
      case 'reset':
        this.reset();
        break;
      case 'fav':
        this.buttons[0].disabled = true;
        this.isfav = !this.isfav;
        break;
      default:
        break;
    }
  }

  bindGroupDDL() {
    this.MomService.getMom({
      'type': 'multigroup',
      'group': ['currency', 'timezone', 'dateformat']
    }).subscribe((data: any) => {
      if (data.resultKey === 1) {
        this.currencyList = data.resultValue.filter((a) => {
          return a.groups === 'currency';
        });
        this.timezoneList = data.resultValue.filter((a) => {
          return a.groups === 'timezone';
        });
        this.dateformatList = data.resultValue.filter((a) => {
          return a.groups === 'dateformat';
        });
      }
    });
  }

  /**
   * This method is used for create and edit data
   */
  save() {
    debugger
    this.settingService.create({
      'id': this.generaldata.id,
      'type': 'GENERAL',
      'user_id': this.global.getUser().id,
      'usercreated': this.global.getUser().id,
      'enableApi': this.enableApi,
      'dataset': {
        'GENERAL': {
          'company_name': this.generaldata.company_name.replace(/(')/, '`'),
          'address1': this.generaldata.address1.replace(/(')/, '`'),
          'address2': this.generaldata.address2.replace(/(')/, '`'),
          'telephone': this.generaldata.telephone,
          'currency': this.generaldata.currency,
          'timezone': this.generaldata.timezone,
          'decimal': this.generaldata.decimal,
          'dateformat': this.generaldata.dateformat,
          'loginattempt': this.generaldata.loginattempt,
          'interestrate': this.generaldata.interestrate

        },
        'BEVAPI': {
          'enableApi': this.enableApi == true ? 1 : 0
        }
      }
    }).subscribe((data: any) => {
      if (data.resultKey === 1) {
        if (data.resultValue !== null && data.resultValue !== 1) {
          const jsondata = JSON.parse(data.resultValue['jsondata']);
          const resdata = data.resultValue;
          this.generaldata = {
            'id': resdata.id,
            'type': resdata.type,
            'company_name': jsondata.company_name,
            'address1': jsondata.address1,
            'address2': jsondata.address2,
            'telephone': jsondata.telephone,
            'currency': jsondata.currency,
            'timezone': jsondata.timezone,
            'loginattempt': jsondata.loginattempt,
            'usercreated': this.global.getUser().id,
            'decimal': jsondata.decimal,
            'dateformat': jsondata.dateformat,
            'interestrate': jsondata.interestrate,
            'enableApi': jsondata.enableApi
          };
        }
        this.global.setEnvData({
          'decimal': this.generaldata.decimal,
          'dateformat': this.generaldata.dateformat,
          'defaultCur': this.generaldata.currency
        });

        this.message.showTranslate('done', 'saved_success', 'success', this.translate);
      }
    });

    // this.settingService.create({
    //   'id': this.generaldata.id,
    //   'type': 'BEVAPI',
    //   'user_id': this.global.getUser().id,
    //   'usercreated': this.global.getUser().id,
    //   'dataset': {
    //     'enableApi': this.enableApi == true ? 1 : 0
    //   }

    // }).subscribe((data: any) => {
    //   if (data.resultKey === 1) {
    //     if (data.resultValue !== null && data.resultValue !== 1) {
    //       const jsondata = JSON.parse(data.resultValue['jsondata']);
    //       const resdata = data.resultValue;
    //       this.enableApi = resdata.enableApi;
    //       // this.generaldata = {
    //       //   'id': resdata.id,
    //       //   'type': resdata.type,
    //       //   'company_name': jsondata.company_name,
    //       //   'address1': jsondata.address1,
    //       //   'address2': jsondata.address2,
    //       //   'telephone': jsondata.telephone,
    //       //   'currency': jsondata.currency,
    //       //   'timezone': jsondata.timezone,
    //       //   'loginattempt': jsondata.loginattempt,
    //       //   'usercreated': this.global.getUser().id,
    //       //   'decimal': jsondata.decimal,
    //       //   'dateformat': jsondata.dateformat,
    //       //   'interestrate': jsondata.interestrate,
    //       //   'enableApi': jsondata.enableApi
    //       // };
    //     }

    //     this.message.showTranslate('done', 'saved_success', 'success', this.translate);
    //   }
    // });

  }


  bindGeneral() {
    this.settingService.show({
      'type': 'GENERAL'
    }).subscribe((data: any) => {
      if (data.resultKey === 1) {
        if (data.resultValue !== null) {
          const jsondata = JSON.parse(data.resultValue['jsondata']);
          const resdata = data.resultValue;
          this.generaldata = {
            'id': resdata.id,
            'type': resdata.type,
            'company_name': jsondata.company_name,
            'address1': jsondata.address1,
            'address2': jsondata.address2,
            'telephone': jsondata.telephone,
            'currency': jsondata.currency,
            'timezone': jsondata.timezone,
            'decimal': jsondata.decimal,
            'dateformat': jsondata.dateformat,
            'loginattempt': jsondata.loginattempt,
            'interestrate': jsondata.interestrate,
            'usercreated': this.global.getUser().id
          };
        }
      }
    });
  }

  handleBevChange(e) {

    this.global.confirmBox.closable = false;
    let msg: any;
    if (e.checked) {
      msg = "Enable this option will create client on <b>Bevinco 20/20</b> platform. Do you want to enable?";

    } else {
      msg = "Disable this option will stop to create client on <b>Bevinco 20/20</b> platform. Do you want to disable?";
    }


    this.confirmationService.confirm({
      message: msg,
      header: 'Confirm',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {

        this.enableApi = e.checked;
        this.global.confirmBox.closable = true;

      },
      reject: () => {
        this.enableApi = !e.checked;
        this.global.confirmBox.closable = true;

      },
    });
  }

  bindClientConfig() {

    this.settingService.show({
      'type': 'BEVAPI'
    }).subscribe((data: any) => {
      if (data.resultKey === 1) {
        if (data.resultValue !== null) {
          const jsondata = JSON.parse(data.resultValue['jsondata']);
          const resdata = data.resultValue;

          //  'id' = resdata.id;
          // 'type' = resdata.type;
          this.enableApi = jsondata.enableApi;
          // 'usercreated' = this.global.getUser().id;

        }
      }
    });
  }

  reset() {
    this.bindGeneral();
    this.bindClientConfig();
  }
}
