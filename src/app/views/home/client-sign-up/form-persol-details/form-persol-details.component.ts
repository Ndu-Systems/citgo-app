import { SignUpProcessService } from './../../../../services/app-state/sign-up-process.service';
import { User } from "src/app/models/user";
import { UserService } from "./../../services/user.service";
import { Component, OnInit} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  getCurrentUser,
  LAST_INSERT_ID,
  WEB_HOST,
  VERIFICATIONLINK,
  STATUS_USER_NEW
} from "src/app/shared/config";
import { AccountService } from "../../services/account.service";
import { EmailService } from "src/app/services/email.service";
import { SignUpProcess } from 'src/app/models/processes/signup.process.model';

@Component({
  selector: "app-form-persol-details",
  templateUrl: "./form-persol-details.component.html",
  styleUrls: ["./form-persol-details.component.scss"]
})
export class FormPersolDetailsComponent implements OnInit {
  rForm: FormGroup;
  message = "";
  UserId: string = getCurrentUser();
  showVerificationEmailSent: boolean;
  progress: string;
  allUsers: User[] = [];
  userExist: string = "";

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private emailService: EmailService,
    private userService: UserService,
    private signUpProcessService: SignUpProcessService
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
      StatusId: [STATUS_USER_NEW, Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
      this.userExist = "";
      let email = data.Email;
      let emails = this.allUsers.map(x => x.Email);
      if (emails.filter(x => x == email).length > 0) {
        //user with email exist
        this.userExist =
          "An account for the specified email address already exists. Try another email address.";
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
    this.signUpProcessService.closeAllSignUpForms()
  }
  createClientAccount(data) {
    console.log("New client: ", data);
    if (this.userExist != "") {
      alert("Email already exist");
      return false;
    }
    this.accountService.addClient(data).subscribe(response => {
      // to take
      if (response.ClientId) {
        console.log(response);

        let link = `${WEB_HOST}/#/${VERIFICATIONLINK}/${response.UserId}`;
        this.verifyAcc(data.FirstName, data.Email, link);
        console.log("response", response);

        localStorage.setItem(LAST_INSERT_ID, response.ClientId);
        //update precess state
        let state = this.signUpProcessService.getRegistraionProcess();
        state.user = response;
        this.signUpProcessService.updateRegistrationProcessState(state)
        //call next form
        this.signUpProcessService.showBankingInfoForm();
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
      this.showVerificationEmailSent = true;
      this.progress = `To ensure that your email account is valid, we have sent you an email to  ${email} to  verify your account,  please check your mailbox`;
    });
  }
}
