import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() files: any[] = [];
  @Output() fileRemoved = new EventEmitter;
  constructor() {
  }

  ngOnInit() {
  }

  // wait
  remove(file:any) {
    if (file.id) {
      console.log(file)
      this.fileRemoved.emit(file)
    }

    this.files.splice(this.files.indexOf(file), 1)
  }

}