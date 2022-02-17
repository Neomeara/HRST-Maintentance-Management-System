import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getBaseUrl } from '../../main';
import { MaintenanceList, newList } from '../Models/MaintenanceList';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceListService {

  private readonly _httpClient: HttpClient;


  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getLists(): Observable<MaintenanceList[]> {
    return this._httpClient.get<MaintenanceList[]>(getBaseUrl() + 'api/lists/getAllLists').pipe(lists => lists);
  }

  public getGroups(): Observable<string[]> {
    let groups: string[] = [];
    
    this.getLists().subscribe(data => groups= data.map(g => g.group));
    return of(groups);
  }

  public addList(groupName: string, title:string, ApplicationUser: User): any {
    let list = newList(groupName, title, ApplicationUser);

    let result;
    this._httpClient.post<MaintenanceList>(getBaseUrl() + 'api/lists/newlist', list).subscribe(data => {
      result = data;
    })
    return result;
  }

  public  getList(id: number) {
    //http get to database
    let list: any;
    let params = new HttpParams();
    params = params.append('id', id);
    return this._httpClient.get<MaintenanceList>(getBaseUrl() + 'api/lists/getList', { params: params });
    

  }

  public deleteList(id: number) {
    this._httpClient.delete(getBaseUrl() + '/api/list/deleteList', {}).subscribe(data => { return data });
  }

}
