import { Component, OnInit, ViewChild } from '@angular/core';

import SignaturePad, { Options, PointGroup } from 'signature_pad';

@Component({
  selector: 'signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
})
export class SignaturePadComponent implements OnInit {
  constructor() {}
  @ViewChild('canvas') signature: any;

  ngOnInit(): void {
    new SignaturePad(this.signature);
  }
}
