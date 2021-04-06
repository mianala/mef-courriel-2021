import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'file-upload-button',
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss']
})
export class FileUploadButtonComponent implements OnInit {

  @Output() fileSelected = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  
  selectFile(e:any) {
    let files = e.target.files
    let fileArray = []
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      if (file.size > 100000000) {
        // notify file too heavy
        break
      }else{
        fileArray.push(file)
      }
    }

    this.fileSelected.emit(fileArray)
  }
}
