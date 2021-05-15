import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'file-upload-button',
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss'],
})
export class FileUploadButtonComponent implements OnInit {
  @Output() fileSelected = new EventEmitter();
  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {}

  selectFile(e: any) {
    const files = e.target.files;

    this.uploadService.upload(files).subscribe((data) => {
      console.log(data);
    });

    return;

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
}
