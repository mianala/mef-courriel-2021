import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink, split } from '@apollo/client/core';
import { environment } from 'src/environments/environment';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = environment.uri;
const wsuri = environment.wsuri;
const HASURA_SECRET = environment.HASURA_SECRET;

const headers =  new HttpHeaders({
  Authorization: localStorage.getItem('token') || '',
  'x-hasura-admin-secret': HASURA_SECRET,
})

interface Definintion {
  kind: string;
  operation?: string;
};



@NgModule({
  exports: [HttpClientModule],
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: split(
            ({ query }) => {
              const { kind, operation }:Definintion = getMainDefinition(query);
              return (
                kind === 'OperationDefinition' && operation === 'subscription'
              );
            },
            new WebSocketLink({
              uri: `${wsuri}`,
              options: {
                reconnect: true,
                timeout: 60000,
                lazy: true,
                connectionParams: { headers }
              },
            }),
            httpLink.create({
              uri: uri,
              headers: headers
            })
          ),
        }
      },
      deps: [HttpLink],
    },
  ],
})
export class ApolloModule {}
