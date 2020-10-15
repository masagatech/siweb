import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SharedModule } from './shared/shared.module'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
// Import containers
// import { DefaultLayoutComponent } from './modules/index.module';
import { P404Component } from './error/404.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// const APP_CONTAINERS = [
//   DefaultLayoutComponent
// ];
// Import routing module
import { AppRoutingModule } from './app.routing';
// Import 3rd party components

import { ProgressBarModule } from 'primeng/progressbar';
import { HotkeyModule } from 'angular2-hotkeys';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetpasswordComponent } from './modules/forgetpassword/forgetpassword.component';



@NgModule({
  imports: [
    SharedModule,
    BsDropdownModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    //DeviceDetectorModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    HotkeyModule.forRoot({
      cheatSheetHotkey: 'ctrl+`',
      cheatSheetCloseEsc: true
    }),
    ConfirmDialogModule
  ],
  declarations: [
    AppComponent,
    // ...APP_CONTAINERS,
    P404Component,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ForgetpasswordComponent

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
