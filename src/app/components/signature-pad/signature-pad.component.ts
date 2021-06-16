import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import download from 'downloadjs';
import SignaturePad, { Options, PointGroup } from 'signature_pad';

@Component({
  selector: 'signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
})
export class SignaturePadComponent implements OnInit {
  labels = ['nothing'];
  pdfLink = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
  stampLink = 'http://localhost:4002/mef/files/stamp.png';

  constructor(private elementRef: ElementRef) {}

  signaturePad: SignaturePad | undefined;

  ngOnInit(): void {
    this.initializeSignaturePad();
    this.initializePDF();
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

  async initializePDF() {
    const existingPdfBytes = await fetch(this.pdfLink).then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    const pngImageBytes = await fetch(this.stampLink).then((res) =>
      res.arrayBuffer()
    );

    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    const pngDims = pngImage.scale(0.5);
    firstPage.drawImage(pngImage, {
      x: firstPage.getWidth() / 2 - pngDims.width / 2 + 75,
      y: firstPage.getHeight() / 2 - pngDims.height + 250,
      width: pngDims.width,
      height: pngDims.height,
    });

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');
    console.log(pdfBytes);
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
