import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppFile } from 'src/app/classes/file';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilesComponent),
      multi: true,
    },
  ],
})
export class FilesComponent implements OnInit, ControlValueAccessor {
  files: AppFile[] = [];

  progress$ = this.fileUploadService.progress$;
  progress: number[] = [];

  constructor(private fileUploadService: FileUploadService) {}

  onChange!: (files: AppFile[] | null) => void;
  onTouched!: () => void;

  writeValue(obj: any): void {
    if (!obj) {
      this.files = [];
      return;
    }
    this.files = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(files: AppFile[]) {
    if (!files.length) {
      this.onChange(null);
      return;
    }

    this.files = files;
    this.onChange(files);
    this.onTouched();
  }

  ngOnInit() {}

  remove(file: AppFile) {
    this.files.splice(this.files.indexOf(file), 1);
    this.fileUploadService.uploadedFiles.next(this.files);
  }
}
