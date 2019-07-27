import { ClientProfileComponent } from './admin-components/client-profile/client-profile.component';
import { EnquireComponent } from './enquire/enquire.component';
import { DoWithdrawalComponent } from './do-withdrawal/do-withdrawal.component';
import { CreatePasswordComponent } from './user-profile/my-profile/create-password/create-password.component';
import { AllClientsComponent } from './admin-components/all-clients/all-clients.component';
import { ToActionComponent } from './admin-components/to-action/to-action.component';
import { AdminSammaryComponent } from './admin-components/admin-sammary/admin-sammary.component';
import { AdminNavComponent } from './admin-components/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin-components/admin-home/admin-home.component';
import { ShareDetailsComponent } from './investments/share-details/share-details.component';
import { MyRefferalsComponent } from './my-refferals/my-refferals.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProfitComponent } from './profit/profit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavComponent } from './dashboard-nav';

import { InvestmentsComponent, BuyShareComponent } from './investments';
import { AuthGuard } from 'src/app/guards/auth.guard';
import {
  CLIENT_USER_ROLE,
  ADMIN_USER_ROLE,
  UPDATE_CONTACT_INFO
} from 'src/app/shared/config';
import { DashFooterComponent } from './dash-footer/dash-footer.component';
import { UpdatePasswordComponent, MyProfileComponent } from './user-profile';
import { UploadComponent } from './uplaod/upload.component';
import { ClientStatsComponent } from './dashboard-home/client-stats/client-stats.component';
import { PaymentComponent } from './investments/payment/payment.component';
import { UpdatePersonalInfoComponent } from './user-profile/updates/update-personal-info/update-personal-info.component';
import { UpdateBaningInfoComponent } from './user-profile/updates/update-baning-info/update-baning-info.component';
import { UpdateBenefitiariesComponent } from './user-profile/updates/update-benefitiaries/update-benefitiaries.component';
import { WithDrawalsComponent } from './admin-components/with-drawals/with-drawals.component';
import { SearchSharePipe } from 'src/app/pipes/search-share.pipe';
import { SearchClientsPipe } from 'src/app/pipes/search-clients.pipe';
import { AdminViewClientStatComponent } from './admin-components/admin-view-client-stat/admin-view-client-stat.component';
import { AdminViewClientSharesComponent } from './admin-components/admin-view-client-shares/admin-view-client-shares.component';
import { AdminViewClinetReferalsComponent } from './admin-components/admin-view-clinet-referals/admin-view-clinet-referals.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [CLIENT_USER_ROLE, ADMIN_USER_ROLE] },
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'dashboard', component: DashboardHomeComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: 'create-password', component: CreatePasswordComponent },
      { path: 'my-refferals/:id', component: MyRefferalsComponent },
      { path: 'buy-share/:id', component: BuyShareComponent },
      { path: 'do-withdrawal/:id', component: DoWithdrawalComponent },
      { path: 'share-details/:id', component: ShareDetailsComponent },
      { path: 'payment/:id', component: PaymentComponent },
      { path: 'enquire/:id', component: EnquireComponent },
      { path: 'my-profile', component: MyProfileComponent },

      // updates
      {
        path: 'update-personal-info/:id',
        component: UpdatePersonalInfoComponent
      },
      { path: 'update-banking-info/:id', component: UpdateBaningInfoComponent },
      {
        path: 'update-benefitiaries/:id',
        component: UpdateBenefitiariesComponent
      },

      // admin
      { path: 'shares/:id', component: ToActionComponent },
      { path: 'clients/:id', component: AllClientsComponent },
      { path: 'client-profile/:id', component: ClientProfileComponent },
      { path: 'with-drawals/:id', component: WithDrawalsComponent },
      { path: 'admin-view-clinet-referals/:id', component: AdminViewClinetReferalsComponent}
    ]
  }
];

export const declarations: Array<any> = [
  DashboardComponent,
  DashboardNavComponent,
  InvestmentsComponent,
  ProfitComponent,
  DashboardHomeComponent,
  DashFooterComponent,
  BuyShareComponent,
  UpdatePasswordComponent,
  MyRefferalsComponent,
  UploadComponent,
  MyProfileComponent,
  ShareDetailsComponent,
  PaymentComponent,
  DoWithdrawalComponent,
  // admin
  AdminHomeComponent,
  AdminNavComponent,
  AdminSammaryComponent,
  ToActionComponent,
  AllClientsComponent,
  ClientStatsComponent,
  ClientProfileComponent,
  WithDrawalsComponent,
  AdminViewClientStatComponent,
  AdminViewClientSharesComponent,
  AdminViewClinetReferalsComponent,

  // update
  UpdatePersonalInfoComponent,
  UpdateBaningInfoComponent,
  UpdateBenefitiariesComponent,
  CreatePasswordComponent,
  EnquireComponent,

  // pipes 
  SearchSharePipe,
  SearchClientsPipe
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
