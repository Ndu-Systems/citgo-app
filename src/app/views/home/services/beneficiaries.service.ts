import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {


  constructor(private http: HttpClient) {}

  addBeneficiaries(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/beneficiaries/add-beneficiaries.php`, data);
  }

}
