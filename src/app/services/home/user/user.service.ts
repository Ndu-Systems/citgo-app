import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "src/app/shared/config";
import { UserRole } from "src/app/models/userole.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
 
  constructor(private http: HttpClient) {}

  getUserById(UserId): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/user/get-user-by-id.php?UserId=${UserId}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/user/get-user-emails.php`);
  }

  verifyUser(user): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/user/verify-user.php`, user);
  }
  updateUser(user): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/user/update-user.php`, user);
  }
  addUserRole(data:UserRole): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/useroles/add-user-role.php`, data);
  }
}
