import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../services/global/global';
import { ToastService } from '../../../services/other/toast-service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PlaylistService } from '../../../services/playlist.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [PlaylistService],
})
export class AddComponent implements OnInit {

  @ViewChild('template') popupContainer;

  buttons: any = [];
  form = {
    id: '',
    name: '',
    description: '',
    userid: '',
    otherdata: {},
    assets: [],
    operate: 'crud'
  }
  playListItems: any = [];
  modalRef: BsModalRef;
  selectedItem: any = {};
  constructor(private translate: TranslateService, private global: GlobalService, private message: ToastService, private route: ActivatedRoute, private modalService: BsModalService, private playlistService: PlaylistService) {
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

    if (this.route.snapshot.params['id']) {
      let id = this.route.snapshot.params['id'];
      this.loadPlaylistbyId(id);
    }
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
    this.playlistService.postPlaylist(this.form).subscribe((res: any) => {
      let value = res.resultValue;
      if (value.status) {
        this.message.show('Success', value.msg, 'success', this.translate);
      }
      else {
        this.message.show('Warning', value.msg, 'warn', this.translate);
      }
    })
  }

  openModal(content: string) {
    this.modalRef = this.modalService.show(content);
  }

  closeModal() {
    this.modalRef.hide();
  }

  onSend(item) {
    this.selectedItem = item;
  }

  drop(event) {
    setTimeout(() => {
      this.form.assets.push({
        assetid: this.selectedItem.id,
        filepath: this.selectedItem.filepath,
        priority: this.form.assets.length + 1,
        duration: 0
      });
      this.selectedItem = null;
    }, 300);
  }

  adjustTime(type, item) {
    if (type == "add") {
      item.duration = parseInt(item.duration) + 1;
    }
    else {
      if (item.duration == 0) return;
      item.duration = parseInt(item.duration) - 1;
    }
  }

  removeFromPlaylist(index) {
    this.form.assets.splice(index, 1)
  }

  loadPlaylistbyId(id) {
    this.playlistService.getPlaylist({
      'operate': 'byid',
      'id': id
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        let data = res.resultValue[0];
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.description = data.description;
        //this.form.otherdata = JSON.parse(data.otherdata);
        this.form.assets = data.assets;
      }
    })
  }



}
