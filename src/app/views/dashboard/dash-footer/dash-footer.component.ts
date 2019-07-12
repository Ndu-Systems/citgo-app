import { AuthenticateService } from './../../../services/home/user/authenticate.service';
import { User } from './../../../models/user';
import { CleintService } from 'src/app/services';
import { Client } from 'src/app/models';
import { Component, OnInit } from '@angular/core';
import { ADMIN_USER_ROLE } from 'src/app/shared/config';

@Component({
  selector: 'app-dash-footer',
  templateUrl: './dash-footer.component.html',
  styleUrls: ['./dash-footer.component.scss']
})
export class DashFooterComponent implements OnInit {
  client:Client;
  user: User; // pass role clientId
  IsUserAdmin: boolean;


  constructor(private cleintService:CleintService, private authenticateService:AuthenticateService) { }

  ngOnInit() {
    this.user = this.authenticateService.currentUserValue;
    this.IsUserAdmin = this.user.Role == ADMIN_USER_ROLE;

    this.cleintService.getClientById(this.user.ClientId).subscribe(r => {
      this.client = r;
    });
    

  }

}
