import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';

const uri = environment.uri;
const HASURA_SECRET = environment.HASURA_SECRET;

@NgModule({
  exports: [HttpClientModule],
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: uri,
            headers: new HttpHeaders({
              Authorization: localStorage.getItem('token') || '',
              'x-hasura-admin-secret': environment.HASURA_SECRET,
            }),
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class ApolloModule {}
