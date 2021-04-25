import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from 'src/app/auth/auth.component';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
  ],
  imports: [CommonModule],
})
export class AuthModule {}
