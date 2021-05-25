import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[clearOnEscape]',
})
export class ClearOnEscapeDirective {
  @HostListener('keydown', ['$event']) onKeyDown(e: any) {
    if (e.escKey) {
      console.log('esc key pressed');
    }
  }
  constructor(private element: ElementRef) {}
}
