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

  constructor(
    private fb: FormBuilder,
  ) {


  }

  ngOnInit() {

    this.rForm = this.fb.group({
      FirstName: [null, Validators.required],
      MiddleName: [null],
      Surname: [true, Validators.required],
      IDNumber: [null, Validators.required],
      Email: [null, Validators.required],
      CellphoneNumber: [null, Validators.required],
      Gender: [null, Validators.required],
      Province: ['', Validators.required],
      City: ['', Validators.required],
      PostCode: ['', Validators.required],
      Address: ['', Validators.required],
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
  createClientAccount(data){
console.log('New client: ',data);

  }
}
