import {
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import SignaturePad, { Options, PointGroup } from 'signature_pad';
import { LabelsComponent } from 'src/app/courriel/flows/components/labels/labels.component';

@Component({
  selector: 'signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelsComponent),
      multi: true,
    },
  ],
})
export class SignaturePadComponent implements OnInit, ControlValueAccessor {
  labels = ['nothing'];
  canvas: HTMLCanvasElement | null | undefined;

  constructor(private elementRef: ElementRef) {}
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  signaturePad: SignaturePad | undefined;

  ngOnInit(): void {
    this.initializeSignaturePad();

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

  printSignature() {}

  print() {}

  clear() {
    this.signaturePad?.clear();
  }

  resizeCanvas() {
    if (this.canvas === null || this.canvas === undefined) return;

    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;

    this.canvas.getContext('2d')?.scale(ratio, ratio);

    this.signaturePad?.clear(); // otherwise isEmpty() might return incorrect value
  }
}
