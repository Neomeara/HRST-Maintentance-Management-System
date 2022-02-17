import { HttpClient, HttpParams } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { getBaseUrl } from '../../../main';
import { MaintenanceList, ListItem } from '../../Models/MaintenanceList';
import { User } from '../../Models/user';
import { MaintenanceListService } from '../maintenance-list.service';
import { LISTS } from '../mockLists';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private readonly _httpClient: HttpClient;
  private readonly _router: Router;
  private readonly _maintenaceListservice: MaintenanceListService;

  id: number =0;
  list?: MaintenanceList;
  selectedItem?: ListItem;


  constructor(private router: Router, private route: ActivatedRoute, httpClient:HttpClient, maintenanceListService: MaintenanceListService) {
    this._router = router;
    this._httpClient = httpClient;
    this._maintenaceListservice = maintenanceListService;
  }

  ngOnInit(): void {
    // get the query params
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.id = params.id;
      console.log(this.id);
    });

    ////http get to database
    //let params = new HttpParams();
    //params = params.append('id', this.id);
    //this._httpClient.get<MaintenanceList>(getBaseUrl() + 'api/lists/getList', { params: params }).subscribe(result => {
    //  this.list = result;
    //});

    this._maintenaceListservice.getList(this.id).subscribe(data => this.list = data);
  }

  selectItem(item: ListItem) {
    this.selectedItem = item;
    let route = '/edit-list-item';
    this.router.navigate([route], { queryParams: { id: this.selectedItem.listItemId } });
  }

}
