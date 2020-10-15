import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  Router, NavigationEnd,
  Event as RouterEvent,
  NavigationStart,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { GlobalService } from './services/global/global';
import { VersionCheckService } from './services/version-check.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `
  <div id="loaderwrap">
    <span  class="loadingicon {{global.loader == true ? '' : 'hide'}}"  >
      {{global.loadertext}}
    </span>
  </div>
  <div class="loading-overlay" *ngIf="loading">
    <p-progressBar mode="indeterminate" [style]="{'height': '3px'}"></p-progressBar>
  </div>
  <router-outlet></router-outlet>
  <p-confirmDialog [closable]="global.confirmBox.closable"></p-confirmDialog>
  <hotkeys-cheatsheet #cheat title="Shortcut List"></hotkeys-cheatsheet>`,
  styles: [`.loading-overlay {
    z-index: 11111;
    position: fixed;
    width: 100%;
    top: 0;
}`]
})
export class AppComponent implements OnInit, OnDestroy {
  loading = true;

  constructor(private router: Router, public global: GlobalService, private versionCheckService: VersionCheckService) {
  
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    let a = (1000 * 60 * 15);
    this.versionCheckService.initVersionCheck(this.global.getConfig().versionCheckURL, a);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
