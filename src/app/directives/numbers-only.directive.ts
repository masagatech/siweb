import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberDirective {

  @Input() types: string = "decimal";
  // Allow decimal numbers and negative values
  //private regex: RegExp = new RegExp(/^(?:[0-9]+(?:\.[0-9]{0,2})?)?$/);
  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,2}$/g);
  private regexposideci: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,2}$/g);
  private regex_int: RegExp = new RegExp(/^-?[0-9]+(\[0-9]*){0,1}$/g);
  private regexposi_int: RegExp = new RegExp(/^[0-9]+(\[0-9]*){0,1}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];
  constructor(private _el: ElementRef) {
  }

  // @HostListener('input', ['$event']) onInputChange(event) {
  //   const initalValue = this._el.nativeElement.value;
  //   this._el.nativeElement.value = initalValue.replace(/[^0-9.]*/g, '');
  //   let num = this._el.nativeElement.value;

  //   if (initalValue !== this._el.nativeElement.value) {
  //     event.stopPropagation();
  //   }
  // }


  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.types == 'int' || this.types == 'decimal') {
      this.specialKeys.push('-');
    }
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this._el.nativeElement.value;
    let next: string = current.concat(event.key);
    //if (next && !String(next).match(this.types == 'int' ? this.regex_int : this.regex)) {
    if (next && !String(next).match(this.types == 'int' ? this.regex_int : (this.types == 'posideci') ? this.regexposideci : (this.types == 'posi_int') ? this.regexposi_int : this.regex)) {
      event.preventDefault();
    }
  }

}