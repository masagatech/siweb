import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './../../../services/role/role-service'
import { GlobalService } from './../../../services/global/global';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DataTable } from 'primeng/datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MenuService } from '../../../services/menu/menu.service';
import { ToastService } from '../../../services/other/toast-service';
import { Helper } from '../../../helper';
import { GridComponent } from "../../usercontrols/grid/grid.comp";
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [RoleService]
})
export class RoleComponent implements OnInit {
  @ViewChild('dt')
  _dataTable: DataTable;
  @ViewChild('template') popupContainer;
  @ViewChild('grid') grid: GridComponent;
  helper: Helper
  modalRef: BsModalRef;
  items = [];
  selectedNodes = [];
  selectedRole: any = {};
  gridButtons: any = [];
  constructor(private router: Router, private role: RoleService, private global: GlobalService, private translate: TranslateService,
    private menuservice: MenuService, private modalService: BsModalService, private message: ToastService, private shortcut: HotkeysService) {

    translate.use(global.getLang());
  }
  buttons = [];
  isfav = false;
  checkallchk = false;
  rolelist: any = [];
  menulist: any = [];
  menuedit: any = [];
  roledata: any = {
    id: 0,
    rolename: '',
    roledesc: '',
    menus: null,
    active: true
  }
  menues = [];


  ngOnInit() {
    //this.bindGrid();
    // this.items = this.role.bindMenu()
    this.fetchMenu();
    this.buttons = [

      {
        'id': 'reset', 'color': 'white', 'bg': 'danger', 'text': 'Reset', 'iconi': 'fa fa-rotate-left', 'shortcut': 'ctrl+r'
      }, {
        'id': 'add', 'color': 'white', 'bg': 'info', 'text': 'Add', 'icon': 'plus', 'shortcut': 'ctrl+shift+a'
      },

      {
        'id': 'save', 'color': 'white', 'bg': 'success', 'access': true, 'text': 'Save', 'iconi': 'fa fa-save',
        'shortcut': 'ctrl+s', 'disabled': true
      }
    ];
    this.gridButtons = [{
      'id': 'edit', 'color': 'white', 'bg': 'info', 'text': 'Edit', 'iconi': 'fa fa-edit', 'btnstyle': this.global.btnStyle
    }, {
      'id': 'assignmenu', 'color': 'white', 'bg': 'warning', 'text': 'Assign', 'isrequired': true, 'iconi': 'fa fa-arrow-right', 'btnstyle': this.global.btnStyle
    }];
    this.addShortCuts();
  }

  add() {
    this.clear();
    this.openModal(this.popupContainer);
  }
  openModal(content: string) {
    if (this.modalService.getModalsCount() == 0) {
      this.modalRef = this.modalService.show(content);
    }
  }
  closeModal() {
    this.modalRef.hide();
  }

  buttonClicks(id) {
    switch (id) {
      case 'filter':
        this.grid.advt.showModal()
        break;
      case 'add':
        this.add();
        break;
      case 'save':
        this.saveMenu();
        break;
      case 'reset':
        this.clear();
        break;
      default:
        break;
    }
  }

  bindGrid() {
    this.role.getRole({
      'type': 'all'
    }).subscribe((data) => {
      let roles = data['resultValue'];
      for (let index = 0; index < roles.length; index++) {
        const element = roles[index];
        if (element.menus === null || element.menus === '') {
          element.menus = [];
        } else {
          element.menus = JSON.parse(element.menus);
        }
        this.rolelist.push(element)
      }
    });
  }



  group = {};
  fetchMenu() {
    this.menuservice.getMenu({
      'type': 'admin'
    }).subscribe(data => {
      if (data.resultKey == 1) {
        //this.menulist = data.resultValue;

        this.menues = this.simplifydata(common.menubind(data.resultValue));

        // this.group = arr[1];
        // this.items = arr[0];
      }
    })
  }





  simplifydata(menu) {

    let menun = [];
    for (var k in menu) {
      const mainmenu = menu[k]
      // if (mainmenu.label === 'Reports') {
      //   debugger
      // }

      let parantname = "";
      if (mainmenu.isclickable == 0) {
        parantname = mainmenu.label;
      } else {
        mainmenu.parent = 'test';
        let action = mainmenu.action.split(',');
        var d = [];
        for (let l = 0; l < action.length; l++) {
          const act = action[l];
          d.push({ act: false, val: act });

        }
        mainmenu.act = false;
        mainmenu.action = d;

        menun.push(mainmenu);
      }

      let child = mainmenu.children;
      this.pushChilds(child, menun, parantname);
    }
    return menun;
  }


  pushChilds(child, menun, parantname) {
    if (!child) {
      return;
    }

    for (let i = 0; i < child.length; i++) {

      let element = child[i];

      if (element.isclickable == 0) {

        console.log(parantname);
        let parent =  parantname + ' > ' + element.label;
        if (element.children) {
          this.pushChilds(element.children, menun, parent);
          
        }
      } else {
        if (!element.action) {
          return;
        }
        let action = element.action.split(',');
        var d = [];
        for (let l = 0; l < action.length; l++) {
          const act = action[l];
          d.push({ act: false, val: act });

        }
        element.action = d;
        element.act = false;
        element.parant = parantname;
        menun.push(element);
      }
    }

  }


