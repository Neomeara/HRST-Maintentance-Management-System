import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { Observable, of } from 'rxjs';
import { getBaseUrl } from '../../../main';
import {ListItem, MaintenanceList, newList} from '../../Models/MaintenanceList';
import { Group, User } from '../../Models/user';
import { defaultList } from '../../todo-list-page/mockLists';

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

  public getAllGroups(): Observable<Group[]> {
    
    return this._httpClient.get<Group[]>(getBaseUrl() + 'api/lists/getAllGroups');

  }
  public getGroup(id: number): Observable<Group> {
    return this._httpClient.get<Group>(getBaseUrl() + 'api/lists/getGroup/' + id.toString());
  }

  public  addList(groupName: Group, title:string, ApplicationUser: User): Observable<any> {
    let list = newList(groupName, title, ApplicationUser);

    return this._httpClient.post<MaintenanceList>(getBaseUrl() + 'api/lists/newlist', list, { observe: 'response' });
    
  }

  public  getList(id: number) {
    //http get to database
    return this._httpClient.get<MaintenanceList>(getBaseUrl() + 'api/lists/getlist/' + id.toString());
    

  }

  public  deleteList(id: number): Observable<any> {
    
     return this._httpClient.delete(getBaseUrl() + 'api/lists/deleteList/' + id.toString(), { observe: 'response' })

   
  }

  public addListItem(data: ListItem, listId: number):Observable<ListItem> {

    let list: MaintenanceList = defaultList;
    this.getList(listId).subscribe((ml) => { list = ml });

    return this._httpClient.post<ListItem>(getBaseUrl() + 'api/lists/addItem', data);
  }

  public deleteListItem(id: number): Observable<any> {
    console.log(id);
    let params = new HttpParams();
    params = params.append('id', id);

    

    return this._httpClient.delete(getBaseUrl() + 'api/lists/deleteItem/' + id.toString(),);

  }

  public getListItem(id: number): Observable<any> {
    return this._httpClient.get(getBaseUrl() + 'api/lists/getListItem/' + id.toString());
  }

  public editItem(item: ListItem): Observable<ListItem> {
    let params = new HttpParams();
    params = params.append('id', item.listItemId);
    return this._httpClient.post<ListItem>(getBaseUrl() + 'api/lists/editItem', item, {params:params});
  }


}
