import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserprofileComponent } from '../profile/userprofile/userprofile.component';
import { UserprofileRoutingModule } from './userprofile/userprofile-routing.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '../../shared/shared.module';

export const routes: Routes = [
  {
    path: ' ',
    component: UserprofileComponent,
  }
];
@NgModule({
  declarations: [UserprofileComponent],
  imports: [
    CommonModule,
    FormsModule, SharedModule,
    UserprofileRoutingModule, DialogModule
  ]
})
export class ProfileModule { }
