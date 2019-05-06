import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavComponent } from './dashboard-nav';
 
import { InvestmentsComponent } from './investments';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [{ path: '', component: InvestmentsComponent }]
    }
];

export const declarations: Array<any> = [
    DashboardComponent,
    DashboardNavComponent, 
    InvestmentsComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
