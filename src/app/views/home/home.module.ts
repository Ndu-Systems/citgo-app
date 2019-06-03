import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule, declarations } from "./home-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';
import {ChartModule} from 'primeng/chart';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {InputMaskModule} from 'primeng/inputmask';





@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ChartModule,
    ConfirmDialogModule,
    InputMaskModule
  ],
  declarations: [...declarations],
  providers:[MessageService,ConfirmationService]

})
export class HomeModule {}
