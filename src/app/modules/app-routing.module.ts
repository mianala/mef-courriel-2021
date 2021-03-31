import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { ChatComponent } from '../app/chat/chat.component';
import { FlowComponent } from '../app/flow/flow.component';
import { AuthComponent } from '../auth/auth.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HelpComponent } from '../help/help.component';
import { SearchComponent } from '../search/search.component';
import { ViewerComponent } from '../viewer/viewer.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'viewer',
    component: ViewerComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'app',
    component: AppComponent,
    children: [
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'flow',
        component: FlowComponent,
        children: [
          {
            path: 'all',
            component: FlowComponent, 
          },
          {
            path: 'saved',
            component: FlowComponent, 
          },
          {
            path: 'received',
            component: FlowComponent, 
          },
          {
            path: 'sent',
            component: FlowComponent, 
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
