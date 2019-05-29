import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  constructor(private http: HttpClient) {}

  getAdminStat(): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/stat/get-admin-stat.php`);
  }






}
