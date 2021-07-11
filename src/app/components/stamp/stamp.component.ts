import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StampComponent),
      multi: true,
    },
  ],
})
export class StampComponent implements OnInit, ControlValueAccessor {
  stampURL: any;
  @Input() size = 80;
  constructor() {}

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(val: any) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.stampURL = val;
    console.log(val);

    this.onChange(val);
    this.onTouch(val);
  }

  ngOnInit(): void {
    // FIXME:
    this.value = '/assets/flag.png';
  }
}
