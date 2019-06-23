import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { API_URL, CURRENT_USER } from "src/app/shared/config";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: "root"
})
export class AuthenticateService {
  url = API_URL;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  checkInterval: any;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(CURRENT_USER))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.checkInterval = setInterval(() => {
      if (this.currentUserSubject.value) {
        this.getUserByEmailObj(
          this.currentUserSubject.value.Email,
          this.currentUserSubject.value.UserId
        ).subscribe(r => {
          if (!r) {
            this.logout();
            this.router.navigate(["session-expired"]);
          }
        });
      }
    }, 10000);
  }

  public loginUser(Email: string, Password: string): Observable<any> {
    const data = {
      email: Email,
      password: Password
    };

    const reqheaders = new HttpHeaders({ "Content-Type": "application/json" });

    return this.httpClient
      .post<any>(this.url + "/api/login/login-user.php", JSON.stringify(data), {
        headers: reqheaders
      })
      .pipe(
        catchError(this.handleError),
        map(user => {
          if (user && user.Role) {
            localStorage.setItem(CURRENT_USER, JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    localStorage.removeItem(CURRENT_USER);
    this.currentUserSubject.next(null);
  }
  public get getUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER));
  }
  setUser(val) {
    this.currentUserSubject.next(val);
  }

  getFullClientDetails(UserId) {
    return this.httpClient.get<any>(
      `${this.url}/api/user/get-user-by-id.php?UserId=${UserId}`
    );
  }

  getUserByEmail(email: string) {
    return this.httpClient.get<any>(
      `${this.url}/api/user/get-user-by-email.php?Email=${email}`
    );
  }
  getUserByEmailObj(email: string, UserId) {
    return this.httpClient.get<any>(
      `${
        this.url
      }/api/user/get-user-by-emai-and-userid.php?Email=${email}&UserId=${UserId}`
    );
  }
  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log("cleint side: ", errorResponse.error);
    } else {
      console.log("server side: ", errorResponse.error);
    }
    return throwError(
      "No connection, check your network and try again"
    );
  }
}
