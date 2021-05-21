import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  progressPercentageString$ = this.service.progressPercentageString$;
  constructor(private service: FileUploadService) {}

  ngOnInit(): void {}
}
