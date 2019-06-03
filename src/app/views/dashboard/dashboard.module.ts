import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from 'primeng/chart';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {OverlayPanelModule} from 'primeng/overlaypanel';



import { DashboardRoutingModule, declarations } from './dashboard-routing.module';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  declarations: [...declarations],
  providers: [MessageService]

})
export class DashboardModule { }
