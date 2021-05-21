import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppFile } from '../classes/file';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private endpoint = environment.upload_endpoint;
  progress$ = new BehaviorSubject<number>(25);
  files$ = new BehaviorSubject<AppFile[]>([]);
  constructor(private http: HttpClient) {}

  upload(files: FileList) {
    const formData = new FormData();
    const item = files.item(0);

    for (let index = 0; index < files.length; index++) {
      const element = files.item(index);
      if (element) {
        console.log(element);

        formData.append('files', element, element.name);
      }
    }

    console.log(formData);

    const request = new HttpRequest('POST', this.endpoint, formData, {
      reportProgress: true,
    });

    return this.http.request(request);
  }
}
