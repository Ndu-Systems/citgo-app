import { Component, OnInit} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  getCurrentUser,
  LAST_INSERT_ID
} from "src/app/shared/config";
import { BeneficiariesService } from "../../services/beneficiaries.service";
import { Router } from "@angular/router";
import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";

@Component({
  selector: "app-form-beneficiaries",
  templateUrl: "./form-beneficiaries.component.html",
  styleUrls: ["./form-beneficiaries.component.scss"]
})
export class FormBeneficiariesComponent implements OnInit {

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
    private signUpProcessService: SignUpProcessService

  ) {}

  ngOnInit() {
    this.clientId = localStorage.getItem(LAST_INSERT_ID);
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

  closeModal() {this.signUpProcessService.closeAllSignUpForms()}

  addMore(data) {
    data.id = this.count;
    if (this.beneficiaries.filter(x => x.IDNumber === data.IDNumber).length > 0)
      return 0;

    this.beneficiaries.push(data);
    console.log("this.beneficiaries", this.beneficiaries);
  }
  onSubmit(data) {
    console.log(data);
    this.addMore(data);

    if (!data) {
      alert("no data");
      return false;
    }
    let formData = { beneficiaries: this.beneficiaries };
    this.beneficiariesService.addBeneficiaries(formData).subscribe(response => {
      if (response) {
        console.log("response", response);
        this.router.navigate(["dashboard"]);
        this.signUpProcessService.closeAllSignUpForms();
         this.signUpProcessService.showVerificationMailSent()
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
}
