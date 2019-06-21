import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SEND_ACC_VERIFICATION_EMAIL, SEND_FORGOT_PASSWORD_EMAIL, SEND_UPDATE_CONTACT_DETAILS_EMAIL, SEND_NEW_EMAIL_REQUEST_EMAIL } from '../../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }
  sendVerifyAcc(data): Observable<any> {
    return this.http.post<any>(
      SEND_ACC_VERIFICATION_EMAIL,
      data
    );
  }
  sendForgotPasswordEmail(data): Observable<any> {
    return this.http.post<any>(
      SEND_FORGOT_PASSWORD_EMAIL,
      data
    );
  }
  sendChangePass(data): Observable<any> {
    return this.http.post<any>(
      SEND_UPDATE_CONTACT_DETAILS_EMAIL,
      data
    );
  }
  sendNewEmailRequest(data): Observable<any> {
    return this.http.post<any>(
      SEND_NEW_EMAIL_REQUEST_EMAIL,
      data
    );
  }
}
