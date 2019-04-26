import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavComponent } from './dashboard-nav';
import { StatsComponent } from './stats';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [{ path: '', component: StatsComponent }]
    }
];

export const declarations: Array<any> = [
    DashboardComponent,
    DashboardNavComponent,
    StatsComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }