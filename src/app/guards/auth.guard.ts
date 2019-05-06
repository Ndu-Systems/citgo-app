import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthenticateService } from "../services/user/authenticate.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticateService,
    private routeTo: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    debugger
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      if (
        route.data.roles &&
        route.data.roles.indexOf(currentUser.Role) === -1
      ) {
        // this.routeTo.navigate['access-denined'];
        return false;
      }
      return true;
    }
    //if !currentUser
    this.routeTo.navigate(["/"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
