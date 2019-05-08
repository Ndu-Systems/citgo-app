import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProfitComponent } from './profit/profit.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardNavComponent } from "./dashboard-nav";

import { InvestmentsComponent } from "./investments";
import { AuthGuard } from "src/app/guards/auth.guard";
import { CLIENT_USER_ROLE } from "src/app/shared/config";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [CLIENT_USER_ROLE] } ,
    children: [{ path: "", component: DashboardHomeComponent }]
  }
];

export const declarations: Array<any> = [
  DashboardComponent,
  DashboardNavComponent,
  InvestmentsComponent,
  ProfitComponent,
  DashboardHomeComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
