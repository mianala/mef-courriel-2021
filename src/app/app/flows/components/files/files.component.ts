import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppFile } from 'src/app/classes/file';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  progress: number[] = [];

  constructor(private firebaseService: FirebaseService) {}

  onChange!: (files: AppFile[]) => void;
  onTouched!: () => void;

  writeValue(obj: any): void {
    this.files = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(files: AppFile[]) {
    this.files = files;
    this.onChange(files);
    this.onTouched();
  }

  ngOnInit() {}

  remove(file: any) {
    this.setValue(this.files.splice(this.files.indexOf(file), 1));
  }

  getFiles(files: File[]) {
    files.forEach((file, index) => {
      this.progress.push(0);
      this.firebaseService
        .pushFileToStorage(files[0], (url) => {
          this.setValue([
            ...this.files,
            ...[Object.assign(file, { src: url })],
          ]);
          console.log(this.files);
        })
        .subscribe((progress) => {
          this.progress[index] = progress;
          console.log(progress);
        });
    });
  }
}
