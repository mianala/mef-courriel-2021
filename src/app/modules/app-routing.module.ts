import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { FlowsComponent } from '../app/flows/flows.component';
import { AuthComponent } from '../auth/auth.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HelpComponent } from '../help/help.component';
import { SearchComponent } from '../search/search.component';
import { ViewerComponent } from '../shared/file-viewer/viewer.component';
import { LoginComponent } from '../auth/login/login.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { AppPageComponent } from '../app/app-root/app-root.component';
import { EntitiesComponent } from '../app/entities/entities.component';
import { UsersComponent } from '../app/users/users.component';
import { AddNewEntityComponent } from '../app/entities/add-new-entity/add-new-entity.component';
import { EditEntityComponent } from '../app/entities/edit-entity/edit-entity.component';
import { TestingGroundComponent } from '../shared/testing-ground/testing-ground.component';
import { SaveFlowPageComponent } from '../app/flows/save-flow-page/save-flow-page.component';
import { ViewFlowPageComponent } from '../app/flows/view-flow-page/view-flow-page.component';
import { SettingsComponent } from '../app/settings/settings.component';
import { SendFlowFormComponent } from '../app/flows/form/send-flow/send-flow.component';
import { AssignFlowComponent } from '../app/flows/assign-flow/assign-flow.component';
import { LandingComponent } from '../home/landing-page/landing.component';
import { SignedUpComponent } from '../auth/signed-up/signed-up.component';
import { EditUserComponent } from '../app/users/edit-user/edit-user.component';
import { EntityPageComponent } from '../app/entities/entity-page/entity-page.component';
import { FlowRouteComponent } from '../app/flows/flow-route/flow-route.component';
import { ReplyFormComponent } from '../app/flows/form/reply-form/reply-form.component';
import { RouterOutletComponent } from '../shared/router-outlet/router-outlet.component';
import { NotFoundPageComponent } from '../shared/not-found-page/not-found-page.component';
import { UserPageComponent } from '../app/users/user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'search',
    component: RouterOutletComponent,
    children: [
      {
        path: '',
        component: SearchComponent,
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
      {
        path: 'flow',
        component: RouterOutletComponent,
        children: [
          {
            path: '',
            component: FlowsComponent,
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
