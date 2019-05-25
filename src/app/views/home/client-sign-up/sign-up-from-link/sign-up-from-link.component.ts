import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";
import { CleintService } from "./../../../../services/dashboard/cleint.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sign-up-from-link",
  templateUrl: "./sign-up-from-link.component.html",
  styleUrls: ["./sign-up-from-link.component.scss"]
})
export class SignUpFromLinkComponent implements OnInit {
  clientId: string;
  currentUser: User;
  progress: string = "Verifying your account....";
  Error: string;
  ParentLink: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cleintService: CleintService,
    private signUpProcess: SignUpProcessService
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.clientId = r["id"];
    });
  }

  ngOnInit() {
    // check if the client exists
    this.cleintService.getClientById(this.clientId).subscribe(r => {
      if (r.ClientId) {
        this.ParentLink = this.clientId;
      } else {
        this.ParentLink = null;
      }
      this.signUpProcess.setParentId(this.ParentLink);
      this.signUpProcess.showPersonalInfoForm();
    });
  }
}
