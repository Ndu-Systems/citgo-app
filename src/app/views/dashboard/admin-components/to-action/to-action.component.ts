import { SpinnerProcessService } from './../../../../services/app-state/spinner-process.service';
import { Bonus } from './../../../../models/bonus.model';
import { CleintService } from './../../../../services/dashboard/cleint.service';
import { MessageService } from 'primeng/api';
import {
  SHARE_PENDING_VERFICATION,
  SHARE_ACTIVE,
  BONUS_PERCENT
} from './../../../../shared/config';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InvestmentService } from 'src/app/services';
import { Investment, Client } from 'src/app/models';
import { BonusService } from 'src/app/services/dashboard/bonus.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-to-action',
  templateUrl: './to-action.component.html',
  styleUrls: ['./to-action.component.scss']
})
export class ToActionComponent implements OnInit {
  shares$: Observable<Investment[]>;
  statusId: any;
  search: string;
  constructor(
    private investmentService: InvestmentService,
    private bonusService: BonusService,
    private messageService: MessageService,
    private cleintService: CleintService,
    private spinnerProcessService: SpinnerProcessService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.statusId = r[`id`];
      this.shares$ =  this.investmentService.getInvestmentsByStatus(this.statusId || SHARE_PENDING_VERFICATION);
    });
  }

  ngOnInit() {}
  Approve(data: Investment) {
    data.StatusId = SHARE_ACTIVE;
    this.spinnerProcessService.showSpinner();
    this.investmentService.updateInvestment(data).subscribe(res => {
      const updatedInvestment: Investment = res;
      if (updatedInvestment.StatusId === SHARE_ACTIVE) {
        this.messageService.add({
          life: 7000,
          severity: 'success',
          summary: 'Now active! ',
          detail: 'Share approved!'
        });

        // update list
        this.shares$ = this.investmentService.getInvestmentsByStatus(SHARE_PENDING_VERFICATION);
        this.spinnerProcessService.closeSpinner();

        // check if client have a parent
        this.cleintService
          .getClientById(updatedInvestment.ClientId)
          .subscribe(clientRes => {
            const client: Client = clientRes;
            if (client.ClientId && client.ParentId) {

              // update the current list

              const bonus: Bonus = {
                Amount: updatedInvestment.Amount * BONUS_PERCENT,
                ClientId: client.ParentId,
                ParentId: updatedInvestment.ClientId,
                CreateUserId: 'SYS',
                ModifyUserId: 'SYS',
                StatusId: 1
              };

              // grant a bonus
              this.bonusService.addBonus(bonus).subscribe(cli => {
                const bunusReceiver: Client = cli;
                this.messageService.add({
                  life: 7000,
                  severity: 'success',
                  summary: 'Now active! ',
                  detail: `Referral bonus of R ${updatedInvestment.Amount *
                    BONUS_PERCENT}  granted to ${bunusReceiver.FirstName} ${
                    bunusReceiver.Surname
                  }`
                });
              });
            }
          });
      }
    });
  }
}
