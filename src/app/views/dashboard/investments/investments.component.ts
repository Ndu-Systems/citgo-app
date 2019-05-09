import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models';
import { InvestmentService, AuthenticateService } from 'src/app/services';
import { User } from 'src/app/models/user';




@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})


export class InvestmentsComponent implements OnInit {

  investmentsList: Investment[] = [];
  status: string = '';
  user: User;
  constructor(private investmentService: InvestmentService, private authenticationService: AuthenticateService) { }

  ngOnInit() {
this.investmentService.clientshares.subscribe(val=>{
  this.investmentsList = val;
})

    this.user = this.authenticationService.currentUserValue;
    this.investmentService.getInvestmentsByClientId(this.user.ClientId).subscribe(response => {
     if(response.investments){
       this.investmentService.setInvestments(response.investments);
       
      // this.investmentsList = response.investments;
      // this.investmentsList.forEach(inv => {
      //   if (Number(inv.StatusId) === 1) {
      //     this.status = 'ACTIVE';
      //   }
      // });
     }

    });
  }
}
