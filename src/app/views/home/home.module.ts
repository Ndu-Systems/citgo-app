import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule, declarations } from "./home-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';
import {ChartModule} from 'primeng/chart';




@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ChartModule
  ],
  declarations: [...declarations],
  providers:[MessageService]

})
export class HomeModule {}
