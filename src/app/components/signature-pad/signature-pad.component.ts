import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import SignaturePad, { Options, PointGroup } from 'signature_pad';

@Component({
  selector: 'signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
})
export class SignaturePadComponent implements OnInit {
  labels = ['nothing'];
  pdfLink =
    'http://localhost:4001/mef/files/1622468912210-153945063-project-1617960006012-SUIVI%20COVID%20SAVA.pdf';
  stampLink = 'http://localhost:4001/mef/files/stamp.png';

  constructor(private elementRef: ElementRef) {}

  signaturePad: SignaturePad | undefined;

  ngOnInit(): void {
    this.initializeSignaturePad();
    this.initializeJsPDF();
  }

  initializeSignaturePad() {
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

  initializeJsPDF() {
    // const doc = new jsPDF();
    // doc.addImage(this.stampLink, 'PNG', 10, 10, 60, 60);
    // doc.save('a4.pdf');
  }

  printSignature() {
    // const doc = new jsPDF();
    // const signatureData = this.signaturePad?.toDataURL();
    // if (!signatureData) return;
    // doc.addImage(signatureData, 'PNG', 50, 50, 60, 120);
    // doc.save('a4.pdf');
  }

  print() {
    // const doc = new jsPDF();
    // const signatureData = this.signaturePad?.toDataURL();
    // if (!signatureData) return;
    // doc.addImage(signatureData, 'PNG', 50, 50, 60, 120);
    // doc.save('a4.pdf');
  }

  clear() {
    this.signaturePad?.clear();
  }
}
