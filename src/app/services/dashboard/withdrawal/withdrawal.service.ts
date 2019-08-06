import { Withdrawal } from './../../../models/withdrawal.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Investment, InvestmentDocument } from 'src/app/models';
import { API_URL } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {
  gettWithdrawalByStatus(status: any): Observable<any[]> {
    return this.httpClient.get<any>(
      `${this.url}/api/withdrawal/get-withdrawal-by-status.php?StatusId=${status}`
    );
  }
  update(data: Investment) {
    return this.httpClient.post<any>(
      `${API_URL}/api/withdrawal/add-withdrawal.php`,
      data
    );
  }


  url = API_URL;
  constructor(private httpClient: HttpClient) {
  }

  
  addWithdrawal(data:Withdrawal): Observable<any> {
    return this.httpClient.post<any>(
      `${API_URL}/api/withdrawal/add-withdrawal.php`,
      data
    );
  }
  addClientwithdrawalsRange(data): Observable<any> {
    return this.httpClient.post<any>(
      `${API_URL}/api/clientwithdrawals/add-clientwithdrawals-range.php`,
      data
    );
  }

  getClientWithdrawal(ClientId): Observable<any> {
    return this.httpClient.get<any>(
      `${this.url}/api/withdrawal/get-withdrawal-by-client-id.php?ClientId=${ClientId}`
    );
  }
}
