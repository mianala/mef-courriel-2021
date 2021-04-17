import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() files: any[] = [];
  @Output() filesChange = new EventEmitter;

  constructor() {
  }

  ngOnInit() {
  }

  remove(file: any) {
    this.files.splice(this.files.indexOf(file), 1);
  }

  getFiles(e: File[]) {
    this.files = [...this.files, ...e]
  }

}