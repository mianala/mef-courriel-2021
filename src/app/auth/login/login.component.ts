import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Apollo, gql } from 'apollo-angular';
import { UserService } from 'src/app/app/users/user.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('myusername', [
      Validators.required,
      Validators.minLength(ValidatorService.username_min_length),
    ]),
    password: new FormControl('mypassword', [
      Validators.required,
      Validators.minLength(ValidatorService.password_min_length),
    ]),
  });

  constructor(private titleService: Title, private userService: UserService) {
    this.titleService.setTitle('Login');
  }

  ngOnInit(): void {}

  submit() {
    const form = this.loginForm.value;
    const variables = {
      username: form.username,
      hashed: form.password,
    };
    this.userService.logIn(variables);
    
  }
}
