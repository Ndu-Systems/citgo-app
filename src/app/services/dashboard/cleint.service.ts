import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CleintService {

  url = API_URL;
  clintIdSubject = new BehaviorSubject<string>('000');
  castClientId = this.clintIdSubject.asObservable();



  getSelectedClientId() {
    return this.clintIdSubject.value;
  }

  selectAnothereClientId(id: string) {
    this.clintIdSubject.next(id);
  }



  constructor(private httpClient: HttpClient) {
  }

  getClientById(ClientId) {
    return this.httpClient.get<any>(
      `${this.url}/api/clients/get-client-by-id.php?ClientId=${ClientId}`
    );
  }
  getClientShares() {
    return this.httpClient.get<any>(
      `${this.url}/api/clients/get-clients-and-shares.php`
    );
  }
  getClientReferrals(ClientId) {
    return this.httpClient.get<any>(
      `${this.url}/api/clients/get-client-refferals.php?ClientId=${ClientId}`
    );
  }
  getClientsByStatus(StatusId) {
    return this.httpClient.get<any>(
      `${this.url}/api/clients/get-clients-by-status-id.php?StatusId=${StatusId}`
    );
  }

  updateClient(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/api/clients/update-client.php`, data);
  }


}
