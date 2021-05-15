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
    const filesArray = [];
    for (var i = 0; i < files.length; i++) {
      formData.append('files[]', files[i]);
      filesArray.push(files[i]);
    }

    console.log(formData);

    const request = new HttpRequest('POST', this.endpoint, formData, {
      responseType: 'blob',
      reportProgress: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });

    return this.http.request(request);
  }
}
