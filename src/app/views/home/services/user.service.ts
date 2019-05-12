import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "src/app/shared/config";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/user/get-user-emails.php`);
  }

  updateUser(user): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/user/verify-user.php`, user);
  }
}
