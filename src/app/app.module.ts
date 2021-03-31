import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
