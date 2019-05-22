import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CloseModalEventEmmiter } from "src/app/models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  getCurrentUser,
  LAST_INSERT_ID,
  WEB_HOST,
  VERIFICATIONLINK
} from "src/app/shared/config";
import { BeneficiariesService } from "../../services/beneficiaries.service";
import { Router } from "@angular/router";
import { EmailService } from "src/app/services/email.service";

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
  showVerificationEmailSent: boolean;
  progress: string;

  constructor(
    private fb: FormBuilder,
    private beneficiariesService: BeneficiariesService,
    private router: Router,
    private emailService: EmailService
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

  closeModal() {}

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
        //close all
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
}
