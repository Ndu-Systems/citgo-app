import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from 'primeng/chart';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { DashboardRoutingModule, declarations } from './dashboard-routing.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AccordionModule} from 'primeng/accordion';
import { SearchSharePipe } from 'src/app/pipes/search-share.pipe';



@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    AccordionModule,
  ],
  declarations: [...declarations,SearchSharePipe],
  providers: [MessageService, ConfirmationService]

})
export class DashboardModule { }
