import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { SettingsComponent } from './settings.component';
import { LanguagesettingComponent } from '../../modules/settings/languagesetting/languagesetting.component';
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'general',
            component: GeneralComponent,
            //canActivate: [AuthGuard],
            data: {
              title: 'General Setting'
            }
          },
          {
            path: 'language',
            component: LanguagesettingComponent,
            // canActivate: [AuthGuard],
            data: {
              title: ' Language Settings'
            },

          },
          {
            path: 'searchconfig', loadChildren: '../search-config/search-config.module#SearchConfigModule'
          }
        ]
      }

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {

}
