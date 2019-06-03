import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BonusService {


  constructor(private http: HttpClient) {}

  getClientBonuses(ClientId): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/bonus/get-client-bonuses.php?ClientId=${ClientId}`);
  }


addBonus(data){
  return this.http.post<any>(`${API_URL}/api/bonus/add-bonus.php`,data);
}
updateBonus(data){
  return this.http.post<any>(`${API_URL}/api/bonus/update-bonus.php`,data);
}


}
