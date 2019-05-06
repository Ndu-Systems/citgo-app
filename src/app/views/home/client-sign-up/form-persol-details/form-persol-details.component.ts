import { CloseModalEventEmmiter } from './../../../../models/modal.eventemitter.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getCurrentUser, LAST_INSERT_ID } from 'src/app/shared/config';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-form-persol-details',
  templateUrl: './form-persol-details.component.html',
  styleUrls: ['./form-persol-details.component.scss']
})
export class FormPersolDetailsComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<CloseModalEventEmmiter> = new EventEmitter();

  /*
Form begin here
*/
  rForm: FormGroup;

  // validation
  message = '';

  /*
Form ends here
*/
  UserId: string = getCurrentUser();

  constructor(
    private fb: FormBuilder, private accountService: AccountService
  ) {


  }

  ngOnInit() {
    this.rForm = this.fb.group({
      FirstName: [null, Validators.required],
      MiddleName: [null],
      Surname: ['', Validators.required],
      IDNumber: [null, Validators.required],
      Email: [null, Validators.required],
      CellphoneNumber: [null, Validators.required],
      Gender: [null, Validators.required],
      Province: ['', Validators.required],
      City: ['', Validators.required],
      PostCode: ['', Validators.required],
      Address: ['', Validators.required],
      CreateUserId: ['SYSTEM_WEB', Validators.required],
      StatusId: [1, Validators.required]
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
  createClientAccount(data) {
console.log('New client: ', data);
this.accountService.addClient(data).subscribe(response => {
  if (response) {
    debugger;
    console.log('response', response);

    localStorage.setItem(LAST_INSERT_ID, response);
    this.closeModalAction.emit({
      closeAll: false,
      showBankingInfoForm: true,
      showBenefitariesForm: false,
      showPersonalInfoForm: false
    });
  } else {
    alert(`Error: ${response}`);
  }
});

  }
}
