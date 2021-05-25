import {
  HttpClient,
  HttpEventType,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
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

class FileWithActions extends File {}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  progress$ = new BehaviorSubject<number | null>(null);
  progress = 0;
  progressPercentageString$ = this.progress$.pipe(
    map((p) => (p ? p + '%' : '0'))
  );
  uploadInProgress$ = this.progress$.pipe(map((p) => !(p == null || p == 100)));
  progressState$ = this.progress$.pipe();
  files$ = new BehaviorSubject<AppFile[]>([]);
  uploadedFiles = new BehaviorSubject<AppFile[]>([]);

  private endpoint = environment.upload_endpoint;

  constructor(private http: HttpClient) {
    this.progress$.subscribe((p) => {
      if (!p) {
        this.progress = 0;
        return;
      }

      this.progress = p;
    });

    if (!FileService.instance) {
      FileService.instance = this;
    }
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
          this.progress$.next(1);

          break;
        case HttpEventType.UploadProgress:
          const progressData: HttpProgressEvent = originalResponse;
          if (progressData.total) {
            const progressPercentage =
              (progressData.loaded / progressData.total) * 100;
            this.progress$.next(progressPercentage);
          }
          break;
        case HttpEventType.Response:
          const response: HttpResponse<any> = originalResponse;
          const responseFiles: any[] = response.body.files;
          if (responseFiles.length) {
            const files: AppFile[] = responseFiles.map((file) =>
              AppFile.responseToFile(file)
            );
            this.files$.next([...files, ...this.files$.value]);
          }
          break;

        default:
          break;
      }
    });
  }

  remove(file: AppFile) {
    this.files$.next(this.files$.value.slice(this.files$.value.indexOf(file)));
  }

  static instance: FileService;

  static getInstance() {
    if (FileService.instance) {
      return FileService.instance;
    }

    return FileService.instance;
  }
}
