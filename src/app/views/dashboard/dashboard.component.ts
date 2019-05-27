import { AuthenticateService, NotificationProcessService, InvestmentService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { ADMIN_USER_ROLE, SHARE_PENDING } from 'src/app/shared/config';
import { UserNotification } from 'src/app/models/processes/notification.process.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCurrentUserAdmin: boolean=false;
  showUplaod: boolean=false;

  constructor(private authenticateService:AuthenticateService,  
    private notificationProcessService: NotificationProcessService,
    private investmentService:InvestmentService
    ) { }

  ngOnInit() {
    const user = this.authenticateService.currentUserValue;
    this.isCurrentUserAdmin = Number(user.Role)==ADMIN_USER_ROLE;

    //get investments
    this.investmentService
    .getInvestmentsByClientId(user.ClientId)
    .subscribe(response => {
      if (response.investments) {
        this.notificationProcessService.updateNotificationProcessState([])
          let pendings = response.investments.filter(x => Number(x.StatusId) == SHARE_PENDING);
          if (pendings.length > 0) {
            let nots: UserNotification[] = [];
            pendings.forEach(investent => {
              nots.push({ id: investent.InvestmentId,isShare:true, message: `Please uplaod proof of payment for ${investent.Name}` });
            });
            this.notificationProcessService.updateNotificationProcessState(nots);
          }

      }
    });

    // notifications
    this.notificationProcessService.castNotificationProcess.subscribe(
      process => {
        this.showUplaod = process.showUplaod;
      }
    );
  }

}
