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
import { AddNewEntityComponent } from '../app/entities/add-new-entity/add-new-entity.component';
import { EditEntityComponent } from '../app/entities/edit-entity/edit-entity.component';
import { TestingGroundComponent } from '../testing-ground/testing-ground.component';
import { SaveFlowPageComponent } from '../app/flow/save-flow-page/save-flow-page.component';
import { FlowPageComponent } from '../app/flow/pages/flow-page/flow-page.component';
import { FlowLandingPageComponent } from '../app/flow/pages/flow-landing-page/flow-landing-page.component';
import { UserPageComponent } from '../app/user/user-page/user-page.component';
import { SettingsComponent } from '../app/settings/settings.component';
import { SendFlowFormComponent } from '../app/flow/form/send-flow-form/send-flow-form.component';
import { EntityUsersComponent } from '../app/entities/entity-users/entity-users.component';
import { AssignFlowComponent } from '../app/flow/assign-flow/assign-flow.component';

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
    path: 'test',
    component: TestingGroundComponent,
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
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'user',
        component: UserPageComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'entities',
        children: [
          {
            path: '',
            component: EntitiesComponent,
          },
          {
            path: 'entity/:entity_id',
            component: EntityUsersComponent,
          },
          {
            path: 'add/:entity_id',
            component: AddNewEntityComponent,
          },
          {
            path: 'edit/:entity_id',
            component: EditEntityComponent,
          },
        ]
      },
      {
        path: 'flow',
        component: FlowLandingPageComponent,
        children: [
          {
            path: '',
            component: FlowComponent,
          },
          {
            path: 'save',
            component: SaveFlowPageComponent,
          },
          {
            path: 'assign/:flow_id',
            component: AssignFlowComponent,
          },
          {
            path: 'project/:flow_id',
            component: FlowPageComponent,
          },
          {
            path: 'send/:flow_id',
            component: SendFlowFormComponent,
          },
          {
            path: 'view',
            component: FlowComponent,
            children: [
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
