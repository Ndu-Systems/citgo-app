import { User } from "src/app/models/user";
import { UserService } from "./../../services/user.service";
import { CloseModalEventEmmiter } from "./../../../../models/modal.eventemitter.model";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  getCurrentUser,
  LAST_INSERT_ID,
  WEB_HOST,
  VERIFICATIONLINK
} from "src/app/shared/config";
import { AccountService } from "../../services/account.service";
import { EmailService } from "src/app/services/email.service";

@Component({
  selector: "app-form-persol-details",
  templateUrl: "./form-persol-details.component.html",
  styleUrls: ["./form-persol-details.component.scss"]
})
export class FormPersolDetailsComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
    CloseModalEventEmmiter
  > = new EventEmitter();

  /*
Form begin here
*/
  rForm: FormGroup;

  // validation
  message = "";

  /*
Form ends here
*/
  UserId: string = getCurrentUser();
  showVerificationEmailSent: boolean;
  progress: string;
  allUsers: User[] = [];
  userExist: string = "";

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private emailService: EmailService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.rForm = this.fb.group({
      FirstName: [null, Validators.required],
      MiddleName: [null],
      Surname: ["", Validators.required],
      IDNumber: [null, Validators.required],
      Email: [null, Validators.required],
      CellphoneNumber: [null, Validators.required],
      Gender: [null, Validators.required],
      Province: ["", Validators.required],
      City: ["", Validators.required],
      Country: ["", Validators.required],
      PostCode: ["0000", Validators.required],
      Address: ["Not needed", Validators.required],
      CreateUserId: ["SYSTEM_WEB", Validators.required],
      StatusId: [1, Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
      debugger;
      this.userExist = "";
      let email = data.Email;
      let emails = this.allUsers.map(x => x.Email);
      if (emails.filter(x => x == email).length > 0) {
        //user with email exist
        this.userExist = "An account for the specified email address already exists. Try another email address.";
      } else {
        this.userExist = "";
      }
    });
    //get all emails
    this.userService.getAllUsers().subscribe(r => {
      this.allUsers = r;
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
    console.log("New client: ", data);
    if (this.userExist != "") {
      alert("Email already exist");
      return false;
    }
    this.accountService.addClient(data).subscribe(response => {
      // to take
      if (response) {
        let link = `${WEB_HOST}/#/${VERIFICATIONLINK}/${response}`;
        this.verifyAcc(data.FirstName, data.Email, link);
        console.log("response", response);

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
  verifyAcc(name, email, link) {
    let data = {
      name: name,
      email: email,
      link: link
    };
    this.emailService.sendVerifyAcc(data).subscribe(r => {
      // alert(JSON.stringify(r))
      this.showVerificationEmailSent = true;
      this.progress = `To ensure that your email account is valid, we have sent you an email to  ${email} to  verify your account,  please check your mailbox`;
    });
  }
}
