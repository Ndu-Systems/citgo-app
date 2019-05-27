import { AuthenticateService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { ADMIN_USER_ROLE } from 'src/app/shared/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCurrentUserAdmin: boolean=false;

  constructor(private authenticateService:AuthenticateService) { }

  ngOnInit() {
    const user = this.authenticateService.currentUserValue;
    this.isCurrentUserAdmin = Number(user.Role)==ADMIN_USER_ROLE;
  }

}
