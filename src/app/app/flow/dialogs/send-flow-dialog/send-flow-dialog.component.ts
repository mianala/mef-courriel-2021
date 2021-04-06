import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-flow-dialog',
  templateUrl: './send-flow-dialog.component.html',
  styleUrls: ['./send-flow-dialog.component.scss']
})
export class SendFlowDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SendFlowDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
