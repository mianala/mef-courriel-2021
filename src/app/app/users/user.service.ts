import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  save_new_user = gql`
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

  // save in cookie no sensitive data
  active_user = new User();

  query_login_user = gql`
    query login($username: String!, $hashed: String!) {
      user(where: { username: { _eq: $username }, hashed: { _eq: $hashed } }) {
        id
      }
    }
  `;

  saveNewUser(variables: any) {
    return this.apollo.mutate({
      mutation: this.save_new_user,
      variables: variables,
    });
  }

  logIn(variables: { username: any; hashed: any; }) {
    this.apollo.query({
      query: this.query_login_user,
      variables: variables,
    }).subscribe((data) => {
      next: console.log(data);
    })
  }

  constructor(private apollo: Apollo) {}
}
