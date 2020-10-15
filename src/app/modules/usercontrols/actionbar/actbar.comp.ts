import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../services/global/global';
import { Favoriteservice } from '../../../services/favorite/favorite-service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
    selector: 'app-actionbtn',
    templateUrl: './actbar.comp.html',
    styleUrls: ['actbar.comp.scss']
})
export class ActionBarComponent implements OnInit {
    @Output() onaction: EventEmitter<any> = new EventEmitter();
    @Input('isfav') isfav: boolean = false;
    @Input('showDispensary') showDispensary: boolean = true;

    shortcutArr = [];
    islocfav: Boolean = false;
    favoriteid: Number = 0;
    isloadingfav: boolean = true;
    @Input('showfav') showfav: boolean = false;

    @Input('buttons') buttons: any = [];
    constructor(private global: GlobalService, private favorite: Favoriteservice, private shortcut: HotkeysService) { }

    ngOnInit(): void {
        this.isloadingfav = true;
        const curmenu = this.global.getCurrentMenu();
        const uid = this.global.getUser().id;
        if (this.showfav) {
            // this.favorite.getFavmenu({

            //     'menucode': curmenu,
            //     'userid': uid,
            //     'type': 'bycode'
            // }).subscribe((data: any) => {
            //     this.isloadingfav = false;
            //     if (data.resultKey == 1) {
            //         if (data.resultValue !== null && data.resultValue.favoriteid) {
            //             console.log(data);
            //             this.favoriteid = data.resultValue.favoriteid
            //             this.islocfav = data.resultValue.active == 1 ? true : false
            //         } else {
            //             this.islocfav = false;
            //         }

            //     } else {
            //         this.islocfav = false;
            //     }


            // }, (err) => {
            //     this.islocfav = false;
            // })
        }



    }

    addShortCut(item, i) {
        setTimeout(() => {
            if (!item.access && !this.global.isMenuAccess(item.id)) {
                item.visible = false;
            }
            else { item.visible = true; }
        }, 100);
        //item.visible = true;
        if (item.shortcut) {
            const sh = this.shortcut.add(new Hotkey(item.shortcut.split(';'), (event: KeyboardEvent): boolean => {
                console.log('test');
                if (item.type && item.type === 'submit') {
                    $('#act' + i).click();
                } else {
                    this.onaction_click(item);
                }

                console.log(item.shortcut);
                return false; // Prevent bubbling
            }, ['INPUT', 'TEXTAREA', 'SELECT'], (item.shdesc || ' '))
            )
            this.shortcutArr.push(sh);
        }
    }

    clikedcount = false;

    onaction_click(item) {
        if (item.rtype && item.rtype == 'submit') {

            if (!this.clikedcount) {
                this.clikedcount = true;
                $('#fmrsub').click();
            }
            item.disabled = true;
            setTimeout(() => {
                this.clikedcount = false;
                item.disabled = false;
            }, 1000);
        }
        this.onaction.emit(item.id);

    }

    onfav_click() {
        this.islocfav = !this.islocfav;
        const curmenu = this.global.getCurrentMenu();
        const uid = this.global.getUser().id;
        this.favorite.saveFavmenu({
            'favoriteid': this.favoriteid,
            'menucode': curmenu,
            'active': (this.islocfav ? 1 : 0),
            'usercreated': uid,
            'userid': uid
        }).subscribe((data: any) => {
            if (data.resultKey == 1) {
                this.favoriteid = data.resultValue;
                // set isFavReload flag for reload favorites list in index component
                // If flag is false.favorites list request will not call for server in index conponent.
                this.global.isFavReload = true;
            }
        }, (err) => {

        })
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        for (let index = 0; index < this.shortcutArr.length; index++) {
            const element = this.shortcutArr[index];
            this.shortcut.remove(element);
        }

    }
    check(b) {

    }

}
