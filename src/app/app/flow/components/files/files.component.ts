import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppFile } from 'src/app/classes/file'

@Component({
  selector: 'files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() files: any[] = [];
  @Output() filesChange = new EventEmitter;

  progress: number[] = []

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
  }

  remove(file: any) {
    this.files.splice(this.files.indexOf(file), 1);
  }

  getFiles(files: File[]) {
    files.forEach((file, index) => {
      this.progress.push(0)
      this.firebaseService.pushFileToStorage(files[0], url => {
        this.files.push(Object.assign(file, { src: url }))
        console.log(this.files);

      }).subscribe(progress => {
        this.progress[index] = progress;
        console.log(progress);
      })
    })


  }

}