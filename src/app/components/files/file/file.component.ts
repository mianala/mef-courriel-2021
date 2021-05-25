import { Component, Input, OnInit } from '@angular/core';
import { AppFile } from 'src/app/classes/file';
import { Strings } from 'src/app/classes/strings';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() file: AppFile | undefined;
  @Input() layout = 'upload';
  Strings = Strings;
  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

  remove() {
    this.fileService.remove(this.file!);
  }
}
