import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getBaseUrl } from '../../main';
import { MaintenanceList } from '../Models/MaintenanceList';
import { LISTS } from './mockLists';



@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.css']
})
export class TodoListPageComponent implements OnInit {

  private readonly _httpClient: HttpClient;

  lists: MaintenanceList[] = [];
  selectedList?: MaintenanceList;

  onSelect(list: MaintenanceList): void {
    this.selectedList = list;
    let route = '/edit-list';
    this.router.navigate([route], { queryParams: { id: this.selectedList.maintenanceListId } });
  }

  private readonly _router: Router;

  constructor(private router: Router, httpClient:HttpClient) {
    this._router = router;
    this._httpClient = httpClient;
  }

  ngOnInit(): void {
    this._httpClient.get<MaintenanceList[]>(getBaseUrl()+'api/lists/getAllLists').subscribe(result => {
      this.lists = result;
      console.log(result);
    })
  }

  viewlist() {

  }

}
