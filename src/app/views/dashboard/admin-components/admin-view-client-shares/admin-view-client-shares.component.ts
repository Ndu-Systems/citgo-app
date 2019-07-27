import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models';
import { DAILY_GROWTH, SHARE_REMOVED } from 'src/app/shared/config';
import { User } from 'src/app/models/user';
import { InvestmentService, AuthenticateService, NotificationProcessService, CleintService } from 'src/app/services';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-view-client-shares',
  templateUrl: './admin-view-client-shares.component.html',
  styleUrls: ['./admin-view-client-shares.component.scss']
})
export class AdminViewClientSharesComponent implements OnInit {

  investmentsList: Investment[] = [];
  status = '';
  clientId = '';
  DAILY_GROWTH = DAILY_GROWTH;
  constructor(
    private investmentService: InvestmentService,
    private cleintService: CleintService,
  ) {
    this.clientId = this.cleintService.getSelectedClientId();
   }

  ngOnInit() {
    this.init();
  }
  init() {
    this.investmentService
      .getInvestmentsByClientId(this.clientId)
      .subscribe(response => {
        if (response.investments) {
          this.investmentService.setInvestments(response.investments);
        }
      });

    this.investmentService.castClientshares.subscribe(val => {
      if (val) {
        this.investmentsList = val;
      }
    });
  }



}
