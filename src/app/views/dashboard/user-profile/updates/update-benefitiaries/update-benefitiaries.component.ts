import { Beneficiary } from 'src/app/models/beneficiaty.model';
import { AuthenticateService } from 'src/app/services/home/user/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BeneficiariesService } from 'src/app/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-benefitiaries',
  templateUrl: './update-benefitiaries.component.html',
  styleUrls: ['./update-benefitiaries.component.scss']
})
export class UpdateBenefitiariesComponent implements OnInit {
  rForm: FormGroup;
  count: number = 1;
  beneficiaries: Array<any> = [];
  message: string = "";
  clientId: string;
  showVerificationEmailSent: boolean;
  progress: string;
  beneficiarId: any;
  beneficiary: Beneficiary;
  isAdd: boolean;

  constructor(
    private fb: FormBuilder,
    private beneficiariesService: BeneficiariesService,
    private router: Router,
    private authenticateService: AuthenticateService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(r => {
      this.beneficiarId = r["id"];
      if(this.beneficiarId == 'please-add-new'){
       // add new 
       this.isAdd = true;
       let userId = this.authenticateService.currentUserValue.UserId;
       let cleintId = this.authenticateService.currentUserValue.ClientId;
       this.rForm = this.fb.group({
        Name: ["", Validators.required],
        Surname: ["",Validators.required],
        IDNumber: ["", [Validators.required, Validators.minLength(8),Validators.maxLength(16)]],
        Relation: ["", Validators.required],
        CreateUserId: [userId, Validators.required],
        StatusId: [1, Validators.required],
        ClientId: [cleintId, Validators.required],
        BeneficiaryId: ["0000", Validators.required],
        ModifyUserId : [userId , Validators.required]

      });
      }else{
        this.beneficiariesService.geBeneficiaryById(this.beneficiarId).subscribe(r=>{
          this.beneficiary =r;
          this.rForm = this.fb.group({
            Name: [this.beneficiary.Name, Validators.required],
            Surname: [this.beneficiary.Surname,Validators.required],
            IDNumber: [this.beneficiary.IDNumber, Validators.required],
            Relation: [this.beneficiary.Relation, Validators.required],
            CreateUserId: [this.beneficiary.CreateUserId, Validators.required],
            StatusId: [this.beneficiary.StatusId, Validators.required],
            ClientId: [this.beneficiary.ClientId, Validators.required],
            BeneficiaryId: [this.beneficiary.BeneficiaryId, Validators.required],
            ModifyUserId : [this.beneficiary.ModifyUserId , Validators.required]

          });
        })
      }
    
    });

  }


  onSubmit(data) {

    if(this.isAdd){
      this.Add(data);
      return "add";
    }
 
    this.beneficiariesService.updateBeneficiaries(data).subscribe(response => {
      if (response) {
        this.messageService.add({
          life: 4000,
          severity: "success",
          summary: "You are up to date!",
          detail: "Your details are updated successfully!"
        });
        this.back();
      } else {
        // alert(`Error: ${response}`);
      }
    });
  }
  Add(data: any): any {
    this.beneficiariesService.addBeneficy(data).subscribe(response => {
      if (response) {
        this.messageService.add({
          life: 4000,
          severity: "success",
          summary: "You are up to date!",
          detail: "Your details are updated successfully!"
        });
        this.back();
      } else {
        // alert(`Error: ${response}`);
      }
    });
  }
  back() {
    this.router.navigate(["/dashboard/my-profile"]);
  }

}
