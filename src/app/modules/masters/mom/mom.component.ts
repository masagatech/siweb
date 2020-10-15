import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from './../../../services/global/global';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastService } from '../../../services/other/toast-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Momservice } from '../../../services/mom-service';
import { ActivatedRoute } from '@angular/router';
import { PeriodToText } from "../../../pipes/periodtotext.pipe";
import { DataTable } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
// import undefined = require('firebase/empty-import');

@Component({
  selector: 'app-mom',
  templateUrl: './mom.component.html',
  styleUrls: ['./mom.component.scss'],
  providers: [PeriodToText],
})
export class MomComponent implements OnInit {
  @ViewChild('dt') _dataTable: DataTable;
  @ViewChild('template') popupContainer;
  @ViewChild('template1') addNewgroup;

  @ViewChild('temp') popup;



  momList: any[];
  groups: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  modalRef: BsModalRef;
  selectedMaster: any = {};
  private selectedItem: any = {};
  buttons = [];
  isfav = false;
  lblrow1: string;
  showtxtctrlrow1: boolean = true;
  codeExist = false;
  month: number = 0;
  year: any = 0;
  onModelShow = null;
  showGrid: boolean = false;
  isClassification: boolean = false;


  constructor(private router: Router, private translate: TranslateService,
    private global: GlobalService, private message: ToastService,
    private modalService: BsModalService, private momService: Momservice,
    private route: ActivatedRoute, private periodToText: PeriodToText) {



    translate.use(global.getLang());
    this.groups = [];
    // this.mom.groups = this.route.snapshot.paramMap.get('group');
  }
  mom: any = {
    code: '',
    name: '',
    description: '',
    groups: '',
    remark: '',
    active: true,
    usercreated: '',

  };

  // add new group code
  newGroup: any = {
    id: 0,
    code: '',
    description: '',
    active: true,
    usercreated: ''


  }
  isNewgroup: any = '';
  // END add new group code

