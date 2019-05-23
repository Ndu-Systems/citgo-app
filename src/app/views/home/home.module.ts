import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule, declarations } from "./home-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';
import {ChartModule} from 'primeng/chart';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';





@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ChartModule,
    ConfirmDialogModule
  ],
  declarations: [...declarations],
  providers:[MessageService,ConfirmationService]

})
export class HomeModule {}
