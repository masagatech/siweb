import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../services/authguard-service';
import { UserprofileComponent } from '../../../modules/profile/userprofile/userprofile.component';
// import { ReviewndaComponent } from '../../modules/usermaster/reviewnda/reviewnda.component';
import { from } from 'rxjs';


const routes: Routes = [
    {

        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'Userprofile'
                },
                children: [
                    {
                        path: '',
                        component: UserprofileComponent,
                        //canActivate: [AuthGuard],
                        data: {
                            title: 'User Profile',
                            // code: 'usr'
                        }
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

export class UserprofileRoutingModule { }
