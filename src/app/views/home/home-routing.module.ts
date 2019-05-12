
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {
  IndexComponent,
  ControlSectionComponent,
  AssetsComponentComponent,
  GrowthSectionComponent,
  ApartSectionComponent,
  InvestSectionComponent
} from './index';
import {
  FormPersolDetailsComponent,
  FormBeneficiariesComponent,
  FormBankingDetailsComponent
} from './client-sign-up';

import { FooterSectionComponent } from './footer-section';
import { HomeNavComponent } from './home-nav';
import { SignInComponent } from './client-sign-in';
import { VERIFICATIONLINK } from 'src/app/shared/config';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { HowItWorksComponent } from './how-it-works';
import { ContactUsComponent } from './contact-us';
import { CalculatorComponent } from './index/calculator';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:
      [
        {
          path: '',
          component: IndexComponent
        },
        {
          path: `${VERIFICATIONLINK}/:id`,
          component: VerifyEmailComponent
        },
        {
          path: 'how-it-works',
          component: HowItWorksComponent
        },
        {
          path: 'contact-us',
          component: ContactUsComponent
        },
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
  CalculatorComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
