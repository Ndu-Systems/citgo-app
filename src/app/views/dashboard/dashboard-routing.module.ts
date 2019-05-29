import { AllClientsComponent } from './admin-components/all-clients/all-clients.component';
import { ToActionComponent } from './admin-components/to-action/to-action.component';
import { AdminSammaryComponent } from './admin-components/admin-sammary/admin-sammary.component';
import { AdminNavComponent } from './admin-components/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin-components/admin-home/admin-home.component';
import { ShareDetailsComponent } from './investments/share-details/share-details.component';
import { MyRefferalsComponent } from './my-refferals/my-refferals.component';
import { DashboardHomeComponent } from "./dashboard-home/dashboard-home.component";
import { ProfitComponent } from "./profit/profit.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardNavComponent } from "./dashboard-nav";

import { InvestmentsComponent, BuyShareComponent } from "./investments";
import { AuthGuard } from "src/app/guards/auth.guard";
import { CLIENT_USER_ROLE, ADMIN_USER_ROLE } from "src/app/shared/config";
import { DashFooterComponent } from "./dash-footer/dash-footer.component";
import { UpdatePasswordComponent, MyProfileComponent } from "./user-profile";
import { UploadComponent } from './uplaod/upload.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [CLIENT_USER_ROLE, ADMIN_USER_ROLE] },
    children: [
      { path: "", component: DashboardHomeComponent },
      { path: "update-password", component: UpdatePasswordComponent },
      { path: "my-refferals/:id", component: MyRefferalsComponent },
      { path: "share-details/:id", component: ShareDetailsComponent },
      { path: "my-profile", component: MyProfileComponent },
      
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
  //admin
  AdminHomeComponent,
  AdminNavComponent,
  AdminSammaryComponent,
  ToActionComponent,
  AllClientsComponent
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
