import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'file-upload-button',
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss'],
})
export class FileUploadButtonComponent implements OnInit {
  @Output() fileSelected = new EventEmitter();
  constructor(private uploadService: FileService) {}

  ngOnInit(): void {}

  selectFile(e: any) {
    const files = e.target.files;
    const fileArray = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (file.size > 100000000) {
        // notify file too heavy
        break;
      } else {
        fileArray.push(file);
      }
    }

    this.fileSelected.emit(fileArray);
  }

  upload(e: any) {
    const files = e.target.files;

    this.uploadService.save(files);
  }
}
