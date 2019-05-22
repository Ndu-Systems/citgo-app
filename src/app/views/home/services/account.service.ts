import { SignUpProcess, newProcess } from '../../../models/signup.process.model';
import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { API_URL } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  
  userRegistrationProcessActive = new BehaviorSubject<SignUpProcess>(newProcess);
  castUserRegistrationProcess = this.userRegistrationProcessActive.asObservable();

  finishRegistrationProcess() {
    this.userRegistrationProcessActive.next(newProcess);
  }

 getRegistraionProcess(){
    return this.userRegistrationProcessActive.value;
  }
  constructor(private http: HttpClient) {}

  addClient(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/clients/add-client.php`, data);
  }

}
