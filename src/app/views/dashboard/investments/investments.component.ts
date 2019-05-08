import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models';
import { InvestmentService } from 'src/app/services';
 
 


@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})


export class InvestmentsComponent implements OnInit {

  investmentsList: Investment[] = [];
  status: string = '';
  constructor(private investmentService: InvestmentService) {}

  ngOnInit() {
    this.investmentService.getAllInvestements().subscribe(response => {       
      this.investmentsList = response.investments;
      this.investmentsList.forEach(inv => {
        if (Number(inv.StatusId) === 1) {
          this.status = 'ACTIVE';
        }
      });

    });
  }
}
