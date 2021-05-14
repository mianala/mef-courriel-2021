import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/classes/link';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  Link = Link;

  default_app = Link.FLOW_APP;
  constructor(private userService: UserService) {
    userService.activeUser$.subscribe((user) => {
      this.default_app = user ? user.settings_default_app : this.default_app;
    });
  }

  ngOnInit(): void {}

  updateDefaultApp(e: any) {
    this.userService.updateDefaultApp(e.value);
  }
}
