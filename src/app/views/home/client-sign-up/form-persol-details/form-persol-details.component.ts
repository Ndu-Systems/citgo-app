import { SignUpProcessService } from './../../../../services/app-state/sign-up-process.service';
import { User } from "src/app/models/user";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  getCurrentUser,
  LAST_INSERT_ID,
  WEB_HOST,
  VERIFICATIONLINK,
  STATUS_USER_NEW
} from "src/app/shared/config";
import { EmailService } from "src/app/services/shared-services/email/email.service";
import { ConfirmationService } from 'primeng/api';
import { AccountService, UserService, LoginProcessService } from 'src/app/services';

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
  ParentId: string = "";

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private emailService: EmailService,
    private userService: UserService,
    private signUpProcessService: SignUpProcessService,
    private loginProcess: LoginProcessService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.signUpProcessService.castUserRegistrationProcess.subscribe(r => {
      this.ParentId = r.parentId;
    })
    this.rForm = this.fb.group({
      FirstName: [null, Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(30)])],
      MiddleName: [null],
      Surname: ["", Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(30)])],
      IDNumber: [null, Validators.compose([Validators.required, Validators.minLength(7),Validators.maxLength(20)])],
      Email: [null, Validators.required],
      CellphoneNumber: [null, Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(15)])],
      Gender: [null, Validators.required],
      Province: ["", Validators.required],
      City: ["", Validators.required],
      Country: ["", Validators.required],
      PostCode: ["0000", Validators.required],
      Address: ["Not needed", Validators.required],
      CreateUserId: ["SYSTEM_WEB", Validators.required],
      StatusId: [STATUS_USER_NEW, Validators.required],
      ParentId: [this.ParentId]
    });

    this.rForm.valueChanges.subscribe(data => {

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
    this.confirmationService.confirm({
      message: 'Are you sure you want to exit without saving?',
      accept: () => {
        this.signUpProcessService.closeAllSignUpForms();
      }
    });
  }
  createClientAccount(data) {

    if (this.userExist != "") {
      alert("Email already exist");
      return false;
    }
    this.accountService.addClient(data).subscribe(response => {
      // to take
      if (response.ClientId) {

        let link = `${WEB_HOST}/#/${VERIFICATIONLINK}/${response.UserId}`;
        this.verifyAcc(data.FirstName, data.Email, link);
       

        localStorage.setItem(LAST_INSERT_ID, response.ClientId);
        //update precess state
        let state = this.signUpProcessService.getRegistraionProcess();
        state.user = response;
        this.signUpProcessService.updateRegistrationProcessState(state)
        //call next form
        this.signUpProcessService.showBankingInfoForm();
      } else {
        if (response == "0") {
          // alert(`Error:Email address alread used`);

          return false
        }
        // alert(`Error: ${response}`);
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

  openSignIn(){
    this.signUpProcessService.closeAllSignUpForms();
    this.loginProcess.showLogin();
  }
}
