import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { ViewerComponent } from './file-viewer/viewer.component';
import { ChatComponent } from './chat/chat.component';
import { FlowsComponent } from './app/flows/flows.component';
import { FlowItemComponent } from './app/flows/components/flow-item/flow-item.component';
import { ViewFlowPageComponent } from './app/flows/view-flow-page/view-flow-page.component';
import { FlowTopbarComponent } from './app/flows/flow-topbar/flow-topbar.component';
import { SettingsComponent } from './app/settings/settings.component';
import { ConversationComponent } from './chat/pages/conversation/conversation.component';
import { EmptyConversationComponent } from './chat/pages/conversation/empty-conversation/empty-conversation.component';
import { MessageComponent } from './chat/components/message/message.component';
import { ConversationListComponent } from './chat/conversation-list/conversation-list.component';
import { EntitiesComponent } from './app/entities/entities.component';
import { EntityComponent } from './app/entities/entity/entity.component';
import { UsersComponent } from './app/users/users.component';
import { FeedbackComponent } from './app/feedback/feedback.component';
import { AppPageComponent } from './app/app-page/app-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from './modules/firebase.module';
import { MaterialModule } from './modules/material.module';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmptySearchResultComponent } from './search/empty-search-result/empty-search-result.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { SearchHomeComponent } from './search/search-home/search-home.component';
import { ResultListComponent } from './search/components/result-list/result-list.component';
import { ResultItemComponent } from './search/components/result-item/result-item.component';
import { AssignFlowComponent } from './app/flows/assign-flow/assign-flow.component';
import { FileUploadButtonComponent } from './app/flows/components/file-upload-button/file-upload-button.component';
import { FilesComponent } from './app/flows/components/files/files.component';
import { ApolloModule } from './modules/apollo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './app/users/user/user.component';
import { AddNewEntityComponent } from './app/entities/add-new-entity/add-new-entity.component';
import { EditEntityComponent } from './app/entities/edit-entity/edit-entity.component';
import { TestingGroundComponent } from './testing-ground/testing-ground.component';
import { EntityAutocompleteComponent } from './app/entities/components/entity-autocomplete/entity-autocomplete.component';
import { LabelsComponent } from './app/flows/components/labels/labels.component';
import { EntityUsersComponent } from './app/entities/entity-users/entity-users.component';
import { EntityPageComponent } from './app/entities/entity-page/entity-page.component';
import { SaveFlowPageComponent } from './app/flows/save-flow-page/save-flow-page.component';
import { SaveFlowFormComponent } from './app/flows/form/save-flow/save-flow.component';
import { ViewComponent } from './app/users/view/view.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { EditUserComponent } from './app/users/edit-user/edit-user.component';
import { EntitiesChipAutocompleteComponent } from './app/entities/components/entities-chip-autocomplete/entities-chip-autocomplete.component';
import { SendFlowFormComponent } from './app/flows/form/send-flow/send-flow.component';
import { UsersChipAutocompleteComponent } from './app/users/components/users-chip-autocomplete/users-chip-autocomplete.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { ReplyFormComponent } from './app/flows/form/reply-form/reply-form.component';
import { LandingComponent } from './home/landing/landing.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HeaderComponent } from './home/header/header.component';
import { SignedUpComponent } from './auth/signed-up/signed-up.component';
import { ObservationsComponent } from './app/flows/components/observations/observations.component';
import { FlowRouteComponent } from './app/flows/flow-route/flow-route.component';
import { FlowRouteItemComponent } from './app/flows/components/flow-route-item/flow-route-item.component';
import { AppsComponent } from './apps/apps.component';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LetterTextsComponent } from './app/flows/components/letter-texts/letter-texts.component';
import { UserPageComponent } from './app/users/user-page/user-page.component';
import { UserResetPasswordComponent } from './app/users/logged-in-user-reset-password/user-reset-password.component';
import { FlowsLoadingComponent } from './app/flows/components/flows-loading/flows-loading.component';
import { FlowLoadingComponent } from './app/flows/components/flow-loading/flow-loading.component';

registerLocaleData(localeFr);

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
    FlowsComponent,
    FlowItemComponent,
    ViewFlowPageComponent,
    FlowTopbarComponent,
    SettingsComponent,
    ConversationComponent,
    EmptyConversationComponent,
    MessageComponent,
    ConversationListComponent,
    EntitiesComponent,
    EntityComponent,
    UsersComponent,
    FeedbackComponent,
    AppPageComponent,
    ResetPasswordComponent,
    EmptySearchResultComponent,
    SearchResultComponent,
    SearchHomeComponent,
    ResultListComponent,
    ResultItemComponent,
    AssignFlowComponent,
    FileUploadButtonComponent,
    FilesComponent,
    UserComponent,
    AddNewEntityComponent,
    EditEntityComponent,
    TestingGroundComponent,
    EntityAutocompleteComponent,
    LabelsComponent,
    EntityUsersComponent,
    EntityPageComponent,
    SaveFlowPageComponent,
    SaveFlowFormComponent,
    ViewComponent,
    UserPageComponent,
    UserResetPasswordComponent,
    EditUserComponent,
    EntitiesChipAutocompleteComponent,
    SendFlowFormComponent,
    UsersChipAutocompleteComponent,
    BackButtonComponent,
    FlowsLoadingComponent,
    ReplyFormComponent,
    FlowLoadingComponent,
    LandingComponent,
    HeaderComponent,
    SignedUpComponent,
    ObservationsComponent,
    FlowRouteComponent,
    FlowRouteItemComponent,
    AppsComponent,
    RouterOutletComponent,
    NotFoundPageComponent,
    LetterTextsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FirebaseModule,
    ApolloModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDocViewerModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
