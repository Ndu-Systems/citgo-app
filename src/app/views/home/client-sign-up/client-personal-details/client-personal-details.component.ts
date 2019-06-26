import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { getCurrentUser, STATUS_USER_NEW, WEB_HOST, VERIFICATIONLINK, LAST_INSERT_ID, LAST_INSERT_EMAIL } from 'src/app/shared/config';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService, EmailService, UserService, SignUpProcessService, LoginProcessService } from 'src/app/services';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-client-personal-details',
  templateUrl: './client-personal-details.component.html',
  styleUrls: ['./client-personal-details.component.scss']
})
export class ClientPersonalDetailsComponent implements OnInit {
 // rForm: FormGroup;
 message = "";
 UserId: string = getCurrentUser();
 showVerificationEmailSent: boolean;
 progress: string;
 allUsers: User[] = [];
 userExist: string = "";
 ParentId: string = "";
 rForm: FormGroup;
  emailUsed: string;
  cellUsed: string;



 constructor(
   private fb: FormBuilder,
   private accountService: AccountService,
   private emailService: EmailService,
   private userService: UserService,
   private signUpProcessService: SignUpProcessService,
   private loginProcess: LoginProcessService,
   private confirmationService: ConfirmationService,
   private router:Router,
   private messageService:MessageService,
 ) { }

 ngOnInit() {
   this.signUpProcessService.castUserRegistrationProcess.subscribe(r => {
     this.ParentId = r.parentId;
   })

     //form
 this.rForm = new FormGroup({
   FirstName:  new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
   MiddleName:  new FormControl(null),
   Surname:   new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
   IDNumber: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(16)]),
   Email:new FormControl(null, [Validators.required, Validators.email]),
   CellphoneNumber:new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(15)]),
   Gender:new FormControl(null, Validators.required),
   Province: new FormControl(null, Validators.required),
   City: new FormControl(null, Validators.required),
   Country:new FormControl(null, Validators.required),
   PostCode: new FormControl("0000", Validators.required),
   Address:new FormControl("N/A", Validators.required),
   CreateUserId:new FormControl("SYSTEM_WEB", Validators.required),
   StatusId: new FormControl(STATUS_USER_NEW, Validators.required), 
   ParentId: new FormControl(this.ParentId)
 });


   this.rForm.valueChanges.subscribe(data => {

     this.cellUsed = "";
     this.emailUsed = "";
     let email = data.Email;
     let cellPhone = data.CellphoneNumber;
     if (this.allUsers.filter(x => x.Email == email).length > 0) {
       //user with email exist
       this.emailUsed =
         "An account for the specified email address already exists. Try another email address.";
     } 
     if(this.allUsers.filter(x => x.CellphoneNumber == cellPhone).length > 0){
       this.cellUsed =
       "An account with the specified cellphone number  already exists. Try another cellphone number.";
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
     alert("Email/Cellphone already exist");
     return false;
   }
   this.accountService.addClient(data).subscribe(response => {
     // to take
     if (response.ClientId) {
       let link = `${WEB_HOST}/#/${VERIFICATIONLINK}/${response.UserId}`;
       this.verifyAcc(data.FirstName, data.Email, link);
       localStorage.setItem(LAST_INSERT_ID, response.ClientId);
       let user:User = response;
       localStorage.setItem(LAST_INSERT_EMAIL, user.Email)
       // #todo  - update state
       this.messageService.add({
        life: 7000,
        severity: "success",
        summary: "Welcome to Citgo famaily!",
        detail: "A warm welcome to you to join us!"
      });
       this.router.navigate(["/client-banking-details", user.ClientId]);
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
