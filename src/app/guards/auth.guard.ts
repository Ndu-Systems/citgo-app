import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthenticateService } from "../services/user/authenticate.service";
import { ADMIN_USER_ROLE } from "../shared/config";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticateService,
    private routeTo: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    debugger;
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      
      if (route.data.roles) {
        if (route.data.roles.indexOf(Number(currentUser.Role)) != -1) {
          return true;
        } else if (Number(currentUser.Role) === ADMIN_USER_ROLE) {
          this.routeTo.navigate["admin-dashboard"];
          return false;
        } else {
          this.routeTo.navigate["/"];
          return false;
        }
      }
      return true;
    }
    this.routeTo.navigate(["/"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