  ngOnInit() {

    this.bindGroup();
    this.buttons = [
      {
        'id': 'add', 'color': 'white', 'bg': 'info', 'text': 'Add', 'icon': 'plus', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ]

    this.onModelShow = this.modalService.onShown.subscribe((evt) => {
      setTimeout(() => {
        if (this.selectedItem.code) {
          $('#name').focus();
        } else {

          $('#code').focus();
        }

      }, 100);

    });

  }

  checkAvailability() {
    if (!this.mom.code.trim()) {
      return
    }
    /**
     * If group is date period then following code will execute
     */
    if (this.mom.groups === "contractperiod") {
      this.mom.name = this.convertPeriodToText(this.mom.code.trim());
    }
    this.momService.getMom({
      'type': 'exist',
      'code': this.mom.code.trim(),
      'group': this.mom.groups
    }).subscribe((res: any) => {
      this.codeExist = res.resultKey == 1 ? true : false;
    });
  }

  convertToValidPeriod(data) {
    // 0.36
    // debugger    
    const a = data.split('.');

    this.year = a[0];
    this.month = 0;
    if (a.length > 1) {
      this.month = parseInt(a[1] === '' ? '0' : a[1]);
    }

    if (this.month < 12 && this.month > 0) {
      return (this.year > 0) ? this.year + '.' + this.month : '0.' + this.month;
    }
    else {
      let newYear = Math.floor(this.month / 12);
      newYear = parseInt(this.year) + newYear;
      let splitMonth = this.month % 12;
      return (!isNaN(newYear)) ? (splitMonth > 0 ? newYear + '.' + splitMonth : newYear + '.0') : '';
    }
    return '';
  }

  convertPeriodToText(data) {
    let period = this.convertToValidPeriod(data);
    this.mom.code = period;
    let str = '';
    try {
      if (period === '') { return; }
      const a = period.split('.');

      this.year = parseInt(a[0]);
      this.month = 0;
      if (a.length > 1) {
        this.month = parseInt(a[1] === '' ? '0' : a[1]);
      }
      if (this.year > 0) {
        str = this.year + ' year';
      }

      if (this.month > 0) {
        str += ' ' + this.month + ' months';
      }
      return str;
    } catch (error) {
      return str;
    }
  }

  buttonClicks(id) {
    switch (id) {
      case 'add':
        this.add();
        break;
      case 'fav':
        this.buttons[0].disabled = true;
        this.isfav = !this.isfav;
        break;
      default:
        break;
    }
  }
  clear() {
    this.mom = {
      code: '',
      name: '',
      description: '',
      remark: '',
      groups: this.mom.groups,
      active: true,
      usercreated: '',
      updated_at: ''
    };

    this.newGroup = {
      id: 0,
      code: '',
      description: '',
      active: true,
      usercreated: ''
    }
    this.selectedItem = {};
    $('#code').focus();
    this.codeExist = false;
  }
  onRowClick(d) {


    this.clear();
    this.showGrid = true;
    this.buttons[0].disabled = false;
    this.selectedMaster = d;
    this.mom.groups = d.code;
    this.isClassification = this.mom.groups == 'classification' ? true : false;
    this.bindGrid();
  }
  //  add() {
  //    this.clear();
  //    this.openModal(this.popupContainer);
  //  }
  openModal(content: string) {
    this.modalRef = this.modalService.show(content);
  }

  add() {
    this.clear();
    this.openModal(this.popupContainer);
  }
  save() {
    debugger



    this.momService.saveMom({
      //     //  'id': this.mom.id,
      'code': this.mom.code,
      'name': this.mom.name,
      'id': this.mom.id,
      'description': this.mom.description,
      // 'groups': this.isNewgroup == "group" ? "group" : this.mom.groups,
      'groups': this.mom.groups,
      'remark': this.mom.remark,
      'active': this.mom.active,
      'flag': 'flag',
      'usercreated': this.global.getUser().id,
      'createdby': this.global.getUser().id,


    }).subscribe((data: any) => {
      if (data.errorCode != "") {

        this.message.show('error', data.resultValue.result, 'error', this.translate);
      } else {
        if (data.resultKey == 1) {
          let isnew = false;

          if (this.selectedItem.id === undefined) {
            isnew = true;
            this.selectedItem = {};
          }
          //  this.selectedItem.country_id = data.resultValue.id;
          this.selectedItem.code = this.mom.code;
          this.selectedItem.name = this.mom.name;
          this.selectedItem.groups = this.mom.groups;
          this.selectedItem.description = this.mom.description;
          this.selectedItem.remark = this.mom.groups;
          this.selectedItem.active = this.mom.active;
          this.selectedItem.usercreated = this.mom.usercreated;
          this.selectedItem.id = data.resultValue.id;

          if (isnew) {
            let momlists = this.momList != undefined ? [...this.momList] : [];
            momlists.push(this.selectedItem);
            this.momList = momlists;
          }
          this.message.showTranslate('done', data.resultValue.result, 'success', this.translate);
          this.closeModal();
          this.clear();

          // location.reload();
        }
        this.closeModal();

      }

    });
    this.isNewgroup = '';
  }
  edit(item) {

    debugger
    this.clear();
    this.selectedItem = item;

    this.momService.getMom({
      'operate': 'id',
      'id': item.id
    }).subscribe((data) => {

      const _rdata = data['resultValue'];

      this.selectedItem = item;
      this.mom = {
        id: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
        remark: _rdata[0].remark,
        groups: item.groups,
        active: item.active
      };
      this.openModal(this.popupContainer);
    });

  }
  closeModal() {
    this.modalRef.hide();
    this.isNewgroup = '';
  }
  bindGroup() {

    this.momService.getMom({
      'type': 'groups',
      'operate': 'multigroupformom'
    }).subscribe((data) => {
      this.groups = data['resultValue'];
    });
    this.dtTrigger.next();
  }

  bindGrid() {

    if (this._dataTable) {
      this._dataTable.reset();
    }
    switch (this.mom.groups) {
      case "contracttype":
        this.lblrow1 = "code";
        this.showtxtctrlrow1 = false;
        break;


      default:
        this.lblrow1 = "code";
        this.showtxtctrlrow1 = true;
        break;
    }
debugger
    this.momService.getMom({
      'operate': 'grid',
      'group': this.mom.groups
    }).subscribe((data) => {
      this.momList = data['resultValue'];
    });
    this.dtTrigger.next();
    console.log(this.momList);
  }

  onchange(e, dt) {
    if (e === 'all') {
      dt.reset();
    } else {

      dt.filter(e, 'active', 'equals');

    }
  }
  // CHINMAY code to add new group
  // addNew(flag) {
  //   debugger
  //   if (flag == 'group') {
  //     this.isNewgroup = flag;
  //     this.selectedMaster.name = "Master";
  //     //this.selectedMaster.name = 'Group';
  //   } else {
  //     this.isNewgroup = 'type';
  //   }

  //   this.openModal(this.popupContainer);

  // }

  // saveNewGroup() {

  //   this.momService.saveMom({
  //     //     //  'id': this.mom.id,
  //     'flag': 'newgroup',
  //     'code': this.newGroup.code,
  //     'name': this.newGroup.name,
  //     'id': this.newGroup.id,
  //     'description': this.newGroup.description,
  //     'group': 'group',
  //     'active': this.newGroup.active,
  //     'usercreated': this.global.getUser().id,


  //   }).subscribe((data: any) => {
  //     if (data.errorCode !== null) {
  //       this.message.show('error', data.errorCode, 'error', this.translate);
  //     } else {
  //       if (data.resultValue.id) {

  //       }
  //       this.closeModal();
  //     }
  //   });
  // }

  // CHINMAY END code to add new group

}
