import { AuthenticateService } from "./../../../services/home/user/authenticate.service";
import { WEB_HOST, API_URL, SHARE_PENDING_VERFICATION } from "src/app/shared/config";
import {
  NotificationProcessService,
  InvestmentService
} from "src/app/services";
import { DocumentsService } from "src/app/services";
import { Component, OnInit } from "@angular/core";
import { UserDoc } from "src/app/models/user.document.model";
import { Investment } from "src/app/models";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  file: File;
  message: string;
  clientId: any;
  InvestmentId: any;
  UserId: any;

  constructor(
    private documentsService: DocumentsService,
    private notificationProcessService: NotificationProcessService,
    private authenticateService: AuthenticateService,
    private investmentService: InvestmentService
  ) {}

  ngOnInit() {
    this.UserId = this.authenticateService.currentUserValue.UserId;
    this.clientId = this.authenticateService.currentUserValue.ClientId;
    this.notificationProcessService.castNotificationProcess.subscribe(
      process => {
        this.InvestmentId = process.InvestmentId;
      }
    );
  }
  filesChanged(files) {
    this.file = <File>files[0];
    console.log(this.file);
  }
  uplaodFile() {
    if (!this.file) {
      this.message = "Please select the files!";
      return false;
    }
    this.documentsService.uploadFile(this.file).subscribe(response => {
      let url = `${API_URL}/api/upload/${response}`;
      let doc: UserDoc = {
        ClientId: this.clientId,
        InvestmentId: this.InvestmentId,
        DocumentCode: "POP",
        DocumentName: "Proof of payment",
        DocumentUrl: url,
        CreateUserId: this.UserId,
        ModifyUserId: this.UserId,
        StatusId: 1
      };
      console.log(doc);
      this.documentsService.addDocumentDetails(doc).subscribe(r => {
        if (r) {
          this.investmentService
            .getInvestmentsById(this.InvestmentId)
            .subscribe(invest => {
              //create update
              let investement: Investment = invest;
              if (investement && investement.InvestmentId) {
                //update status to pening verification
                investement.StatusId = SHARE_PENDING_VERFICATION;
                this.investmentService.updateInvestment(investement).subscribe(res=>{
                  alert(JSON.stringify(res))
                })
              }
            });
        }
      });
    });
  }
  closeModal() {
    this.notificationProcessService.closeUplaod();
  }
}
