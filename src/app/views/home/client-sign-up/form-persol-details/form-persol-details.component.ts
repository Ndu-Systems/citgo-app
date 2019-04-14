import { CloseModalEventEmmiter } from './../../../../models/modal.eventemitter.model';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser } from "src/app/shared/config";

@Component({
  selector: "app-form-persol-details",
  templateUrl: "./form-persol-details.component.html",
  styleUrls: ["./form-persol-details.component.scss"]
})
export class FormPersolDetailsComponent implements OnInit {
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

  PatientId: string;
  MedicalaidName: string;
  MedicalaidType: string;
  MemberShipNumber: string;
  PrimaryMember: string;
  PrimaryMemberId: string;
  CreateUserId: string;
  StatusId: number;
  constructor(
    private fb: FormBuilder,
  ) {


  }

  ngOnInit() {

    this.rForm = this.fb.group({
      PatientId: [1, Validators.required],
      HasMedicalAid: [true, Validators.required],
      MedicalaidName: [null, Validators.required],
      MedicalaidType: [null, Validators.required],
      MemberShipNumber: [null, Validators.required],
      PrimaryMember: [null, Validators.required],
      PrimaryMemberId: [null, Validators.required],
      CreateUserId: [this.UserId, Validators.required],
      StatusId: [1, Validators.required]
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

}
