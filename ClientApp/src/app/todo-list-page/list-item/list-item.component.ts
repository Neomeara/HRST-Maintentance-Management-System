import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getBaseUrl } from '../../../main';
import { ListItem } from '../../Models/MaintenanceList';
import { LISTS } from '../mockLists';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  private readonly _httpClient: HttpClient;


  id: number = 0;
  listItem?: ListItem;

  

  constructor(private route: ActivatedRoute, httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  ngOnInit(): void {

    //get the query params
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });

    // get the item from the db
    let params = new HttpParams();
    params = params.append('id', this.id);
    this._httpClient.get<ListItem>(getBaseUrl() + 'api/lists/getListItem', { params: params }).subscribe(results => {
      this.listItem = results;
    });

  }

}
