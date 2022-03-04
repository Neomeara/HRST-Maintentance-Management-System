import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { Observable, of } from 'rxjs';
import { getBaseUrl } from '../../main';
import { MaintenanceList, newList, ListItem } from '../Models/MaintenanceList';
import { Group, User } from '../Models/user';
import { defaultList, DefaultUser } from './mockLists';

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
    
    this.getLists().subscribe(data => groups= data.map(g => g.group.name));
    return of(groups);
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
    let params = new HttpParams();
    params = params.append('id', id);
    
     return this._httpClient.delete(getBaseUrl() + 'api/lists/deleteList', { params: params, observe: 'response' })

   
  }

  public addListItem(data: any, listId: number):Observable<any> {

    let list: MaintenanceList = defaultList;
    this.getList(listId).subscribe((ml) => { list = ml });
    
    let newItem: ListItem = {
      maintenanceListId: listId,
      maintenanceList: list,
      listItemId: 0,
      name: data.NameControl,
      location: {
        locationId: 0,
        name: data.LocationControl
      },
      cost: data.CostControl,
      costYear: data.CostYearControl,
      maintenanceSchedule: {
        maintenanceScheduleId: 0,
        maintenanceInterval: data.MaintenanceIntervalControl,
        lastCompleted: data.LastCompletedControl,
        nextScheduledEventForcasted: data.NextScheduledEventForcastedControl,
        nextScheduledEventPlanned: data.NextScheduledEventPlannedControl,
        yearsToDelay: data.YearsToDelayControl,
      },

      comments: data.CommentsControl,
      pictures: []
    };

    return this._httpClient.post<ListItem>(getBaseUrl() + 'api/lists/addItem', newItem, { observe: 'response' });
  }

  public deleteListItem(id: number): Observable<any> {
    console.log(id);
    let params = new HttpParams();
    params = params.append('id', id);

    

    return this._httpClient.delete(getBaseUrl() + 'api/lists/deleteItem', { params: params, observe: 'response' });

  }

  public getListItem(id: number): Observable<any> {
    return this._httpClient.get(getBaseUrl() + 'api/lists/getListItem/' + id.toString());
  }

}
