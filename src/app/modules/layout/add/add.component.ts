import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AssetService } from '../../../services/asset.service';
import { GlobalService } from '../../../services/global/global';
import { LayoutService } from '../../../services/layout.service';
import { ToastService } from '../../../services/other/toast-service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PlaylistService } from '../../../services/playlist.service';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [AssetService, LayoutService, PlaylistService]
})
export class LayoutComponent implements OnInit {
  enableGrid: boolean = true;
  enableRatio: boolean = false;
  aspectRatio: string = '16/9';
  ratio: any = '';
  ratioList: any = [];
  layoutWidth: any = 0;
  segmentList: any = [];
  lastOverlapIndex: number = 0;
  selectedItem: any = { id: 0, fit: 'cover' };
  prevSelectedItem: any = {};

  maintainRatio: boolean = true;
  ratioArr: any = [];
  defaultHeight: number = 360;
  defaultWidth: number = 640;
  perPixelWidth: number = 0;
  perPixelHeight: number = 0;
  defaultSegmentWidth: number = 130;
  defaultSegmentHeight: number = 100;
  buttons: { id: string; color: string; bg: string; text: string; iconi: string; shortcut: string; access: boolean; rtype: string; }[];
  layoutname: any = '';
  insertMediaFlag: boolean = false;
  assetType: any = '';
  assetList: any = [];
  form: any = { id: "", name: "", ratio: "", segmentData: [], userid: "", operate: "crud" };
  sortSegment: boolean = false;
  modalRef: BsModalRef;

  constructor(private ngZone: NgZone, private assetService: AssetService, public global: GlobalService, private layoutService: LayoutService, private translate: TranslateService, private message: ToastService, private route: ActivatedRoute, private modalService: BsModalService, private playlistService: PlaylistService) { }
  @ViewChild('element') element: ElementRef;
  @ViewChild('template') popupContainer;

