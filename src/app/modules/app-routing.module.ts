import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
