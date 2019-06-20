import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}

  addClient(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/clients/add-client.php`, data);
  }
  updateClient(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/clients/update-client.php`, data);
  }

}
