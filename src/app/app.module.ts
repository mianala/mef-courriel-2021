import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LogsComponent } from './admin/logs/logs.component';
import { FeedbacksComponent } from './admin/feedbacks/feedbacks.component';
import { DocsComponent } from './docs/docs.component';
import { HelpComponent } from './help/help.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewerComponent } from './shared/file-viewer/viewer.component';
import { SettingsComponent } from './app/settings/settings.component';
import { ConversationComponent } from './chat/pages/conversation/conversation.component';
import { EmptyConversationComponent } from './chat/pages/conversation/empty-conversation/empty-conversation.component';
import { MessageComponent } from './chat/components/message/message.component';
import { ConversationListComponent } from './chat/conversation-list/conversation-list.component';
import { FeedbackComponent } from './app/feedback/feedback.component';
import { AppPageComponent } from './app/app-root/app-root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from './modules/firebase.module';
import { MaterialModule } from './modules/material.module';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmptySearchResultComponent } from './search/empty-search-result/empty-search-result.component';
import { SearchResultComponent } from './search/search/search.component';
import { SearchHomeComponent } from './search/search-home/search-home.component';
import { ResultListComponent } from './search/components/result-list/result-list.component';
import { ResultItemComponent } from './search/components/result-item/result-item.component';
import { FileUploadButtonComponent } from './app/flows/components/file-upload-button/file-upload-button.component';
import { FilesComponent } from './app/flows/components/files/files.component';
import { ApolloModule } from './modules/apollo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestingGroundComponent } from './shared/testing-ground/testing-ground.component';
import { ViewComponent } from './app/users/view/view.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { BackButtonComponent } from './shared/back-button/back-button.component';
import { ReplyFormComponent } from './app/flows/form/reply-form/reply-form.component';
import { LandingComponent } from './home/landing-page/landing.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HeaderComponent } from './home/header/header.component';
import { SignedUpComponent } from './auth/signed-up/signed-up.component';
import { AppsComponent } from './apps/apps.component';
import { RouterOutletComponent } from './shared/router-outlet/router-outlet.component';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';
import { AddNewEntityComponent } from './app/entities/add-new-entity/add-new-entity.component';
import { EntitiesChipAutocompleteComponent } from './app/entities/components/entities-chip-autocomplete/entities-chip-autocomplete.component';
import { EntityAutocompleteComponent } from './app/entities/components/entity-autocomplete/entity-autocomplete.component';
import { EditEntityComponent } from './app/entities/edit-entity/edit-entity.component';
import { EntitiesComponent } from './app/entities/entities.component';
import { EntityPageComponent } from './app/entities/entity-page/entity-page.component';
import { EntityUsersComponent } from './app/entities/entity-users/entity-users.component';
import { EntityComponent } from './app/entities/entity/entity.component';
import { AssignFlowComponent } from './app/flows/assign-flow/assign-flow.component';
import { FlowItemComponent } from './app/flows/components/flow-item/flow-item.component';
import { FlowLoadingComponent } from './app/flows/components/flow-loading/flow-loading.component';
import { FlowRouteItemComponent } from './app/flows/components/flow-route-item/flow-route-item.component';
import { FlowsLoadingComponent } from './app/flows/components/flows-loading/flows-loading.component';
import { LabelsComponent } from './app/flows/components/labels/labels.component';
import { LetterTextsComponent } from './app/flows/components/letter-texts/letter-texts.component';
import { ObservationsComponent } from './app/flows/components/observations/observations.component';
import { FlowRouteComponent } from './app/flows/flow-route/flow-route.component';
import { FlowTopbarComponent } from './app/flows/flow-topbar/flow-topbar.component';
import { FlowsComponent } from './app/flows/flows.component';
import { SaveFlowFormComponent } from './app/flows/form/save-flow/save-flow.component';
import { SendFlowFormComponent } from './app/flows/form/send-flow/send-flow.component';
import { SaveFlowPageComponent } from './app/flows/save-flow-page/save-flow-page.component';
import { ViewFlowPageComponent } from './app/flows/view-flow-page/view-flow-page.component';
import { UsersChipAutocompleteComponent } from './app/users/components/users-chip-autocomplete/users-chip-autocomplete.component';
import { EditUserComponent } from './app/users/edit-user/edit-user.component';
import { UserResetPasswordComponent } from './app/users/logged-in-user-reset-password/user-reset-password.component';
import { UserPageComponent } from './app/users/user-page/user-page.component';
import { UserComponent } from './app/users/user/user.component';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UsersComponent } from './app/users/users.component';
import { ChatComponent } from './chat/chat.component';
import { SearchPageComponent } from './search/search-page/search-page.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LogsComponent,
    FeedbacksComponent,
    DocsComponent,
    SearchPageComponent,
    HelpComponent,
    DashboardComponent,
    ViewerComponent,
    SettingsComponent,
    ConversationComponent,
    EmptyConversationComponent,
    MessageComponent,
    ConversationListComponent,
    FeedbackComponent,
    AppPageComponent,
    ResetPasswordComponent,
    EmptySearchResultComponent,
    SearchResultComponent,
    SearchHomeComponent,
    ResultListComponent,
    ResultItemComponent,
    FileUploadButtonComponent,
    FilesComponent,
    TestingGroundComponent,
    ViewComponent,
    BackButtonComponent,
    ReplyFormComponent,
    LandingComponent,
    HeaderComponent,
    SignedUpComponent,
    AppsComponent,
    RouterOutletComponent,
    NotFoundPageComponent,

    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,

    AssignFlowComponent,
    FlowsComponent,
    FlowItemComponent,
    ViewFlowPageComponent,
    FlowTopbarComponent,
    SettingsComponent,
    SaveFlowPageComponent,
    SaveFlowFormComponent,
    SendFlowFormComponent,
    FlowsLoadingComponent,
    FlowLoadingComponent,
    FlowRouteComponent,
    FlowRouteItemComponent,

    UserPageComponent,
    UserResetPasswordComponent,
    EditUserComponent,
    UsersChipAutocompleteComponent,
    UserComponent,
    EntityUsersComponent,
    UsersComponent,

    EntityComponent,
    AddNewEntityComponent,
    EditEntityComponent,
    EntityPageComponent,
    EntityAutocompleteComponent,
    EntitiesComponent,
    EntitiesChipAutocompleteComponent,
    LabelsComponent,
    ObservationsComponent,
    LetterTextsComponent,

    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FirebaseModule,
    ApolloModule,
    ReactiveFormsModule,
    FormsModule,

    MaterialModule,
    NgxDocViewerModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
