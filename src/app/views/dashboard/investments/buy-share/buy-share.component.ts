import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExitModalEventEmmiter } from 'src/app/models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService, InvestmentService } from 'src/app/services';
@Component({
  selector: 'app-buy-share',
  templateUrl: './buy-share.component.html',
  styleUrls: ['./buy-share.component.scss']
})
export class BuyShareComponent implements OnInit {
  @Output() closeBuySharesModalAction: EventEmitter<ExitModalEventEmmiter> = new EventEmitter();
  rForm: FormGroup;
  error = '';
  loading;
  currentUser;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticateService,
    private investmentService: InvestmentService
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.rForm = this.fb.group({
      Amount: ['', Validators.required],
      Name: ['', Validators.required],
      Type: ['', Validators.required],
      ClientId: [this.currentUser.ClientId]
    });
  }

  closeModal() {
    this.closeBuySharesModalAction.emit({
      close: true
    });
  }


  buy(data) {
    this.error = '';
    console.log('NEW SHARE', data);
    this.investmentService.buyShares(data).subscribe(response => {
      if(response.investments){
        this.investmentService.setInvestments(response.investments);

       }
    })
    this.closeModal();
  }
}
