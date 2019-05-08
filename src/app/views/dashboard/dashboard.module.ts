import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from 'primeng/chart';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';



import { DashboardRoutingModule, declarations } from './dashboard-routing.module';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    MessagesModule,
    MessageModule,
    ToastModule
    
  ],
  declarations: [...declarations],
  providers: [MessageService]

})
export class DashboardModule { }
