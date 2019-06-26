import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getCurrentUser, LAST_INSERT_ID } from 'src/app/shared/config';
import { BeneficiariesService, SignUpProcessService } from 'src/app/services';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-client-beneficiaries',
  templateUrl: './client-beneficiaries.component.html',
  styleUrls: ['./client-beneficiaries.component.scss']
})
export class ClientBeneficiariesComponent implements OnInit {

  rForm: FormGroup;
  count: number = 1;
  beneficiaries: Array<any> = [];
  message: string = "";
  UserId: string = getCurrentUser();
  clientId: string;
  showVerificationEmailSent: boolean;
  progress: string;

  constructor(
    private fb: FormBuilder,
    private beneficiariesService: BeneficiariesService,
    private router: Router,
    private signUpProcessService: SignUpProcessService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.clientId = localStorage.getItem(LAST_INSERT_ID);
    this.rForm = this.fb.group({
      Name: [null, Validators.required],
      Surname: [null,Validators.required],
      IDNumber: [null, Validators.required],
      Relation: [null, Validators.required],
      CreateUserId: [this.clientId, Validators.required],
      StatusId: [1, Validators.required],
      ClientId: [this.clientId, Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
       
    });
  }

  closeModal() {
    this.confirmationService.confirm({
      message: "Are you sure you want to exit without saving?",
      accept: () => {
        this.signUpProcessService.closeAllSignUpForms();
        this.signUpProcessService.showVerificationMailSent();
      }
    });
  }

  addMore(data) {
    data.id = this.count;
    if (this.beneficiaries.filter(x => x.IDNumber === data.IDNumber).length > 0)
      return 0;

    this.beneficiaries.push(data);

    //clear form
    
    this.rForm = this.fb.group({
      Name: [null, Validators.required],
      Surname: [null, Validators.required],
      IDNumber: [null, [Validators.required, Validators.minLength(8),Validators.maxLength(16)]],
      Relation: [null, Validators.required],
      CreateUserId: [this.clientId, Validators.required],
      StatusId: [1, Validators.required],
      ClientId: [this.clientId, Validators.required]
    });
  
  }
  onSubmit(data) {
   
    this.addMore(data);

    if (!data) {
      
      return false;
    }
    let formData = { beneficiaries: this.beneficiaries };
    this.beneficiariesService.addBeneficiaries(formData).subscribe(response => {
      if (response) {
    
        this.signUpProcessService.showVerificationMailSent();
      } else {
        // alert(`Error: ${response}`);
      }
    });
  }
}
