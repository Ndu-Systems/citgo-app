import { BankingInfoService } from './../../services/bankingInfo.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CloseModalEventEmmiter } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getCurrentUser, LAST_INSERT_ID } from 'src/app/shared/config';

@Component({
  selector: 'app-form-banking-details',
  templateUrl: './form-banking-details.component.html',
  styleUrls: ['./form-banking-details.component.scss']
})
export class FormBankingDetailsComponent implements OnInit {

  @Output() closeModalAction: EventEmitter<CloseModalEventEmmiter> = new EventEmitter();

  /*
Form begin here
*/
  rForm: FormGroup;

  //validation
  message: string = "";

  /*
Form ends here
*/
  UserId: string = getCurrentUser();
  clientId: string;

  constructor(
    private fb: FormBuilder,private bankingInfoService:BankingInfoService
  ) {


  }

  ngOnInit() {
this.clientId = localStorage.getItem(LAST_INSERT_ID)
    this.rForm = this.fb.group({
      BankName: [null, Validators.required],
      BankBranch: [null],
      AccountNumber: [null, Validators.required],
      AccountType: [null, Validators.required],
      CreateUserId: [this.clientId, Validators.required],
      StatusId: [1, Validators.required],
      ClientId: [this.clientId, Validators.required]
    });
    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
    });

  }

  closeModal() {
    this.closeModalAction.emit({
      closeAll: true,
      showBankingInfoForm: false,
      showBenefitariesForm: false,
      showPersonalInfoForm: false
    });
  }

  insertBankingInfo(data){
    console.log('Insert Banking Info: ',data);
    this.bankingInfoService.addBankingInfo(data).subscribe(response => {
      if (response) {
        console.log('response',response);
          this.closeModalAction.emit({
          closeAll: false,
          showBankingInfoForm: false,
          showBenefitariesForm: true,
          showPersonalInfoForm: false
        });
      } else {
        alert(`Error: ${response}`);
      }
    });
    
      }
}
