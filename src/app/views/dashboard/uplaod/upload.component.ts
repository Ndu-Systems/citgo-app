import { SpinnerProcessService } from './../../../services/app-state/spinner-process.service';
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
import { UserNotification } from "src/app/models/processes/notification.process.model";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  file: File;
  message: string;
  success: string;
  clientId: any;
  InvestmentId: any;
  UserId: any;

  constructor(
    private documentsService: DocumentsService,
    private notificationProcessService: NotificationProcessService,
    private authenticateService: AuthenticateService,
    private investmentService: InvestmentService,
    private messageService: MessageService,
    private spinnerProcessService: SpinnerProcessService,

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
    
  }
  uplaodFile() {
    if (!this.file) {
      this.message = "Please select the files!";
      return false;
    }
    this.spinnerProcessService.showSpinner()
    this.documentsService.uploadFile(this.file).subscribe(response => {
      let url = `${API_URL}/api/upload/${response}`;
      this.spinnerProcessService.closeSpinner()
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
                 // update the investents state
                 this.investmentService
                 .getInvestmentsByClientId(this.clientId)
                 .subscribe(response => {
                   if (response.investments) {
                     this.investmentService.setInvestments(response.investments);
                   }

                   // update notifications
                   let nots:UserNotification[] =this.notificationProcessService.getNotificationProcess().notifications; 
                   nots = nots.filter(x=>x.id != this.InvestmentId);
                   this.notificationProcessService.updateNotificationProcessState(nots);
                   this.notificationProcessService.closeUplaod();
                   this.messageService.add({severity:'success', summary:'Great! ', detail:'File Uploaded successfully, We will be in touch soon'});

                 });
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
