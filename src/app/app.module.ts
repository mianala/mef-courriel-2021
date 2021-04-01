import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AdminComponent } from './admin/admin.component';
import { LogsComponent } from './admin/logs/logs.component';
import { FeedbacksComponent } from './admin/feedbacks/feedbacks.component';
import { DocsComponent } from './docs/docs.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './help/help.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ChatComponent } from './app/chat/chat.component';
import { FlowComponent } from './app/flow/flow.component';
import { AllComponent } from './app/flow/pages/all/all.component';
import { SavedComponent } from './app/flow/pages/saved/saved.component';
import { ReceivedComponent } from './app/flow/pages/received/received.component';
import { SentComponent } from './app/flow/pages/sent/sent.component';
import { FlowListComponent } from './app/flow/components/flow-list/flow-list.component';
import { FlowItemComponent } from './app/flow/components/flow-item/flow-item.component';
import { FlowPageComponent } from './app/flow/pages/flow-page/flow-page.component';
import { ActionsComponent } from './app/flow/components/flow-item/actions/actions.component';
import { FlowTopbarComponent } from './app/flow/flow-topbar/flow-topbar.component';
import { SettingsComponent } from './app/settings/settings.component';
import { ConversationComponent } from './chat/pages/conversation/conversation.component';
import { EmptyComponent } from './app/flow/components/flow-list/empty/empty.component';
import { EmptyConversationComponent } from './chat/pages/conversation/empty-conversation/empty-conversation.component';
import { MessageComponent } from './chat/components/message/message.component';
import { ConversationListComponent } from './chat/conversation-list/conversation-list.component';
import { EntitiesComponent } from './app/entities/entities.component';
import { EntityComponent } from './app/entity/entity.component';
import { UsersComponent } from './app/users/users.component';
import { FeedbackComponent } from './app/feedback/feedback.component';
import { SharedComponent } from './app/shared/shared.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AdminComponent,
    LogsComponent,
    FeedbacksComponent,
    DocsComponent,
    SearchComponent,
    HelpComponent,
    DashboardComponent,
    ViewerComponent,
    ChatComponent,
    FlowComponent,
    AllComponent,
    SavedComponent,
    ReceivedComponent,
    SentComponent,
    FlowListComponent,
    FlowItemComponent,
    FlowPageComponent,
    ActionsComponent,
    FlowTopbarComponent,
    SettingsComponent,
    ConversationComponent,
    EmptyComponent,
    EmptyConversationComponent,
    MessageComponent,
    ConversationListComponent,
    EntitiesComponent,
    EntityComponent,
    UsersComponent,
    FeedbackComponent,
    SharedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
