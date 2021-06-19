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
  }

  initializeSignaturePad() {
    const signatureCanvas: HTMLCanvasElement | null =
      this.elementRef.nativeElement.querySelector('#canvas');
    if (signatureCanvas) {
      this.signaturePad = new SignaturePad(signatureCanvas, {
        minWidth: 0.7,
        maxWidth: 1.1,
        penColor: 'rgb(10, 10, 10)',
        dotSize: 0.7,
      });
    }
  }

  printSignature() {}

  print() {}

  clear() {
    this.signaturePad?.clear();
  }
}
