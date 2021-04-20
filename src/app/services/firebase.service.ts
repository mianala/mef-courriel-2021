import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../classes/file-upload';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basePath = '/uploads';
  constructor(private storage: AngularFireStorage) {

  }

  pushFileToStorage(file: File, next: (url: string) => void): Observable<any> {
    const filePath = `${this.basePath}/${Date.now()}-${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          next(downloadURL);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
}
