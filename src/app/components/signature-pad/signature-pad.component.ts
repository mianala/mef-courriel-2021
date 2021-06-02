import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import SignaturePad, { Options, PointGroup } from 'signature_pad';

@Component({
  selector: 'signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
})
export class SignaturePadComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  signaturePad: SignaturePad | undefined;

  ngOnInit(): void {
    const signatureCanvas: HTMLCanvasElement | null =
      this.elementRef.nativeElement.querySelector('#canvas');
    if (signatureCanvas) {
      this.signaturePad = new SignaturePad(signatureCanvas, {
        minWidth: 5,
        maxWidth: 10,
        penColor: 'rgb(10, 10, 10)',
      });
    }
  }
}
