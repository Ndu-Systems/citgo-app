import { UpdateEmailAddressComponent } from './../dashboard/user-profile/updates/update-email-address/update-email-address.component';
import { ForgotPasswordComponent } from './client-sign-in/forgot-password/forgot-password.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import {
  IndexComponent,
  ControlSectionComponent,
  AssetsComponentComponent,
  GrowthSectionComponent,
  ApartSectionComponent,
  InvestSectionComponent
} from "./index";
import {
  FormPersolDetailsComponent,
  FormBeneficiariesComponent,
  FormBankingDetailsComponent
} from "./client-sign-up";

import { FooterSectionComponent } from "./footer-section";
import { HomeNavComponent } from "./home-nav";
import { SignInComponent, ResetPasswordComponent } from "./client-sign-in";
import { VERIFICATIONLINK, RESET_PASSWORD, REFERALLINK, UPDATE_CONTACT_INFO, REQUEST_NEW_EMAIL_REQUEST } from "src/app/shared/config";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { HowItWorksComponent } from "./how-it-works";
import { ContactUsComponent } from "./contact-us";
import { CalculatorComponent } from "./index/calculator";
import { EmailSentScreenComponent } from "./client-sign-up/email-sent-screen/email-sent-screen.component";
import { EmailNotificationComponent } from './email-notification';
import { SignUpFromLinkComponent } from './client-sign-up/sign-up-from-link/sign-up-from-link.component';
import { UpdateContactInfoComponent } from '../dashboard/user-profile/updates/update-contact-info/update-contact-info.component';
import { SessionExpiredComponent } from './session-expired/session-expired.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: `${VERIFICATIONLINK}/:id`,
        component: VerifyEmailComponent
      },
      {
        path: `${RESET_PASSWORD}/:id`,
        component: ResetPasswordComponent
      },
      {
        path: `${REFERALLINK}/:id`,
        component: SignUpFromLinkComponent
      },
      {
        path: "how-it-works",
        component: HowItWorksComponent
      },
      {
        path: "contact-us",
        component: ContactUsComponent
      },
      { path: `${UPDATE_CONTACT_INFO}/:id`, component: UpdateContactInfoComponent },
      { path: `${REQUEST_NEW_EMAIL_REQUEST}/:id`, component: UpdateEmailAddressComponent },
      { path: `session-expired`, component: SessionExpiredComponent },

    ]
  }
];
export const declarations: Array<any> = [
  HomeComponent,
  IndexComponent,
  FormPersolDetailsComponent,
  ControlSectionComponent,
  AssetsComponentComponent,
  GrowthSectionComponent,
  ApartSectionComponent,
  InvestSectionComponent,
  FooterSectionComponent,
  HomeNavComponent,
  FormBankingDetailsComponent,
  FormBeneficiariesComponent,
  SignInComponent,
  VerifyEmailComponent,
  HowItWorksComponent,
  ContactUsComponent,
  CalculatorComponent,
  EmailSentScreenComponent,
  ForgotPasswordComponent,
  EmailNotificationComponent,
  ResetPasswordComponent,
  SignUpFromLinkComponent,
  UpdateContactInfoComponent,
  UpdateEmailAddressComponent,
  SessionExpiredComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
