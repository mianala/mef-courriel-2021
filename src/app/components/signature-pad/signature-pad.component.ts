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
  stampLink =
    'https://drive.google.com/file/d/1VAx6Ws6F8k_NdJHqu9CC_XkLrQcLGnBX/view?usp=sharing';

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
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    });

    const pdfBytes = await pdfDoc.save();
    // download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');
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
