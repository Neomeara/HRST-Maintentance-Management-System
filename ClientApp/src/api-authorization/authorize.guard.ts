import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeService } from './authorize.service';
import { tap } from 'rxjs/operators';
import { ApplicationPaths, QueryParameterNames } from './api-authorization.constants';
import { UserServiceService } from '../app/Services/Users/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private authorize: AuthorizeService, private router: Router, private userService:UserServiceService) {
  }
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles = _next.data['roles'] as Array<string>;
    
      return this.authorize.isAuthenticated()
      .pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state))) /*&& this.userService.userHasRoles(roles).pipe(tap(x => x));*/
    //result.subscribe(a => {
    //  if (a === true) {
    //  }
    //  else {
    //    this.router.navigate(['unauthorized']);
    //  }
    //})
    //return result;
  }

  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
    if (!isAuthenticated) {
      this.router.navigate(ApplicationPaths.LoginPathComponents, {
        queryParams: {
          [QueryParameterNames.ReturnUrl]: state.url
        }
      });
    }
  }
}
