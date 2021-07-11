import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import SignaturePad, { Options, PointGroup } from 'signature_pad';

@Component({
  selector: 'signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignaturePadComponent),
      multi: true,
    },
  ],
})
export class SignaturePadComponent implements OnInit, ControlValueAccessor {
  labels = ['nothing'];
  canvas: HTMLCanvasElement | null | undefined;
  val: any;
  @Input() canvasHeight = 150;
  @Input() canvasWidth = 300;

  constructor(private elementRef: ElementRef) {}

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  signaturePad: SignaturePad | undefined;

  ngOnInit(): void {
    this.initializeSignaturePad();

    this.signaturePad!.onEnd = () => {
      this.value = this.signaturePad?.toDataURL();
    };
    // resize canvas always makes the canvas bigger
    // window.addEventListener('resize', this.resizeCanvas);
  }

  initializeSignaturePad() {
    this.canvas = this.elementRef.nativeElement.querySelector('#canvas');
    if (this.canvas) {
      this.signaturePad = new SignaturePad(this.canvas, {
        minWidth: 0.7,
        maxWidth: 1.1,
        penColor: 'rgb(10, 10, 250)',
        dotSize: 0.7,
      });
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(val: any) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val;
    console.log(val);

    this.onChange(val);
    this.onTouch(val);
  }

  printSignature() {}

  print() {}

  clear() {
    this.signaturePad?.clear();
  }
}
