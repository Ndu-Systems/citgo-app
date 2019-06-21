import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {
  addBeneficy(data: any):  Observable<any> {
    return this.http.post<any>(`${API_URL}/api/beneficiaries/add-beneficiary.php`, data);
  }


  constructor(private http: HttpClient) {}

  addBeneficiaries(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/beneficiaries/add-beneficiaries.php`, data);
  }
  updateBeneficiaries(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/beneficiaries/update-beneficiaries.php`, data);
  }
  geBeneficiaries(ClientId): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/beneficiaries/get-beneficiaries.php?ClientId=${ClientId}`);
  }
  geBeneficiaryById(BeneficiaryId): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/beneficiaries/get-beneficiary-by-id.php?BeneficiaryId=${BeneficiaryId}`);
  }



}
