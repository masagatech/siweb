import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';
import { ToastService } from '../../../services/other/toast-service';
import { GridComponent } from '../../usercontrols/grid/grid.comp';
import { Subject } from 'rxjs';
import { DataTable } from 'primeng/datatable';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from './../../../services/global/global';
import { HttpClient } from '@angular/common/http';
import { Momservice } from '../../../services/mom-service';



@Component({
  selector: 'app-languagesetting',
  templateUrl: './languagesetting.component.html',
  styleUrls: ['./languagesetting.component.scss']
})
export class LanguagesettingComponent implements OnInit {
  @ViewChild('dt')
  _dataTable: DataTable;
  dtTrigger: any = new Subject();
  buttons: any = [];
  isfav = false;
  language: any = {};
  languageList: any = [];
  languageprefrenceList: any = [];
  langpref = '';
  selectedLanguage: any = '';
  isGrid = true;
  languageList_text = '';
  ind: any = {
    key: '',
    primaryVal: ''
  }

  constructor(private momService: Momservice, private global: GlobalService, private translate: TranslateService, private message: ToastService, private settingService: SettingsService) {
    translate.use(global.getLang());

  }

  ngOnInit() {
    this.buttons = [
      {
        'id': 'save', 'color': 'white', 'bg': 'success', 'text': 'Save', 'iconi': 'fa fa-save', 'shortcut': 'ctrl+s', 'access': true
      }, {
        'id': 'toggle', 'color': 'white', 'bg': 'info', 'text': 'Grid/Text', 'iconi': 'fa fa-text-width', 'shortcut': 'ctrl+t', 'access': true
      }]
    // this.loadPrimaryLanguage();
    this.loadLanguageListFromMom();
  }
  buttonClicks(id) {
    switch (id) {
      case 'save':
        this.save();
        break;
      case 'toggle':
        this.isGrid = !this.isGrid;
        if (!this.isGrid) {
          this.languageList_text = JSON.stringify(this.languageList, undefined, 4);
        } else if (this.languageList_text != '') {
          this.languageList = JSON.parse(this.languageList_text);
        }

        break;

      default:
        break;
    }
  }

  loadPrimaryLanguage() {
    this.settingService.getLanguagsetting({
      'type': 'getEn'
    }).subscribe((res: any) => {
      const data = res.resultValue;
      Object.keys(data).map((keys, index) => {

        this.languageList.push({
          'key': keys,
          primaryVal: data[keys],
          secondaryVal: data[keys]
        })
      });

      this.dtTrigger.next();
    })
  }


  save() {
    const englishLangData = {};
    const otherLangData = {};
    for (let i = 0; i < this.languageList.length; i++) {
      const element = this.languageList[i];
      englishLangData[element.key] = element.primaryVal;
      otherLangData[element.key] = element.secondaryVal;
    }
    try {
      this.settingService.saveLanguagesetting({
        "langpref": this.langpref,
        "otherLangData": otherLangData
      }).subscribe((data: any) => {
        if (data.resultKey == 1) {
          this.message.showTranslate('success', 'lang_update_success', 'success', this.translate);
        }
        else {
          this.message.show('error', data.defaultError, 'error', this.translate);
        }
      }, (error) => {
        this.message.show('error', error, 'error', this.translate);
      });
    } catch (error) {
      this.message.show('error', error, 'error', this.translate);
    }
  }

  loadLanguageListFromMom() {
    this.momService.getMom({
      'type': 'ddl',
      'group': 'language'
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        this.languageprefrenceList = data.resultValue;
      }
    })
  }

  onLangChange(event) {
    this.selectedLanguage = event.target.value.toLowerCase();
    if (this.languageList.length == 0) {
      this.loadPrimaryLanguage()
    }
    this.settingService.getLanguagsetting({
      'type': 'getOtherLang',
      'data': event.target.value
    }).subscribe((res: any) => {
      const data = res.resultValue;
      for (let i = 0; i < this.languageList.length; i++) {
        const el = this.languageList[i];
        if (data[el.key]) {
          el.secondaryVal = data[el.key];
        } else {
          el.secondaryVal = '';
        }
      }

      this.dtTrigger.next();
    })
  }

  addNewKey() {
    if (this.ind.key.trim() == '') {
      this.message.show('error', 'Key is required', 'error', this.translate);
      return;
    }
    if (this.ind.primaryVal.trim() == '') {
      this.message.show('error', 'Key is required', 'error', this.translate);
      return;
    }
    this.languageList.splice(0, 0, {
      'key': this.ind.key,
      primaryVal: this.ind.primaryVal,
      secondaryVal: this.ind.primaryVal
    })
    this.ind.key = '';
    this.ind.primaryVal = '';
    this.ind.secondaryVal = '';
  }


}
