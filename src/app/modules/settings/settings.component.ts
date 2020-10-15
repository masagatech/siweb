import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { GlobalService } from '../../services/global/global';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    modalRef: BsModalRef;

    constructor(private router: Router, private global: GlobalService, private modalService: BsModalService
    ) { }
    items: MenuItem[];
    ngOnInit() {

        this.items = [
            {
                label: 'Grid Config', icon: 'fa fa-fw fa-th', command: (event) => {
                    //event.originalEvent: Browser event
                    //event.item: menuitem metadata
                    this.router.navigate(['settings/searchconfig'])
                }
            }
        ];
    }

}
