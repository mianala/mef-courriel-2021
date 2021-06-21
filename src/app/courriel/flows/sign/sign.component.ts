import { Component, OnInit } from '@angular/core';

import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import download from 'downloadjs';
import { FormBuilder } from '@angular/forms';

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

  canvasWidth = 300;
  canvasHeight = 150;

  signaturePadPosition = { x: 0, y: 0 };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

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
    // download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');
    console.log(pdfBytes);
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

    this.documentHeight = height;
    this.documentWidth = width;
    this.repositionSignaturePad();
  }

  repositionSignaturePad() {
    this.signaturePadPosition = {
      // total width - margin right - canvas width
      x:
        this.documentWidth -
        (this.documentWidth - this.pageWidth) / 2 -
        this.canvasWidth,
      y: this.pageHeight - this.canvasHeight,
    };
  }
}
