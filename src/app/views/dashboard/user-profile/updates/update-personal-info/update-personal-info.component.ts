import { MessageService } from 'primeng/api';
import { Client } from 'src/app/models';
import { CleintService } from "src/app/services";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import {
  AccountService,
  SignUpProcessService,
} from "src/app/services";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-update-personal-info",
  templateUrl: "./update-personal-info.component.html",
  styleUrls: ["./update-personal-info.component.scss"]
})
export class UpdatePersonalInfoComponent implements OnInit {
  
  cleintId: any;
  rForm: FormGroup;
  cleint: Client;

  constructor(
    private accountService: AccountService,
    private signUpProcessService: SignUpProcessService,
    private activatedRoute: ActivatedRoute,
    private cleintService: CleintService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.cleintId = r["id"];
      this.cleintService.getClientById(this.cleintId).subscribe(r => {
        this.cleint= r;

        //form
        this.rForm = new FormGroup({
          FirstName: new FormControl(this.cleint.FirstName, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30)
          ]),
          MiddleName: new FormControl(null),
          Surname: new FormControl(this.cleint.Surname, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30)
          ]),
          IDNumber: new FormControl(this.cleint.IDNumber, [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16)
          ]),
          Gender: new FormControl(this.cleint.Gender, Validators.required),
          Province: new FormControl(this.cleint.Province, Validators.required),
          City: new FormControl(this.cleint.City, Validators.required),
          Country: new FormControl(this.cleint.Country, Validators.required),
          PostCode: new FormControl(this.cleint.PostCode, Validators.required),
          Address: new FormControl(this.cleint.Address, Validators.required),
          CreateUserId: new FormControl(this.cleint.CreateUserId, Validators.required),
          StatusId: new FormControl(this.cleint.StatusId, Validators.required),
          ClientId: new FormControl(this.cleint.ClientId, Validators.required),
          UserId : new FormControl(this.cleint.UserId , Validators.required),
          ParentId: new FormControl(this.cleint.ParentId)
        });

        this.rForm.valueChanges.subscribe(data => {
          console.log(data);
        });

      });
    });
  }

  ngOnInit() {
  }

  updateClient(data) {
    this.accountService.updateClient(data).subscribe(response => {
      // to take
      if (response.ClientId) {
        this.messageService.add({
          life: 4000,
          severity: "success",
          summary: "You are up to date!",
          detail: "Your details are updated successfully!"
        });
        this.back()
      } else {
        alert("opps")
      }
    });
  }
  back() {
    this.router.navigate(["/dashboard/my-profile"]);
  }
}
