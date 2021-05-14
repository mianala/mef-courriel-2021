import { Component, OnInit } from '@angular/core';
import { Link } from '../classes/link';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
})
export class AppsComponent implements OnInit {
  Link = Link;
  constructor() {}

  ngOnInit(): void {}
}
