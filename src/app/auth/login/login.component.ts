import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('myusername'),
    password: new FormControl('mypassword'),
  });

  get_user_query = gql`
    query login($username: String!, $hashed: String!) {
      user(where: { username: { _eq: $username }, hashed: { _eq: $hashed } }) {
        id
      }
    }
  `;
  constructor(private titleService: Title, private apollo: Apollo) {
    this.titleService.setTitle('Login');
  }

  ngOnInit(): void {}

  submit() {
    const form = this.loginForm.value;

    this.apollo
      .query({
        query: this.get_user_query,
        variables: {
          username: form.username,
          hashed: form.password,
        },
      })
      .subscribe((data) => {
        next: console.log(data);
      });
  }
}
