import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../services/global/global';
import { AssetService } from '../../../services/asset.service';

@Component({
  selector: 'app-assetlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [AssetService],
})
export class AssetListComponent implements OnInit {
  @Output() onSend: EventEmitter<any> = new EventEmitter();
  assetList: any = [];
  selectedItem: any;

  constructor(private translate: TranslateService, public global: GlobalService, private assetService: AssetService, private route: Router) {
    translate.use(global.getLang());
  }


  ngOnInit() {
    this.loadActiveAsset();
  }

  loadActiveAsset() {
    this.assetService.getAsset({
      'operate': 'activebytype',
      'type': 1
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        let data = res.resultValue;
        data.forEach(element => {
          element.data = JSON.parse(element.data);
          this.assetList.push(element);
        });
      }
      else {
        this.assetList = [];
      }
    })
  }

  dragStart(event, car) {
    this.selectedItem = car;
  }

  dragEnd(event) {
    this.onSend.emit(this.selectedItem);
    this.selectedItem = null;
  }

}
