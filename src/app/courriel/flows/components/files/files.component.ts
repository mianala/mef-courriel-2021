import { Component, forwardRef, OnInit } from '@angular/core';
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
  files: any[] = [];
  progress$ = this.upload.progress$;
  progress: number[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private upload: FileUploadService
  ) {}

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

  remove(file: any) {
    this.files.splice(this.files.indexOf(file), 1);
    this.setValue(this.files);
  }

  getFiles(files: File[]) {
    files.forEach((file, index) => {
      this.progress.push(0);

      // uploading file
      this.firebaseService
        .pushFileToStorage(files[0], (url) => {
          // add returned value to _files
          this.setValue([
            ...this.files,
            ...[Object.assign(file, { src: url })],
          ]);
        })
        .subscribe((progress) => {
          // get the upload progress and creates an array of files
          this.progress[index] = progress;
          console.log(progress);
        });
    });
  }
}
