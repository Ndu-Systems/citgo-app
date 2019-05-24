import { Injectable } from "@angular/core";
import { Investment } from "src/app/models";

import { API_URL } from "src/app/shared/config";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InvestmentService {
  private clientsharesSubject: BehaviorSubject<Investment[]>;
  public clientshares: Observable<Investment[]>;

  url = API_URL;
  constructor(private httpClient: HttpClient) {
    this.clientsharesSubject = new BehaviorSubject<Investment[]>(null);
    this.clientshares = this.clientsharesSubject.asObservable();
  }

  getAllInvestements() {
    return this.httpClient.get<any>(`${this.url}/api/investments/get.php`);
  }
  setInvestments(val) {
    this.clientsharesSubject.next(val);
  }
  getInvestmentsByClientId(ClientId): Observable<any> {
    return this.httpClient.get<any>(
      `${this.url}/api/investments/get-by-clientid.php?ClientId=${ClientId}`
    );
  }

  buyShares(data): Observable<any> {
    return this.httpClient.post<any>(
      `${API_URL}/api/investments/buy-shares.php`,
      data
    );
  }
}
