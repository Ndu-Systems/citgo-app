import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CloseModalEventEmmiter } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getCurrentUser } from 'src/app/shared/config';

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

  constructor(
    private fb: FormBuilder,
  ) {


  }

  ngOnInit() {

    this.rForm = this.fb.group({
      BankName: [null, Validators.required],
      BankBranch: [null],
      AccountNumber: [true, Validators.required],
      AccountType: [null, Validators.required],
      StatusId: [1, Validators.required],
      ClientId: ['', Validators.required]
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
  createClientAccount(data){
console.log('New client: ',data);

  }
}
