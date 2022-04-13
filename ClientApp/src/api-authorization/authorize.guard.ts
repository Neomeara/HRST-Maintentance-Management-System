import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
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
      .pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state)))
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

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authorize: AuthorizeService, private router: Router, private userService: UserServiceService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let result = false;
    const roles = route.data['roles'] as Array<string>;
    return this.userService.userHasRoles(roles).pipe(tap(hasRoles => this.handleRoleCheck(hasRoles)));

  }

  private handleRoleCheck(hasRoles: boolean) {
    if (!hasRoles) {
      this.router.navigate(['unauthorized']);
    }
  }
}
