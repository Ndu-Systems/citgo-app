import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CloseModalEventEmmiter } from "src/app/models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser, LAST_INSERT_ID } from "src/app/shared/config";
import { BeneficiariesService } from "../../services/beneficiaries.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-form-beneficiaries",
  templateUrl: "./form-beneficiaries.component.html",
  styleUrls: ["./form-beneficiaries.component.scss"]
})
export class FormBeneficiariesComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
    CloseModalEventEmmiter
  > = new EventEmitter();

  /*
Form begin here
*/
  rForm: FormGroup;
  count: number = 1;
  beneficiaries: Array<any> = [];

  //validation
  message: string = "";

  /*
Form ends here
*/
  UserId: string = getCurrentUser();
  clientId: string;

  constructor(
    private fb: FormBuilder,
    private beneficiariesService: BeneficiariesService,
    private router:Router
  ) {}

  ngOnInit() {
    this.clientId = localStorage.getItem(LAST_INSERT_ID)
    this.rForm = this.fb.group({
      Name: [null, Validators.required],
      Surname: [null],
      IDNumber: [null, Validators.required],
      Relation: [null, Validators.required],
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

  addMore(data) {
    data.id = this.count;
    if (this.beneficiaries.filter(x => x.IDNumber === data.IDNumber).length > 0)
      return 0;

    this.beneficiaries.push(data);
    console.log("this.beneficiaries", this.beneficiaries);
  }
  onSubmit(data) {
    console.log(data);
    let formData = {beneficiaries:this.beneficiaries};
    this.beneficiariesService.addBeneficiaries(formData).subscribe(response => {
      if (response) {
        console.log("response", response);
        this.router.navigate(['dashboard'])
        this.closeModalAction.emit({
          closeAll: true,
          showBankingInfoForm: false,
          showBenefitariesForm: false,
          showPersonalInfoForm: false
        });
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
}
