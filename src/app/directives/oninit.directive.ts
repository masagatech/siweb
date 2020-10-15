import { Directive, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
    selector: '[createDir]',
})
export class OnCreateInit {
    @Output() onCreateEvt: EventEmitter<any> = new EventEmitter<any>();
    constructor(private _el: ElementRef) { }
    ngOnInit() {
        this.onCreateEvt.emit('dummy');
    }

}