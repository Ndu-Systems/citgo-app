import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "src/app/shared/config";
import { Observable } from "rxjs";
import { Profit } from "src/app/models/profit.model";

@Injectable({
  providedIn: "root"
})
export class InvestmentProfitService {
  url = API_URL;
  constructor(private httpClient: HttpClient) {}

  getProfits(clientId): Observable<Profit[]> {
    return this.httpClient.get<any>(
      `${this.url}/api/profit/get-client-proft.php?clentId=${clientId}`
    );
  }
}
