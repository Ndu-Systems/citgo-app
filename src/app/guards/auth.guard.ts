import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthenticateService } from "../services";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticateService,
    private routeTo: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {      
      if (route.data.roles) {
        if (route.data.roles.indexOf(Number(currentUser.Role)) != -1) {
          return true;
        }else {
          this.routeTo.navigate["/"];
          return false;
        }
      }
      return true;
    }
    this.routeTo.navigate(["session-expired"]);
    return false;
  }
}
