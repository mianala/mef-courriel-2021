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
import { ViewerComponent } from './shared/file-viewer/viewer.component';
import { ChatComponent } from './chat/chat.component';
import { SettingsComponent } from './app/settings/settings.component';
import { ConversationComponent } from './chat/pages/conversation/conversation.component';
import { EmptyConversationComponent } from './chat/pages/conversation/empty-conversation/empty-conversation.component';
import { MessageComponent } from './chat/components/message/message.component';
import { ConversationListComponent } from './chat/conversation-list/conversation-list.component';
import { EntitiesComponent } from './app/entities/entities.component';
import { FeedbackComponent } from './app/feedback/feedback.component';
import { AppPageComponent } from './app/app-root/app-root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from './modules/firebase.module';
import { MaterialModule } from './modules/material.module';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmptySearchResultComponent } from './search/empty-search-result/empty-search-result.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { SearchHomeComponent } from './search/search-home/search-home.component';
import { ResultListComponent } from './search/components/result-list/result-list.component';
import { ResultItemComponent } from './search/components/result-item/result-item.component';
import { FileUploadButtonComponent } from './app/flows/components/file-upload-button/file-upload-button.component';
import { FilesComponent } from './app/flows/components/files/files.component';
import { ApolloModule } from './modules/apollo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestingGroundComponent } from './shared/testing-ground/testing-ground.component';
import { LabelsComponent } from './app/flows/components/labels/labels.component';
import { ViewComponent } from './app/users/view/view.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { EntitiesChipAutocompleteComponent } from './app/entities/components/entities-chip-autocomplete/entities-chip-autocomplete.component';
import { BackButtonComponent } from './shared/back-button/back-button.component';
import { ReplyFormComponent } from './app/flows/form/reply-form/reply-form.component';
import { LandingComponent } from './home/landing-page/landing.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HeaderComponent } from './home/header/header.component';
import { SignedUpComponent } from './auth/signed-up/signed-up.component';
import { ObservationsComponent } from './app/flows/components/observations/observations.component';
import { AppsComponent } from './apps/apps.component';
import { RouterOutletComponent } from './shared/router-outlet/router-outlet.component';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';
import { LetterTextsComponent } from './app/flows/components/letter-texts/letter-texts.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LogsComponent,
    FeedbacksComponent,
    DocsComponent,
    SearchComponent,
    HelpComponent,
    DashboardComponent,
    ViewerComponent,
    ChatComponent,
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
