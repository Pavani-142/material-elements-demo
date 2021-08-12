import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[ngModel][camelcase]'
})
export class UppercaseDirective {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event) {

    this.value = $event.target.value.toString().toUpperCase();

    console.log(this.value);
    this.ngModelChange.emit(this.value);
  }
}