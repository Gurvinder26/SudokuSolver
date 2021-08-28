import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {
  constructor(private _el: ElementRef, private _ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._ngControl.control.setValue(initalValue.replace(/[^0-9]*/g, ''));
  }
}
