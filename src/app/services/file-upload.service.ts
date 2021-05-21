import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpProgressEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppFile } from '../classes/file';

interface IUploadProgress {
  type: number;
  loaded: number;
  total: number;
}
interface IUploadStarted {
  type: number;
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  progress$ = new BehaviorSubject<number | null>(50);
  progressPercentageString$ = this.progress$.pipe(map((p) => p + '%'));
  progressState$ = this.progress$.pipe();

  private endpoint = environment.upload_endpoint;
  files$ = new BehaviorSubject<AppFile[]>([]);
  constructor(private http: HttpClient) {}

  upload(files: FileList) {
    const formData = new FormData();
    const item = files.item(0);

    for (let index = 0; index < files.length; index++) {
      const element = files.item(index);
      if (element) {
        formData.append('files', element, element.name);
      }
    }

    const request = new HttpRequest('POST', this.endpoint, formData, {
      reportProgress: true,
    });

    return this.http.request(request);
  }

  save(files: FileList) {
    this.upload(files).subscribe((data) => {
      switch (data.type) {
        case HttpEventType.Sent:
          console.log('sent', data);

          break;
        case HttpEventType.UploadProgress:
          console.log('Upload progress', data);
          const progressData: HttpProgressEvent = data;
          if (progressData.total) {
            const progressPercentage =
              (progressData.loaded / progressData.total) * 100;
            this.progress$.next(progressPercentage);
          }
          break;
        case HttpEventType.Response:
          console.log('Response', data);

          break;

        default:
          break;
      }
      console.log(data.type);
    });
  }
}
