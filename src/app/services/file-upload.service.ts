import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
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
  progress$ = new BehaviorSubject<number | null>(null);
  progress = 0;
  progressPercentageString$ = this.progress$.pipe(
    map((p) => (p ? p + '%' : '0'))
  );
  progressState$ = this.progress$.pipe();

  private endpoint = environment.upload_endpoint;
  files$ = new BehaviorSubject<AppFile[]>([]);
  constructor(private http: HttpClient) {
    this.progress$.subscribe((p) => {
      if (!p) {
        this.progress = 0;
        return;
      }

      this.progress = p;
    });
  }

  upload(files: FileList) {
    const formData = new FormData();

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
    this.progress$.next(0);

    this.upload(files).subscribe((originalResponse) => {
      switch (originalResponse.type) {
        case HttpEventType.Sent:
          console.log('sent', originalResponse);

          break;
        case HttpEventType.UploadProgress:
          console.log('Upload progress', originalResponse);
          const progressData: HttpProgressEvent = originalResponse;
          if (progressData.total) {
            const progressPercentage =
              (progressData.loaded / progressData.total) * 100;
            this.progress$.next(progressPercentage);
          }
          break;
        case HttpEventType.Response:
          console.log('Response', originalResponse);
          const response: HttpResponse<any> = originalResponse;
          const files: AppFile[] = response.body.files;
          if (files.length) {
          }

          break;

        default:
          break;
      }
    });
  }
}
