import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AppFile } from '../../classes/file';

@Component({
  selector: 'viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  @Input() file: AppFile = new AppFile();
  File = AppFile;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {}

  load() {}

  error(e: any) {
    console.log(e);
  }
}
