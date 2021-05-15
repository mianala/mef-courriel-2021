import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testing-ground',
  templateUrl: './testing-ground.component.html',
  styleUrls: ['./testing-ground.component.scss'],
})
export class TestingGroundComponent implements OnInit {
  labels = ['nothing'];
  constructor() {}

  ngOnInit(): void {}
}
