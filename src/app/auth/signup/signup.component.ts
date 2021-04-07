import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    firstname: new FormControl('Mianala'),
    lastname: new FormControl('Loharano'),
    im: new FormControl(321654),
    title: new FormControl('Développeur'),
    email: new FormControl('mymail@gmail.com'),
    entity_id: new FormControl(4),
    username: new FormControl('myusername'),
    password: new FormControl('mypassword'),
    confirm: new FormControl(''),
    phone: new FormControl('+261320000000')
  })

  constructor(private titleService: Title, private apollo: Apollo) {
    this.titleService.setTitle('Signup');
  }

  ngOnInit(): void {
  }

  submit() {
    const form = this.signUpForm.value;
    const insert_user = gql`
      mutation new_user(
        $im: Int!
        $lastname: String!
        $phone: String!
        $title: String!
        $username: String!
        $hashed: String!
        $email: String!
        $firstname: String!
        $entity_id: Int!
      ) {
        insert_user(
          objects: {
            im: $im
            lastname: $lastname
            phone: $phone
            title: $title
            username: $username
            hashed: $hashed
            email: $email
            firstname: $firstname
            entity_id: $entity_id
          }
        ) {
          returning {
            id
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: insert_user,
        variables: {
          firstname: form.firstname,
          lastname: form.lastname,
          im: form.im,
          title: form.title,
          entity_id: form.entity_id,
          email: form.email,
          username: form.username,
          hashed: form.password,
          phone: form.phone,
        },
      })
      .subscribe((data) => {
        next: console.log(data);
      });
  }
}
