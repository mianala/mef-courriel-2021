import { Component, Input, OnInit } from '@angular/core';
import { AppFile } from 'src/app/classes/file';
import { Strings } from 'src/app/classes/strings';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() file: AppFile | undefined;
  Strings = Strings;
  constructor() {}

  ngOnInit(): void {}
}
