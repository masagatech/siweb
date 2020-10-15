import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../services/global/global';
import { ToastService } from '../../../services/other/toast-service';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../../../services/asset.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [AssetService],
})
export class AddComponent implements OnInit {

  @Output() onAction: EventEmitter<any> = new EventEmitter;
  @Input('assetid') assetid: any = '';
  @Input('integrate') integrate: any = false;


  buttons: any = [];
  form = {
    id: '',
    type: '',
    name: '',
    description: '',
    tags: '',
    userid: '',
    otherdata: { subtype: '1' },
    file: [],
    operate: 'crud',
    url: '',
  }
  fileList: any = [];
  fileData: any = [];
  thumbnail: any;
  constructor(private translate: TranslateService, private global: GlobalService, private message: ToastService, private assetService: AssetService, private route: ActivatedRoute) {
    translate.use(global.getLang());
  }


  ngOnInit() {
    this.buttons = [
      {
        'id': 'reset', 'color': 'white', 'bg': 'danger', 'text': 'Reset',
        'iconi': 'fa fa-refresh', 'shortcut': 'ctrl+r', 'access': true, 'rtype': 'button'
      },
      {
        'id': 'save', 'color': 'white', 'bg': 'success', 'text': 'Save',
        'iconi': 'fa fa-save', 'shortcut': 'ctrl+s', 'access': true, 'rtype': 'submit'
      }
    ];

    if (this.integrate) {
      let id = this.assetid;
      this.loadAssetbyId(id);
      this.buttons[0].access = false;
    }
    else if (this.route.snapshot.params['id']) {
      let id = this.route.snapshot.params['id'];
      this.loadAssetbyId(id);
    }
  }

  getuploadedFiles(event) {
    alert();
    this.fileData = [];
    this.fileList = event;
  }

  buttonClicks(type) {
    switch (type) {
      case 'save': this.save();

        break;

      default:
        break;
    }
  }

  save() {
    const formData = new FormData();
    formData.append('id', this.form.id);
    formData.append('type', this.form.type);
    formData.append('name', this.form.name);
    formData.append('description', this.form.description);
    for (let tag of this.form.tags) {
      formData.append('tags[]', tag);
    }
    formData.append('userid', this.global.getUser().id);
    formData.append('otherdata', JSON.stringify(this.form.otherdata));
    formData.append('operate', this.form.operate);
    formData.append('url', this.form.url);
    formData.append('subtype', this.form.otherdata.subtype);
    if (this.fileData.length == 0) {
      for (let a in this.fileList) {
        formData.append('file[]', this.fileList[a]);
      }
    }
    else {
      for (let a in this.fileData) {
        formData.append('fileData[]', JSON.stringify(this.fileData[a]));
      }
    }
    this.assetService.postAsset(formData).subscribe((res) => {
      let value = res.resultValue;
      if (value.status) {
        this.message.show('Success', value.msg, 'success', this.translate);
        if (this.integrate) {
          let data = value.data;
          this.onAction.emit({
            filename: data.filename,
            filetype: data.filetype,
            filepath: data.filepath
          });
        }
      }
      else {
        this.message.show('Warning', value.msg, 'warn', this.translate);
      }
    })
  }

  loadAssetbyId(id) {
    this.assetService.getAsset({
      'operate': 'byid',
      'id': id
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        let data = res.resultValue[0];
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.description = data.description;
        this.form.tags = data.tags;
        this.form.type = data.type;
        this.form.url = data.filename;
        this.thumbnail = data.filepath;
        this.form.otherdata = JSON.parse(data.otherdata);
        if (data.type != 5) {
          this.fileData.push({ name: data.filename, size: parseFloat(data.filesize), progress: 100, path: data.filepath })
        }

      }
    })
  }

}
