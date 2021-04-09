import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'save-flow-dialog',
  templateUrl: './save-flow-dialog.component.html',
  styleUrls: ['./save-flow-dialog.component.scss'],
})
export class SaveFlowDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<SaveFlowDialogComponent>,
  ) {}

  ngOnInit(): void {}
}
