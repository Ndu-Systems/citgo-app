 
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
import { FormPersolDetailsComponent,
          FormBeneficiariesComponent,
          FormBankingDetailsComponent
         } from './client-sign-up';

import { FooterSectionComponent } from './footer-section';
import { HomeNavComponent } from './home-nav';
import { SignInComponent } from './client-sign-in';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: '', component: IndexComponent }]
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
  SignInComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
