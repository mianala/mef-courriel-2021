import { Component, Input, OnInit } from '@angular/core';
import { AppFile } from '../../classes/file';

@Component({
  selector: 'viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  @Input() file: AppFile = new AppFile();
  constructor() {}

  ngOnInit(): void {
    console.log(this.file);
  }
}
