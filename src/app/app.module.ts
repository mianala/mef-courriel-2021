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
import { ViewerComponent } from './viewer/viewer.component';
import { ChatComponent } from './chat/chat.component';
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
import { EntityComponent } from './app/entities/entity/entity.component';
import { UsersComponent } from './app/users/users.component';
import { FeedbackComponent } from './app/feedback/feedback.component';
import { SharedComponent } from './app/shared/shared.component';
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
import { SaveFlowDialogComponent } from './app/flow/dialogs/save-flow-dialog/save-flow-dialog.component';
import { ComposeFlowDialogComponent } from './app/flow/dialogs/compose-flow-dialog/compose-flow-dialog.component';
import { FollupUpFlowDialogComponent } from './app/flow/dialogs/follup-up-flow-dialog/follup-up-flow-dialog.component';
import { SendFlowDialogComponent } from './app/flow/dialogs/send-flow-dialog/send-flow-dialog.component';
import { AssignFlowComponent } from './app/flow/assign-flow/assign-flow.component';
import { CloseFlowDialogComponent } from './app/flow/dialogs/close-flow-dialog/close-flow-dialog.component';
import { FileUploadButtonComponent } from './app/flow/components/file-upload-button/file-upload-button.component';
import { FilesComponent } from './app/flow/components/files/files.component';
import { ApolloModule } from './modules/apollo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './app/users/user/user.component';
import { AddNewEntityComponent } from './app/entities/add-new-entity/add-new-entity.component';
import { EditEntityComponent } from './app/entities/edit-entity/edit-entity.component';
import { TestingGroundComponent } from './testing-ground/testing-ground.component';
import { EntityAutocompleteComponent } from './app/entities/components/entity-autocomplete/entity-autocomplete.component';
import { LabelsComponent } from './app/flow/components/labels/labels.component';
import { EntityUsersComponent } from './app/entities/entity-users/entity-users.component';
import { EntityPageComponent } from './app/entities/entity-page/entity-page.component';
import { SaveFlowPageComponent } from './app/flow/save-flow-page/save-flow-page.component';
import { FlowLandingPageComponent } from './app/flow/pages/flow-landing-page/flow-landing-page.component';
import { SaveFlowFormComponent } from './app/flow/form/save-flow-form/save-flow-form.component';
import { ViewComponent } from './app/users/view/view.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { UserPageComponent } from './app/user/user-page/user-page.component';
import { UserResetPasswordComponent } from './app/user/user-reset-password/user-reset-password.component';
import { EditUserComponent } from './app/user/edit-user/edit-user.component';
import { EntitiesChipAutocompleteComponent } from './app/entities/components/entities-chip-autocomplete/entities-chip-autocomplete.component';
import { SendFlowFormComponent } from './app/flow/form/send-flow-form/send-flow-form.component';
import { UsersChipAutocompleteComponent } from './app/users/components/users-chip-autocomplete/users-chip-autocomplete.component';
import { BackButtonComponent } from './app/components/back-button/back-button.component';
import { FlowsLoadingComponent } from './app/flows/components/flows-loading/flows-loading.component';
import { ReplyFormComponent } from './app/flow/form/reply-form/reply-form.component';
import { FlowLoadingComponent } from './app/flows/components/flow-loading/flow-loading.component';
import { EmptyFlowsComponent } from './app/flows/components/empty-flows/empty-flows.component';
import { LandingComponent } from './home/landing/landing.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HeaderComponent } from './home/header/header.component';
import { SignedUpComponent } from './auth/signed-up/signed-up.component';
import { ObservationsComponent } from './flow/components/observations/observations.component';
import { UserEntityPageComponent } from './entity/user-entity-page/user-entity-page.component';
import { RouteComponent } from './app/flow/route/route.component';
import { RouteItemComponent } from './app/flow/components/route-item/route-item.component';
import { AppsComponent } from './apps/apps.component';
import { RouterComponent } from './router/router.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LetterTextsComponent } from './app/flow/components/letter-texts/letter-texts.component';

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
    SharedComponent,
    AppPageComponent,
    ResetPasswordComponent,
    EmptySearchResultComponent,
    SearchResultComponent,
    SearchHomeComponent,
    ResultListComponent,
    ResultItemComponent,
    SaveFlowDialogComponent,
    ComposeFlowDialogComponent,
    FollupUpFlowDialogComponent,
    SendFlowDialogComponent,
    AssignFlowComponent,
    CloseFlowDialogComponent,
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
    FlowLandingPageComponent,
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
    EmptyFlowsComponent,
    LandingComponent,
    HeaderComponent,
    SignedUpComponent,
    ObservationsComponent,
    UserEntityPageComponent,
    RouteComponent,
    RouteItemComponent,
    AppsComponent,
    RouterComponent,
    NotFoundComponent,
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
    NgxDocViewerModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
