import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { FlowsComponent } from '../courriel/flows/flows.component';
import { AuthComponent } from '../auth/auth.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HelpComponent } from '../help/help.component';

import { ViewerComponent } from '../shared/file-viewer/viewer.component';
import { LoginComponent } from '../auth/login/login.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { CourrielRootComponent } from '../courriel/courriel-root/courriel-root.component';
import { EntitiesComponent } from '../courriel/entities/entities.component';
import { UsersComponent } from '../courriel/users/users.component';
import { AddNewEntityComponent } from '../courriel/entities/add-new-entity/add-new-entity.component';
import { EditEntityComponent } from '../courriel/entities/edit-entity/edit-entity.component';
import { TestingGroundComponent } from '../shared/testing-ground/testing-ground.component';
import { SaveFlowPageComponent } from '../courriel/flows/save-flow-page/save-flow-page.component';
import { ViewFlowPageComponent } from '../courriel/flows/view-flow-page/view-flow-page.component';
import { SettingsComponent } from '../courriel/settings/settings.component';
import { SendFlowFormComponent } from '../courriel/flows/form/send-flow/send-flow.component';
import { AssignFlowComponent } from '../courriel/flows/assign-flow/assign-flow.component';
import { LandingComponent } from '../home/landing-page/landing.component';
import { SignedUpComponent } from '../auth/signed-up/signed-up.component';
import { EditUserComponent } from '../courriel/users/edit-user/edit-user.component';
import { EntityPageComponent } from '../courriel/entities/entity-page/entity-page.component';
import { FlowRouteComponent } from '../courriel/flows/flow-route/flow-route.component';
import { ReplyFormComponent } from '../courriel/flows/form/reply-form/reply-form.component';
import { RouterOutletComponent } from '../shared/router-outlet/router-outlet.component';
import { NotFoundPageComponent } from '../shared/not-found-page/not-found-page.component';
import { UserPageComponent } from '../courriel/users/user-page/user-page.component';
import { SearchPageComponent } from '../search/search-root/search-root.component';
import { SentFlowsComponent } from '../courriel/sent-flows/sent-flows.component';
import { AdminComponent } from '../admin/admin.component';
import { AppsComponent } from '../apps/apps.component';
import { UnverifiedComponent } from '../admin/users/unverified/unverified.component';
import { InactiveUsersComponent } from '../admin/users/inactive-users/inactive-users.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'apps',
    component: AppsComponent,
  },
  {
    path: 'search',
    component: RouterOutletComponent,
    children: [
      {
        path: '',
        component: SearchPageComponent,
      },
      {
        path: 'flow',
        component: ViewFlowPageComponent,
      },
      {
        path: 'save',
        component: SaveFlowPageComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent,
          },
          {
            path: 'unverified',
            component: UnverifiedComponent,
          },
          {
            path: 'inactive',
            component: InactiveUsersComponent,
          },
        ],
      },
      {
        path: 'entities',
        children: [
          {
            path: '',
            component: EntitiesComponent,
          },
          {
            path: 'entity',
            component: EntityPageComponent,
          },
          {
            path: 'add',
            component: AddNewEntityComponent,
          },
          {
            path: 'edit',
            component: EditEntityComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'viewer',
    component: ViewerComponent,
  },
  {
    path: 'test',
    component: TestingGroundComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
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
        path: 'signed-up',
        component: SignedUpComponent,
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
    path: 'courriel',
    component: CourrielRootComponent,
    children: [
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'entity',
        component: EntityPageComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'user',

        children: [
          {
            path: '',
            component: UserPageComponent,
          },
          {
            path: 'edit',
            component: EditUserComponent,
          },
        ],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'flow',
        component: RouterOutletComponent,
        children: [
          {
            path: 'inbox',
            component: FlowsComponent,
          },
          {
            path: 'sent',
            component: SentFlowsComponent,
          },
          {
            path: 'save',
            component: SaveFlowPageComponent,
          },
          {
            path: 'assign',
            component: AssignFlowComponent,
          },
          {
            path: 'route',
            component: FlowRouteComponent,
          },
          {
            path: 'reply',
            component: ReplyFormComponent,
          },
          {
            path: 'project',
            component: ViewFlowPageComponent,
          },
          {
            path: 'send',
            component: SendFlowFormComponent,
          },
        ],
      },
    ],
  },
  { path: '404', component: NotFoundPageComponent },

  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
