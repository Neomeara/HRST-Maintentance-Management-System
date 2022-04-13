import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getBaseUrl } from '../../../main';
import { changeRoleModel, Group, Role, User } from '../../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private readonly _httpClient: HttpClient;


  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getAllUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(getBaseUrl() + 'api/users/userinfo')
  }

  public getUser(id: string): Observable<User> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this._httpClient.get<User>(getBaseUrl() + 'api/users/edituser', { params: params })
  }

  public deleteUser(id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this._httpClient.delete(getBaseUrl() + 'api/users/deleteUser', { params: params, observe: 'response' })

  }
  public getuservianame(username: string):Observable<User> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this._httpClient.get<any>(getBaseUrl() + 'api/users/editfirstnamelastname', { params: params });
  }
  public getAllGroups(): Observable<Group[]> {
    return this._httpClient.get<Group[]>(getBaseUrl() + 'api/users/getGroups')
  }

  public userHasRoles(roles: string[]): Observable<boolean> {

    return this._httpClient.post<boolean>(getBaseUrl() + 'api/users/userHasRoles', roles);
  }

  public getAllRoles(): Observable<Role[]> {

    return this._httpClient.get<Role[]>(getBaseUrl() + 'api/users/getAllRoles');
  }

  public getCurrentRole(): Observable<Role> {
    return this._httpClient.get<Role>(getBaseUrl() + 'api/users/getCurrentRole');
  }
  public getUserRole(id: string): Observable<Role> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this._httpClient.get<Role>(getBaseUrl() + 'api/users/getUserRole', {params:params});
  }

  public putRole(id: string, rolename: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('rolename', rolename);
    return this._httpClient.post<any>(getBaseUrl() + 'api/users/putRole', {},{params:params});
  }
}
