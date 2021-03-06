import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankingInfoService {


  constructor(private http: HttpClient) {}

  addBankingInfo(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/banking-info/add-banking-info.php`, data);
  }
 
  updateBankingInfo(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/banking-info/update-banking-info.php`, data);
  }
 
  getBankingInfo(ClientId:string): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/banking-info/get-banking-info.php?ClientId=${ClientId}`);
  }
 

}
