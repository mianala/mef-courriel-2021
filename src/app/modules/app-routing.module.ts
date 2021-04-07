import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { FlowComponent } from '../app/flow/flow.component';
import { AuthComponent } from '../auth/auth.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HelpComponent } from '../help/help.component';
import { SearchComponent } from '../search/search.component';
import { ViewerComponent } from '../viewer/viewer.component';
import { LoginComponent } from '../auth/login/login.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { AppPageComponent } from '../app/app-page/app-page.component';
import { AllComponent } from '../app/flow/pages/all/all.component';
import { SavedComponent } from '../app/flow/pages/saved/saved.component';
import { ReceivedComponent } from '../app/flow/pages/received/received.component';
import { SentComponent } from '../app/flow/pages/sent/sent.component';
import { EntitiesComponent } from '../app/entities/entities.component';
import { UsersComponent } from '../app/users/users.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password/:last_user_update_timestamp/:username',
        component: ResetPasswordComponent,
      },
    ],
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
    component: AppPageComponent,
    children: [
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'entity',
        component: ChatComponent,
      },
      {
        path: 'entities',
        component: EntitiesComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'flow',
        component: FlowComponent,
        children: [
          {
            path: '',
            component: AllComponent,
          },
          {
            path: 'all',
            component: AllComponent,
          },
          {
            path: 'saved',
            component: SavedComponent,
          },
          {
            path: 'received',
            component: ReceivedComponent,
          },
          {
            path: 'sent',
            component: SentComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
