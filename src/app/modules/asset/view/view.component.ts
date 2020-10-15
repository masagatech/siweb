import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../services/global/global';
import { ToastService } from '../../../services/other/toast-service';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../../../services/asset.service';
import { GridComponent } from '../../usercontrols/grid/grid.comp';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [AssetService],
})
export class ViewComponent implements OnInit {


  buttons: any = [];
  gridButtons: any = [];
  @ViewChild('grid') grid: GridComponent;

  constructor(private translate: TranslateService, private global: GlobalService, private message: ToastService, private assetService: AssetService, private route: Router) {
    translate.use(global.getLang());
  }


  ngOnInit() {
    this.buttons = [
      {
        'id': 'add', 'color': 'white', 'bg': 'info', 'text': 'Add', 'iconi': 'icon-plus', 'shortcut': 'ctrl+shift+a'
      },
      {
        'id': 'filter', 'color': 'white', 'bg': 'primary', 'text': 'Advance Search', 'iconi': 'fa fa-search', 'shortcut': 'ctrl+shift+f'
      }
    ];

    this.gridButtons = [{
      'id': 'edit', 'color': 'white', 'bg': 'info', 'text': 'Edit', 'iconi': 'fa fa-edit', 'btnstyle': this.global.btnStyle
    }, {
      'id': 'preview', 'color': 'white', 'bg': 'warning', 'text': 'Preview', 'iconi': 'fa fa-eye', 'btnstyle': this.global.btnStyle
    }];
  }

  buttonClicks(id) {
    switch (id) {
      case 'filter':
        this.grid.advt.showModal()
        break;
      case 'add':
        this.route.navigate(['asset/add']);
        break;
      case 'export':
        this.grid.export();
        break;
      default:
        break;
    }
  }
  edit(seletedItem) {
    this.route.navigate(['/asset/edit/' + seletedItem[1].id]);
  }



}