  save() {

    this.role.saveRole(this.roledata).subscribe((data: any) => {
      if (data.resultKey == 1) {
        let sdata = data.resultValue;
        if (this.roledata.id == 0) {
          this.grid.insert({
            id: sdata.id,
            rolename: sdata.rolename.replace("'", ' '),
            roledesc: sdata.roledesc.replace(/(?:\r\n|\r|\n)/g, ' ').replace("'", ' '),
            active: (sdata.active) ? 'Yes' : 'No',
            menus: sdata.menus
          });
        }
        else {
          this.updateRow(this.roledata.id);
        }
        this.message.showTranslate('done', 'saved_success', 'success', this.translate)
        this.closeModal();
      }
      else if (data.resultKey == 0) {
        this.message.show('error', data.defaultError, 'error', this.translate);
      }
    });
  }
  updateRow(id) {
    debugger
    this.role.getRole({
      'type': 'id',
      'operate':'edit',
      'id': id
    }).subscribe((d: any) => {
      if (d.resultKey == 1) {
        let res = d.resultValue;
        this.selectedRole.id = res.id;
        this.selectedRole.rolename = res.rolename;
        this.selectedRole.roledesc = res.roledesc;
        this.selectedRole.menus = res.menus;
        this.selectedRole.active = (res.active == 1) ? 'Yes' : 'No';
      }
    });
    this.clear();
  }
  checkAll() {
    let a = this.menues;
    for (let index = 0; index < a.length; index++) {
      a[index].act = this.checkallchk;

      // this.selectMainMenu(a[index])
      // if (this.checkallchk == true) {
      //   a[index]['act'] = true;
      // }
      // else if (this.checkallchk == false) {
      //   a[index]['act'] = false;
      // }
      this.selectAll(a[index]);
    }
  }


  saveMenu() {
    if (this.selectdRole === undefined) {
      return false;
    }
    // prepare data for save
    var a = [];
    for (var i in this.menuedit.menus) {
      var b = [];
      let item = this.menues[i];

      var action = item.action;
      for (var j in action) {
        if (action[j].act === true) { b.push(action[j].val); }
      }
      if (b.toString() !== "") {
        a.push({ id: item.id, action: b.toString() });
      }
    }
    this.role.saveRole({
      id: this.menuedit.id,
      menus: JSON.stringify(a)
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        this.updateRow(this.menuedit.id);
        this.clear();
        this.buttons[2].disabled = true;
        this.message.showTranslate('done', 'saved_success', 'success', this.translate)
      }
      else if (data.resultKey == 2) {
        this.message.show('error', data.defaultError, 'error', this.translate);
      }
    });
  }

  selectdRole = undefined;

  fillMenu(itemData) {
    this.clear();
    this.selectdRole = itemData;
    // debugger
    if (itemData.menus !== null) {
      var existMenu = JSON.parse(itemData.menus);
      for (var i in existMenu) {
        let itm = existMenu[i];
        const d = this.menues.find((a) => {
          return a.id === itm.id
        })
        if (d != undefined) {
          var action = d.action;
          for (var j in action) {
            if (itm.action.includes(action[j].val)) {
              action[j].act = true;
            }
          }
        }
      }
    }

    this.menuedit = { id: itemData.id, menus: this.menues };
    this.selectedRole = itemData;
  }

  addShortCuts() {

    // shortcuts
    this.shortcut.add(new Hotkey(['ctrl+a', 'meta+shift+a'], (event: KeyboardEvent): boolean => {
      this.add()
      return false; // Prevent bubbling
    }, ['INPUT', 'TEXTAREA', 'SELECT'], 'Show add popup'));
  }

  edit(itemData) {
    
    this.clear()
    this.selectedRole = itemData;
    this.role.getRole({
      'type': 'id',
      'operate': 'edit',
      'id': itemData.id
    }).subscribe((data: any) => {
      const _rdata = data['resultValue'][0];
      this.buttons[2].disabled = true;
      this.roledata = {
        id: _rdata.id,
        rolename: _rdata.rolename,
        roledesc: _rdata.roledesc,
        menus: _rdata.menus,
        active: _rdata.active == 1 ? true : false
      }
      this.openModal(this.popupContainer);
    });
  }

  onRowSelect(e) {
    console.log(e);
  }

  clearAllMenu() {

    for (var i in this.menues) {
      let item = this.menues[i];
      item.act = false;
      if (item.action) {
        for (let index = 0; index < item.action.length; index++) {
          const element = item.action[index];
          element.act = false;

        }
      }
    }

  }

  clear() {
    this.buttons[2].disabled = false;
    this.clearAllMenu();
    this.roledata = {
      id: 0,
      rolename: '',
      roledesc: '',
      menus: null,
      active: true
    }
    this.selectdRole = undefined;
  }


  selectMainMenu(menu) {

    for (let k = 0; k < menu.value.length; k++) {
      const element = menu.value[k];
      element.act = menu.act;
      this.selectAll(element)

    }
  }

  selectAll(menu) {
    for (var i in menu.action) {

      menu.action[i]['act'] = menu.act;

    }
  }
  deselectMenu(menu) {

    for (var i in menu.action) {

      if (menu.action[i].act === false) {
        menu.act = false;
        break
      }
    }
    console.log(menu);
  }

  onAction(dt) {
    console.log(dt);
    switch (dt[0].id) {
      case 'edit':
        this.edit(dt[1]);
        break;
      case 'assignmenu':
        this.fillMenu(dt[1]);
        break;
      default:
        break;
    }
  }

}
