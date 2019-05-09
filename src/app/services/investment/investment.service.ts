import { Injectable } from '@angular/core';
import { Investment } from 'src/app/models';

import { API_URL } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  url = API_URL;
  constructor(private httpClient: HttpClient) { }

  getAllInvestements()  {
    return this.httpClient.get<any>(
      `${this.url}/api/investments/get.php`
    );
  }

  getInvestmentsByClientId(ClientId): Observable<any> {
    return this.httpClient.get<any>(
      `${this.url}/api/investments/get-by-clientid.php?ClientId=${ClientId}`
    );
  }

  buyShares(data): Observable<any> {
    return this.httpClient.post<any>(`${API_URL}/api/investments/buy-shares.php`, data);
  }
}


