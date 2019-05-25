import { AuthenticateService } from 'src/app/services/home/user/authenticate.service';
import { User } from 'src/app/models/user';
import { CleintService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-refferals',
  templateUrl: './my-refferals.component.html',
  styleUrls: ['./my-refferals.component.scss']
})
export class MyRefferalsComponent implements OnInit {
user:User
refferals$:Observable<any> ;
  constructor(private cleintService:CleintService, private authenticateService:AuthenticateService) { 
    this.user = this.authenticateService.currentUserValue;
  }

  ngOnInit() {
    this.refferals$ = this.cleintService.getClientReferrals(this.user.ClientId);
  }

}
