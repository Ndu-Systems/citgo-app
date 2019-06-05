import { Injectable } from "@angular/core";
import { Investment, InvestmentDocument } from "src/app/models";

import { API_URL } from "src/app/shared/config";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InvestmentService {
  private clientsharesSubject=new BehaviorSubject<Investment[]>(null);
  public castClientshares= this.clientsharesSubject.asObservable();

  url = API_URL;
  constructor(private httpClient: HttpClient) {
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

  // update 
  updateInvestment(data:Investment): Observable<Investment> {
    return this.httpClient.post<any>(`${API_URL}/api/investments/update-investment.php`, data);
  }
  //get single investment by id
  getInvestmentsById(InvestmentId): Observable<Investment> {
    return this.httpClient.get<any>(
      `${this.url}/api/investments/get-investment-by-id.php?InvestmentId=${InvestmentId}`
    );
  }
  //get  investments by status
  getInvestmentsByStatus(StatusId): Observable<Investment[]> {
    return this.httpClient.get<any>(
      `${this.url}/api/investments/get-investment-by-status.php?StatusId=${StatusId}`
    );
  }
  //get single investment with docs by id
  getInvestmentsandDocumentsById(InvestmentId): Observable<InvestmentDocument> {
    return this.httpClient.get<any>(
      `${this.url}/api/investments/get-investment-and-documents-by-id.php?InvestmentId=${InvestmentId}`
    );
  }
}
