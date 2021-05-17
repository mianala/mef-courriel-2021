import { Component, OnInit } from '@angular/core';
import { Link } from '../classes/link';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  Link = Link;
  constructor() {}

  ngOnInit(): void {}
}