  ngOnInit() {
    this.ratioList = [
      { width: 3840, height: 2160, value: "3840X2160", code: "16:9 (4K)" },
      { width: 1920, height: 1080, value: "1920X1080", code: "16:9 (1080p)" },
      { width: 1920, height: 1200, value: "1920X1200", code: "16:10" },
      { width: 1600, height: 1200, value: "1600X1200", code: "4:3" },
      { width: 1280, height: 768, value: "1280X768", code: "5:3" },
      { width: 1280, height: 1024, value: "1280X1024", code: "5:4" },
      { width: 1920, height: 1280, value: "1920X1280", code: "3:2" },
      { width: 2040, height: 1080, value: "2040X1080", code: "17:9" },
      { width: 1920, height: 540, value: "1920X540", code: "16:4.5" },
      { width: 1920, height: 360, value: "1920X360", code: "16:3" },
      { width: 2160, height: 3840, value: "2160X3840", code: "16:9 (4K)" },
      { width: 1080, height: 1920, value: "1080X1920", code: "16:9 (1080p)" },
      { width: 1200, height: 1920, value: "1200X1920", code: "16:10" },
      { width: 1200, height: 1600, value: "1200X1600", code: "4:3" },
      { width: 768, height: 1280, value: "768X1280", code: "5:3" },
      { width: 1024, height: 1280, value: "1024X1280", code: "5:4" },
      { width: 1280, height: 1920, value: "1280X1920", code: "3:2" },
      { width: 1080, height: 2040, value: "1080X2040", code: "17:9" },
      { width: 540, height: 1920, value: "540X1920", code: "16:4.5" },
      { width: 360, height: 1920, value: "360X1920", code: "16:3" }];
    this.ratio = '1920X1080';
    this.setRatio();
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
      this.loadLayoutbyId(id);
    }

  }

  buttonClicks(type) {
    switch (type) {
      case 'save': this.save();

      default:
        break;
    }
  }


  setRatio() {
    this.ratioArr = this.ratio.split("X");
    this.layoutWidth = (this.ratioArr[0] * this.defaultHeight) / this.ratioArr[1];
    this.perPixelWidth = this.ratioArr[0] / this.layoutWidth;
    this.perPixelHeight = this.ratioArr[1] / this.defaultHeight;

    if (this.segmentList.length > 0) {
      for (let i = 0; i < this.segmentList.length; i++) {
        const element = this.segmentList[i];
        let aspectRatio = element.resolWidth / element.resolHeight;
        let newWidth = (this.layoutWidth > this.defaultWidth) ? this.defaultWidth : this.layoutWidth;
        let newHeight = newWidth / aspectRatio;
        element.height = (newHeight > this.defaultHeight) ? this.defaultHeight : newHeight;
        element.width = newWidth;
        element.y = (this.defaultHeight - newHeight) / 2;
        element.x = (Math.abs(this.layoutWidth - newWidth)) / 2;
        element.segment_width_in_pixel = element.width * this.perPixelWidth;
        element.segment_height_in_pixel = element.height * this.perPixelHeight;
        element.segment_top_in_pixel = element.y * this.perPixelWidth;
        element.segment_left_in_pixel = element.x * this.perPixelHeight;
      }

    }
  }

  addSegment() {
    this.selectedItem = { id: 0, fit: 'cover' }
    this.insertMediaFlag = true;
    this.sortSegment = false;
  }

  addSegmentx(item) {
    this.lastOverlapIndex += 1;
    let r = Math.random().toString(36).substring(7);
    let id = "segment_" + r;
    let segmentObj = {
      width: this.defaultSegmentWidth,                                              // segment width
      height: this.defaultSegmentHeight,                                            // segment height
      //x: 0,                                                                         // top position
      //y: 0,                                                                         // left position
      x: (this.segmentList.length > 0) ? ((this.lastOverlapIndex + 1) * 5) : 0,                                                                         // top position
      y: (this.segmentList.length > 0) ? ((this.lastOverlapIndex + 1) * 5) : 0,                                                                         // left position
      zindex: this.lastOverlapIndex,                                                // overlap
      id: id,                                                                       // segment unique id
      resolWidth: this.ratioArr[0],                                                 // screen resolution width 1920
      resolHeight: this.ratioArr[1],                                                // screen resolution height 1080
      segment_width_in_pixel: this.defaultSegmentWidth * this.perPixelWidth,        // Segemnt width in pixel
      segment_height_in_pixel: this.defaultSegmentHeight * this.perPixelHeight,     // Segment height in pixel
      max_x: (this.layoutWidth - this.defaultSegmentWidth) * this.perPixelWidth,    // Max left position in pixel
      max_y: (this.defaultHeight - this.defaultSegmentHeight) * this.perPixelHeight,
      filepath: this.global.getConfig().document_path + item.filepath,
      filename: item.filename,
      filetype: item.type,
      assetid: item.id,
      fit: 'cover',
      isselected: false
      // Max top position in pixel
    }
    // if segemnt is first then select it as default
    if (this.segmentList.length == 0) {
      this.selectedItem = segmentObj;
    }
    this.segmentList.push(segmentObj);

    this.segmentJquery(id);

    $(document).on('click', (e) => {
      var resizable = $(e.target).closest(".segment");
      if ($(e.target).closest("#layoutWindow").length) {
        if (resizable.length) {

        }
        else {
          this.selectedItem = { id: 0, fit: 'cover' };
          this.insertMediaFlag = false;
        }
      }
    });

  }

  selectedSegment(item) {
    console.log(item);
    this.prevSelectedItem = this.selectedItem;
    this.selectedItem = item;
    this.setAspectRatio(item);
    this.sortSegment = false;
    this.insertMediaFlag = false;
    // $(".seg_" + item.id).show();
  }

  onAspectChange(e) {
    if (this.selectedItem)
      this.setAspectRatio(this.selectedItem);

  }

  changeSegment(item) {
    this.selectedItem.width = this.selectedItem.segment_width_in_pixel / this.perPixelWidth;
    this.selectedItem.height = this.selectedItem.segment_height_in_pixel / this.perPixelHeight;
    this.selectedItem.x = this.selectedItem.segment_left_in_pixel / this.perPixelWidth;
    this.selectedItem.y = this.selectedItem.segment_top_in_pixel / this.perPixelHeight;
  }

  setAspectRatio(item: any) {
    //debugger

    if (this.enableRatio) {
      $("#" + item.id).resizable("option", "aspectRatio", '16/9').data('uiResizable')._aspectRatio = '16/9';

    }
    else {
      $("#" + item.id).resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;

    }
    console.log('enableRatio', this.enableRatio);
    console.log($("#" + item.id).resizable("option", "aspectRatio"));

  }

  loadAssetByType() {
    if (this.assetType != 6) {
      this.loadAsset();
    }
    else {
      this.loadPlaylist();
    }
  }

  loadAsset() {
    this.assetService.getAsset({
      'operate': 'bytype',
      'type': this.assetType
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.assetList = res.resultValue;
      }
      else {
        this.assetList = [];
      }
    })
  }

  loadPlaylist() {
    this.playlistService.getPlaylist({
      'operate': 'forlayoutlist',
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.assetList = res.resultValue;
      }
      else {
        this.assetList = [];
      }
    })
  }

  onClickSelectAsset(item) {
    // change asset 
    if (this.selectedItem.id != '0') {
      this.selectedItem.filepath = this.global.getConfig().document_path + item.filepath;
      this.selectedItem.filename = item.filename;
      this.selectedItem.filetype = item.type;
      this.selectedItem.assetid = item.id;
    }
    else { // add asset 
      this.addSegmentx(item);
    }
    this.insertMediaFlag = false;
    this.sortSegment = false;
  }

  removeSegment() {
    this.segmentList = this.segmentList.filter((a) => {
      return a.id !== this.selectedItem.id;
    })
    this.selectedItem = { id: 0, fit: 'cover' }
  }

  cloneSegment() {
    let r = Math.random().toString(36).substring(7);
    let id = "segment_" + r;
    let currentSegment = JSON.parse(JSON.stringify(this.selectedItem));
    currentSegment.zindex = this.lastOverlapIndex + 1;
    currentSegment.id = id;
    currentSegment.x = currentSegment.x + 10;
    currentSegment.y = currentSegment.y + 10;
    this.segmentList.push(currentSegment);
    this.selectedItem = currentSegment;
    this.segmentJquery(id);
  }

  segmentJquery(id) {
    $(document).ready(() => {
      $("#" + id).draggable({
        containment: "parent",
        bounds: window,
        drag: (e, ui) => {
          let axis = ui.position;
          this.selectedItem.x = axis.left;
          this.selectedItem.y = axis.top;
          this.selectedItem.segment_top_in_pixel = this.selectedItem.y * this.perPixelWidth;
          this.selectedItem.segment_left_in_pixel = this.selectedItem.x * this.perPixelHeight;

        }
      })
      $("#" + id).resizable({
        containment: "parent",
        //grid: [48, 20],
        //aspectRatio: "16/9",
        handles: {
          'nw': '.nwgrip',
          'ne': '.negrip',
          'sw': '.swgrip',
          'se': '.segrip',
          'ng': '.ngrip',
          'sg': '.sgrip',
          'eg': '.egrip',
          'wg': '.wgrip'
        },
        start: (e, ui) => {
          let found = this.segmentList.find((a) => {
            return a.id == id;
          })
          this.selectedItem = found;
        },
        resize: (e, ui) => {
          let size = ui.size;
          let axis = ui.position;
          this.selectedItem.width = size.width;
          this.selectedItem.height = size.height;
          this.selectedItem.x = axis.left;
          this.selectedItem.y = axis.top;
          this.selectedItem.segment_width_in_pixel = this.selectedItem.width * this.perPixelWidth;
          this.selectedItem.segment_height_in_pixel = this.selectedItem.height * this.perPixelHeight;
          this.selectedItem.max_x = (this.layoutWidth - this.selectedItem.width) * this.perPixelWidth;
          this.selectedItem.max_y = (this.defaultHeight - this.selectedItem.height) * this.perPixelHeight;
        }
      });

      if (this.route.snapshot.params['id']) {
        $(".ui-resizable-handle").hide();
      }

    });
  }

  save() {
    if (this.segmentList.length == 0) {
      this.message.show('Warning!', 'Please create layout', 'warn', this.translate);
      return false;
    }
    let segementData = [];
    for (let i = 0; i < this.segmentList.length; i++) {
      const element = this.segmentList[i];
      segementData.push({
        "assetid": element.assetid,
        "config": {
          "width": element.width,
          "height": element.height,
          "top": element.y,
          "left": element.x,
          "zindex": element.zindex,
          "res_height": element.segment_width_in_pixel,
          "res_width": element.segment_height_in_pixel,
          "fit": element.fit
        }
      });
    }

    this.layoutService.postLayout({
      "id": this.form.id,
      "name": this.form.name,
      "ratio": this.ratio,
      "segmentdata": segementData,
      "operate": "crud"
    }).subscribe((res) => {
      let value = res.resultValue;
      if (value.status) {
        this.message.show('Success', value.msg, 'success', this.translate);
      }
      else {
        this.message.show('Warning', value.msg, 'warn', this.translate);
      }
    })
  }

  loadLayoutbyId(id) {
    this.layoutService.getLayout({
      'operate': 'byid',
      'id': id
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        let data = res.resultValue[0];
        this.form.id = data.layoutid;
        this.form.name = data.name;
        this.ratio = data.ratio;
        let segmentData = data.segmentdata;
        debugger
        this.ratioArr = this.ratio.split("X");
        this.layoutWidth = (this.ratioArr[0] * this.defaultHeight) / this.ratioArr[1];
        this.perPixelWidth = this.ratioArr[0] / this.layoutWidth;
        this.perPixelHeight = this.ratioArr[1] / this.defaultHeight;
        for (let i = 0; i < segmentData.length; i++) {
          const element = segmentData[i];
          this.makeSegmenDataForEdit(element);
        }
      }
    }, () => {

    }, () => {
      //this.selectedItem = { id: 0, fit: 'cover' }

      setTimeout(() => {
        this.selectedItem = this.segmentList[0];
        //$("#" + this.selectedItem.id + " .ui-resizable-handle").show();
      }, 1000);
    })
  }

  makeSegmenDataForEdit(item) {
    this.lastOverlapIndex += 1;
    let r = Math.random().toString(36).substring(7);
    let id = "segment_" + r;

    let segmentObj = {
      width: item.segconfig.width,                                              // segment width
      height: item.segconfig.height,                                            // segment height
      x: item.segconfig.left,                                                                         // top position
      y: item.segconfig.top,                                                                         // left position
      zindex: item.segconfig.zindex,                                                // overlap
      id: id,                                                                       // segment unique id
      resolWidth: item.segconfig.res_width,                                                 // screen resolution width 1920
      resolHeight: item.segconfig.res_height,                                                // screen resolution height 1080
      segment_width_in_pixel: item.segconfig.width,        // Segemnt width in pixel
      segment_height_in_pixel: item.segconfig.height,     // Segment height in pixel
      max_x: (this.layoutWidth - item.segconfig.width) * this.perPixelWidth,    // Max left position in pixel
      max_y: (this.defaultHeight - item.segconfig.height) * this.perPixelHeight,
      filepath: this.global.getConfig().document_path + item.assetconfig.filepath,
      filename: item.assetconfig.filename,
      filetype: item.assetconfig.type,
      assetid: item.assetconfig.assetid,
      segment_top_in_pixel: item.segconfig.top * this.perPixelWidth,
      segment_left_in_pixel: item.segconfig.left * this.perPixelHeight,
      fit: item.segconfig.fit,
      isselected: false
      // Max top position in pixel
    }

    // if segemnt is first then select it as default
    if (this.segmentList.length == 0) {
      //this.selectedItem = segmentObj;
      $(document).on('click', (e) => {
        var resizable = $(e.target).closest(".segment");
        if ($(e.target).closest("#layoutWindow").length) {
          if (resizable.length) {

          }
          else {
            this.selectedItem = { id: 0, fit: 'cover' }
          }
        }
      });
    }
    this.segmentList.push(segmentObj);

    this.segmentJquery(id);
  }

  changeAsset() {
    this.insertMediaFlag = true;
    this.sortSegment = false;
    if (this.assetType == this.selectedItem.filetype) return;
    this.assetType = this.selectedItem.filetype;
    this.loadAssetByType();
  }

  deselectSegment() {
    this.selectedItem = { id: 0, fit: 'cover' };
    this.insertMediaFlag = false;
    this.sortSegment = false;
  }

  showLayerBox() {
    this.sortSegment = true;
    this.insertMediaFlag = false;
    this.selectedItem = { id: 0, fit: 'cover' };
    var that = this;
    $(function () {
      $("#sortable").sortable({
        cursor: "move",
        update: (e, ui) => {
          //console.log(ui);
          console.log($("#sortable").sortable("toArray"));

          that.ngZone.run(() => {
            $.each($('#sortable').sortable("toArray"), function (key, value) {


              var element = that.segmentList.find(a => { return a.id == value });
              element.zindex = that.segmentList.length - (key);



            });


          })

          //this.selectedItem.zindex=100;
        }
      });
    });
  }

  openModal(content: string, size) {
    if (this.modalService.getModalsCount() == 0) {
      this.modalRef = this.modalService.show(content, {
        class: size
      });
    }
  }
  closeModal() {
    this.modalRef.hide();
  }

  editedAssetData(item) {
    this.selectedItem.filename = item.filename;
    this.selectedItem.filepath = this.global.getConfig().document_path + item.filepath;
    this.selectedItem.filetype = item.filetype;
    this.closeModal();
  }

}
