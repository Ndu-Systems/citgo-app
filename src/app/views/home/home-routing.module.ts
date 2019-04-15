import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {
    IndexComponent,
    ControlSectionComponent,
    AssetsComponentComponent,
    GrowthSectionComponent
} from './index';
import { FormPersolDetailsComponent } from './client-sign-up';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: IndexComponent }
        ]
    }
];
export const declarations: Array<any> = [
    HomeComponent,
    IndexComponent,
    FormPersolDetailsComponent,
    ControlSectionComponent,
    AssetsComponentComponent,
    GrowthSectionComponent
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }