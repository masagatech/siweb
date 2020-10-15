import { Component, Input, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
// import { navItems } from '../_nav';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MenuService } from '../services/menu/menu.service';
import { GlobalService } from '../services/global/global';
import { Favoriteservice } from '../services/favorite/favorite-service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { Momservice } from '../services/mom-service';
import { LoginApiService } from '../services/login/login-api.service';
import { ToastService } from '../services/other/toast-service';
import { Subscription } from 'rxjs';


// import { CalendarComponent } from 'ng-fullcalendar';
// import { Options } from 'fullcalendar';
//import { FullCalendarModule } from 'ng-fullcalendar';
@Component({
  selector: 'app-modules',
  templateUrl: './index.component.html',
  styles: [`
  .favstyle{
    padding: 3px 20px;
    font-size: 13px;
    color: #000;
  }
  .favstyle.active {
    color:#ffffff;
  }
  `]
})
export class IndexLayoutComponent implements OnInit {
  @ViewChild('template') popupContainer;
  @ViewChild('header') header: any;
  subscription: Subscription;
  display: boolean = false;
  // @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  calendarOptions: any;
  modalRef: BsModalRef;
  allmenues = [];
  events: any = [];
  lang: any = [];
  data: any = [];
  issearchon: any = false;
  //lang = [{ id: 'en', name: 'English' }, { id: 'fe', name: 'français' }];
  onModelShow;
  menu: any = {
    id: '',
    roleid: '',
    menuid: '',
    active: '',

  }
  role: any = ''
  username: any = 'unnamed';
  env = {};
  shortcuts: any = [];
  mainUserLogin: boolean = false;
  version: any = '-.-.-';
  public navItems = null;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  imgParentPath: any = {};
  constructor(private router: Router, private menuservice: MenuService,
    public global: GlobalService, private favmenu: Favoriteservice,
    private shortcut: HotkeysService, private modalService: BsModalService, private translate: TranslateService, private ref: ChangeDetectorRef, private momService: Momservice, private loginService: LoginApiService, private message: ToastService, private zone: NgZone) {
    this.env = environment;



    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.username = this.global.getUser().name;
    this.role = this.global.getUser().rolename;

    this.onModelShow = this.modalService.onShown.subscribe((evt) => {

      setTimeout(() => {

        $('#menusearch input').focus();
      }, 300);
    });

    this.onModelShow = this.modalService.onHide.subscribe((evt) => {
      this.issearchon = false;
    });
    shortcut.add(new Hotkey(['ctrl+space', 'meta+space'], (event: KeyboardEvent): boolean => {
      this.openModal(this.popupContainer);
      return false; // Prevent bubbling
    }, ['INPUT', 'TEXTAREA', 'SELECT'], 'Menu Search'));
    this.version = this.global._version;
  }

  onStateSelect(e) {
    if (e && e.url) {
      this.closeModal();
      this.router.navigate([e.url]);
    }
  }
  menusearchComplete(event) {

    this.allmenues = common.menusForSearch.filter(function (el) {
      return el.namex.toLowerCase().indexOf(event.query.toLowerCase()) > -1;
    })

  }
  openSearch() {
    this.openModal(this.popupContainer);
  }

  openModal(content: string) {
    if (!this.issearchon) {
      this.issearchon = true;
      this.modalRef = this.modalService.show(content);
    }
  }

  closeModal() {
    this.modalRef.hide();
  }

  ngOnInit() {

    const that = this;

    that.zone.run(() => {
      this.subscription = this.global.envUpdated_subscribe().subscribe(() => {
        this.imgParentPath = {
          src: (this.global.getCompanyLogo() != '') ? this.global.getDomainEnvData().cloudinary_url + "cmp" + this.global.getCompany() + "/" + this.global.getCompanyLogo() : this.global.defaultLogo(),
          height: '21px', alt: ''
        };
        //this.global.cmplogo = this.imgParentPath;
      })
    });









    // this.calendarOptions = {
    //   editable: true,
    //   eventLimit: false,
    //   header: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'month,agendaWeek,agendaDay,listMonth'
    //   },
    //   events:this.data
    // };
    //this.bindLang();

    localStorage.setItem('', '');
    if (localStorage.getItem('mainUser') !== null) {
      this.mainUserLogin = true;
    }


    this.menuservice.getMenu({
      'type': 'usermenus',
      'userid': this.global.getUser().id
    }).subscribe(
      data => {

        if (data.resultKey === 1) {

          this.navItems = common.menubind(data.resultValue);


        }
      },
      error => {
        console.error('Error processing request');
      }
    );

    //this.getFavmenu();

    setTimeout(() => {
      if (localStorage.getItem('linktoredirect')) {
        that.router.navigateByUrl(localStorage.getItem('linktoredirect').toString());
        localStorage.removeItem('linktoredirect');
      }
    }, 1000);

  }
  // saveMenu()
  // {
  //   this.favmenu.postFavmenu({
  //     "id": this.menu.id,

  //     "userid": this.global.getUser().id,

  //     "active":this.,
  //   })
  // }
  getFavmenu() {
    if (this.global.isFavReload) {
      this.favmenu.getFavmenu({
        'type': 'all',
        'userid': this.global.getUser().id

      }).subscribe((data: any) => {
        this.shortcuts = data.resultValue;
        this.global.isFavReload = false;
      })
    }
  }

  openCalender() {

    this.display = true;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.onModelShow) {
      this.onModelShow.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    // this.env.isAuthenticated = false;
    // this.loginService.logout({
    //   'session_id': this.global.getUser().session_id,
    // }).subscribe((res: any) => {

    // });
    this.global.clearUser();
    this.router.navigateByUrl('/login');
  }


  gotoCompanyList() {
    this.router.navigateByUrl('/company/list');
  }
  openShortcuts() {
    // const e: any = $.Event('keypress');
    // e.ctrlKey = true;
    // e.which = 126; // Character 'A'
    // if($('.cfp-hotkeys-container').hasClass('in')){
    //   $('.cfp-hotkeys-container').removeClass('in');
    // }else{
    //   $('.cfp-hotkeys-container').addClass('in');
    // }

    //  e.which = 53 ; // Character 'A'



  }
  backToAdmin() {
    if (localStorage.getItem('mainUser')) {
      localStorage.setItem('user', localStorage.getItem('mainUser'));
      localStorage.removeItem('mainUser');
      localStorage.setItem('linktoredirect', 'usermaster/user');
      let that = this;
      that.global.showLoader('Back to admin please wait');
      setTimeout(() => {
        that.router.navigate(['/dashboard']);
        window.location.reload();
      }, 2000);
    }
  }

  bindLang() {
    this.momService.getMom({
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
    location.reload();
  }

  openAdv() {
    var left = (screen.width / 2) - (700 / 2);
    var top = (screen.height / 2) - (600 / 2);
    // window.open('https://sites.google.com/ideas2tech.com/barsrevisionhistory/home', 'winname', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,height=' + (screen.height - 200) + ',width=700, top=' + top + ', left=' + left);
    window.open('http://i2treleases.droppages.com/', 'winname', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,height=' + (screen.height - 200) + ',width=700, top=' + top + ', left=' + left);
  }
}
