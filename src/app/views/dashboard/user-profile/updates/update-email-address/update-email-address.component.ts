import { LoginProcessService } from './../../../../../services/app-state/login-process.service';
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService, EmailService } from "src/app/services";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-update-email-address",
  templateUrl: "./update-email-address.component.html",
  styleUrls: ["./update-email-address.component.scss"]
})
export class UpdateEmailAddressComponent implements OnInit {
  userId: string;
  user: User;
  isDone: boolean;
  email: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loginProcessService: LoginProcessService,
  ) {
    this.activatedRoute.params.subscribe(r => {
     let urlData:string = r["id"];
    this.userId = urlData.split("&&")[0];
    this.email = urlData.split("&&")[1];

      this.userService.getUserById(this.userId).subscribe(r => {
        if (r) {
          this.user = r;
          if(this.email && this.userId){
            this.user.Email = this.email;
            this.updateContactfo(this.user)
          }
        } 
      });
    });
  }

  ngOnInit() {
  
  }
  updateContactfo(data: User) {
 
    this.userService.updateUser(data).subscribe(r => {
      this.user = r;
      this.isDone = true;
      
    });
  }
 
  login() {
    this.loginProcessService.showLogin();
  }
}

