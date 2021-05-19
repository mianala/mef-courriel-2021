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
import { SettingsComponent } from './courriel/settings/settings.component';
import { ConversationComponent } from './chat/pages/conversation/conversation.component';
import { EmptyConversationComponent } from './chat/pages/conversation/empty-conversation/empty-conversation.component';
import { MessageComponent } from './chat/components/message/message.component';
import { ConversationListComponent } from './chat/conversation-list/conversation-list.component';
import { FeedbackComponent } from './courriel/feedback/feedback.component';
import { CourrielRootComponent } from './courriel/courriel-root/courriel-root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from './modules/firebase.module';
import { MaterialModule } from './modules/material.module';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmptySearchResultComponent } from './search/empty-search-result/empty-search-result.component';
import { SearchResultComponent } from './search/search-results-page/search.component';
import { SearchHomeComponent } from './search/search-init/search-init.component';
import { ResultListComponent } from './search/components/result-list/result-list.component';
import { ResultItemComponent } from './search/components/result-item/result-item.component';
import { FileUploadButtonComponent } from './courriel/flows/components/file-upload-button/file-upload-button.component';
import { FilesComponent } from './courriel/flows/components/files/files.component';
import { ApolloModule } from './modules/apollo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestingGroundComponent } from './shared/testing-ground/testing-ground.component';
import { ViewComponent } from './courriel/users/view/view.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { BackButtonComponent } from './shared/back-button/back-button.component';
import { ReplyFormComponent } from './courriel/flows/form/reply-form/reply-form.component';
import { LandingComponent } from './home/landing-page/landing.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HeaderComponent } from './home/header/header.component';
import { SignedUpComponent } from './auth/signed-up/signed-up.component';
import { AppsComponent } from './apps/apps.component';
import { RouterOutletComponent } from './shared/router-outlet/router-outlet.component';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';
import { AddNewEntityComponent } from './courriel/entities/add-new-entity/add-new-entity.component';
import { EntitiesChipAutocompleteComponent } from './courriel/entities/components/entities-chip-autocomplete/entities-chip-autocomplete.component';
import { EntityAutocompleteComponent } from './courriel/entities/components/entity-autocomplete/entity-autocomplete.component';
import { EditEntityComponent } from './courriel/entities/edit-entity/edit-entity.component';
import { EntitiesComponent } from './courriel/entities/entities.component';
import { EntityPageComponent } from './courriel/entities/entity-page/entity-page.component';
import { EntityUsersComponent } from './courriel/entities/entity-users/entity-users.component';
import { EntityComponent } from './courriel/entities/entity/entity.component';
import { AssignFlowComponent } from './courriel/flows/assign-flow/assign-flow.component';
import { FlowItemComponent } from './courriel/flows/components/flow-item/flow-item.component';
import { FlowLoadingComponent } from './components/loading/flow-loading/flow-loading.component';
import { FlowRouteItemComponent } from './courriel/flows/components/flow-route-item/flow-route-item.component';
import { FlowsLoadingComponent } from './components/loading/flows-loading/flows-loading.component';
import { LabelsComponent } from './courriel/flows/components/labels/labels.component';
import { LetterTextsComponent } from './courriel/flows/components/letter-texts/letter-texts.component';
import { ObservationsComponent } from './courriel/flows/components/observations/observations.component';
import { FlowRouteComponent } from './courriel/flows/flow-route/flow-route.component';
import { FlowTopbarComponent } from './courriel/flows/flow-topbar/flow-topbar.component';
import { FlowsComponent } from './courriel/flows/flows.component';
import { SaveFlowFormComponent } from './courriel/flows/form/save-flow/save-flow.component';
import { SendFlowFormComponent } from './courriel/flows/form/send-flow/send-flow.component';
import { SaveFlowPageComponent } from './courriel/flows/save-flow-page/save-flow-page.component';
import { ViewFlowPageComponent } from './courriel/flows/view-flow-page/view-flow-page.component';
import { UsersChipAutocompleteComponent } from './courriel/users/components/users-chip-autocomplete/users-chip-autocomplete.component';
import { EditUserComponent } from './courriel/users/edit-user/edit-user.component';
import { UserResetPasswordComponent } from './courriel/users/logged-in-user-reset-password/user-reset-password.component';
import { UserPageComponent } from './courriel/users/user-page/user-page.component';
import { UserComponent } from './courriel/users/user/user.component';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UsersComponent } from './courriel/users/users.component';
import { ChatComponent } from './chat/chat.component';
import { SearchPageComponent } from './search/search-root/search-root.component';
import { SearchHeaderComponent } from './search/search-header/search-header.component';
import { SentFlowsComponent } from './courriel/sent-flows/sent-flows.component';
import { WithLoadingPipe } from './pipes/with-loading.pipe';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { EntityPageLoadingComponent } from './components/loading/entity-page-loading/entity-page-loading.component';
import { UnverifiedComponent } from './admin/users/unverified/unverified.component';
import { InactiveUsersComponent } from './admin/users/inactive-users/inactive-users.component';
import { InactiveEntitiesComponent } from './admin/entities/inactive-entities/inactive-entities.component';

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
    CourrielRootComponent,
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

    SearchHeaderComponent,

    SentFlowsComponent,

    WithLoadingPipe,

    AdminDashboardComponent,

    EntityPageLoadingComponent,

    UnverifiedComponent,

    InactiveUsersComponent,

    InactiveEntitiesComponent,
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
