import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CloseModalEventEmmiter } from "src/app/models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser } from "src/app/shared/config";

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.rForm = this.fb.group({
      Name: [null, Validators.required],
      Surname: [null],
      IDNumber: [null, Validators.required],
      Relation: [null, Validators.required],
      StatusId: [1, Validators.required],
      ClientId: ["777", Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
    });
  }

  closeModal() {
    this.closeModalAction.emit({
      closeAll: true,
      openAddEmengencyContact: false,
      openAddMedicalAid: false,
      openAddPatient: false
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
    data.beneficiaries = this.beneficiaries;
  }
}
