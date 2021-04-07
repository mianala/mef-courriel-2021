import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user:IUser | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
