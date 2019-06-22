import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { ActivatedRoute, Router } from "@angular/router";
import {
  UserService,
  EmailService
} from "src/app/services";
import { MessageService } from "primeng/api";
import {
  DEFAULT_PASSWORD,
  WEB_HOST,
  REQUEST_NEW_EMAIL_REQUEST
} from "src/app/shared/config";

@Component({
  selector: "app-update-contact-info",
  templateUrl: "./update-contact-info.component.html",
  styleUrls: ["./update-contact-info.component.scss"]
})
export class UpdateContactInfoComponent implements OnInit {
  userId: string;
  user: User;
  rForm: any;
  allUsers: any;
  isDone: boolean;
  userExist: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private emailService: EmailService
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r["id"];
      this.userService.getUserById(this.userId).subscribe(r => {
        if (r) {
          this.user = r;
          this.rForm = this.fb.group({
            Email: [this.user.Email, [Validators.required, Validators.email]],
            CellphoneNumber: [
              this.user.CellphoneNumber,
              [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(15)
              ]
            ],

            CreateUserId: [this.user.CreateUserId, Validators.required],
            StatusId: [this.user.StatusId, Validators.required],
            Password: [
              this.user.Password || DEFAULT_PASSWORD,
              Validators.required
            ],
            UserId: [this.user.UserId, Validators.required]
          });

          this.rForm.valueChanges.subscribe(data => {
            this.userExist = "";
            let email = data.Email;
            let cellPhone = data.CellphoneNumber;
            let checkMails = this.allUsers.filter(x => x.Email == email);
            let checkCells = this.allUsers.filter(
              x => x.CellphoneNumber == cellPhone
            );
            if (
              checkMails.length > 0 &&
              checkMails[0].Email != this.user.Email
            ) {
              //user with email exist
              this.userExist =
                "An account for the specified email address already exists. Try another email address.";
            } else if (
              checkCells.length > 0 &&
              checkCells[0].CellphoneNumber != this.user.CellphoneNumber
            ) {
              this.userExist =
                "An account with the specified cellphone number  already exists. Try another cellphone number.";
            } else {
              this.userExist = "";
            }
          });
        } else {
        }
      });
    });
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(r => {
      this.allUsers = r;
    });
  }
  updateContactfo(data: User) {
    if (this.userExist != "") {
      this.messageService.add({
        life: 7000,
        severity: "warn",
        summary: "Sorry!",
        detail: this.userExist
      });
      return false;
    }
    if (
      data.Email == this.user.Email &&
      data.CellphoneNumber == this.user.CellphoneNumber
    ) {
      this.messageService.add({
        life: 7000,
        severity: "info",
        summary: "No changes",
        detail: "nothing changed"
      });
    } else {
      if (data.CellphoneNumber != this.user.CellphoneNumber) {
        // cell only changeded
        let datatosend = data;
        datatosend.Email = this.user.Email; // we not updating the email yet
        this.userService.updateUser(datatosend).subscribe(r => {
          this.user = r;
          this.messageService.add({
            life: 7000,
            severity: "success",
            summary: "Nice!",
            detail: "Cellphone number updated!"
          });
        });
      }
      if (data.Email != this.user.Email) {
        this.sendChangeEmailConfirmation(data.Email);
      }
    }
  }
  sendChangeEmailConfirmation(email) {
    let link = `${WEB_HOST}/#/${REQUEST_NEW_EMAIL_REQUEST}/${this.user.UserId}&&${email}`;

    let data = {
      name: email,
      email: email,
      link: link
    };
    this.emailService.sendNewEmailRequest(data).subscribe(r => {
      this.isDone = true;
      alert(JSON.stringify(r));
    });
  }
  back(){
this.router.navigate(["/"])
  }
}
