import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  progressPercentageString$ = this.service.progressPercentageString$;
  uploadInProgress$ = this.service.uploadInProgress$;
  constructor(private service: FileService) {}

  ngOnInit(): void {}
}
