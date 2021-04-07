import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  get_users_query = gql`
    query get_users {
      user {
        id
        lastname
        firstname
        email
        phone
        im
        title
      }
    }
  `;

  users: IUser[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo.query({
      query: this.get_users_query,
    }).subscribe(data => {
      next: this.userReceived(data.data)
    })
  }

  userReceived(users:any){
    this.users = users.user
    console.log(users)
  }
}
