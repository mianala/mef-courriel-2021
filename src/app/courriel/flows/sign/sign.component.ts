import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import download from 'downloadjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  pdfLink = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
  stampLink = 'http://localhost:4002/mef/files/stamp.png';

  documentHeight = 0;
  documentWidth = 0;

  pageWidth = 816;
  pageHeight = 1056;

  stampSize = 80;

  canvasWidth = 200;
  canvasHeight = 100;

  signaturePadPosition = { x: 0, y: 0 };
  signatureDropPoint = { x: 0, y: 0 };
  stampPosition = { x: 0, y: 0 };
  signature = new FormControl();

  @ViewChild('actions')
  actionsElement!: ElementRef;

  validationForm = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validationForm = this.fb.group({
      signature: [],
      stamp: ['/assets/flag.png'],
    });
  }

  async pdfDOC() {
    const pdfBites = await fetch(this.pdfLink).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBites);
    return pdfDoc;
  }

  rendered() {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const width = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    );

    console.log(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    );

    const actionsElementHeight = this.actionsElement.nativeElement.offsetHeight;

    this.documentHeight = height - actionsElementHeight;
    this.documentWidth = width;
    this.repositionDraggables();
  }

  repositionDraggables() {
    this.signaturePadPosition = {
      x: this.pageWidth / 2,
      y: this.pageHeight - this.canvasHeight,
    };
    this.stampPosition = {
      x: this.pageWidth / 2 - this.stampSize,
      y: this.pageHeight - this.stampSize,
    };
  }

  async print() {
    // gettings validations information
    const validations = this.validationForm.value;
    console.log(validations);

    // setting up the pdf doc
    const pdfDoc = await this.pdfDOC();

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    const ratio = width / this.pageWidth;
    const ratioHeight = height / this.pageHeight;
    console.log(ratioHeight);

    const signaturePng = await pdfDoc.embedPng(validations.signature);
    const pngDims = signaturePng.scale(0.75);
    const drawSignature = {
      x: this.signatureDropPoint.x * ratio,
      y: (this.pageHeight - this.signatureDropPoint.y) * ratio - pngDims.height,
      width: pngDims.width,
      height: pngDims.height,
    };

    console.log(
      'page',
      this.pageHeight,
      this.pageWidth,
      'pdf',
      width,
      height,
      this.signatureDropPoint,
      ratio,
      drawSignature
    );

    firstPage.drawImage(signaturePng, drawSignature);

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, 'signed.pdf', 'application/pdf');
  }

  dropped(event: any) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);

    this.signatureDropPoint = {
      x: boundingClientRect.x - parentPosition.left,
      y: boundingClientRect.y - parentPosition.top,
    };

    console.log(this.signatureDropPoint, event);
  }

  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  download() {}
}
