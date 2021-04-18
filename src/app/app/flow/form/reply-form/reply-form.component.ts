import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss']
})
export class ReplyFormComponent implements OnInit {
  flow = {
    note: '',
    content: '',
    urgent: false,
    files: [],
    labels: ['']
  }
  constructor() { }

  ngOnInit(): void {

  }

  valid() {
    return true
  }

  submit() {

  }
}
