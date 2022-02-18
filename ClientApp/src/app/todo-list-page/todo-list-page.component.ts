import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { getBaseUrl } from '../../main';
import { MaintenanceList, newList } from '../Models/MaintenanceList';
import { User } from '../Models/user';
import { DefaultUser, LISTS } from './mockLists';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MaintenanceListService } from './maintenance-list.service';



@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.css']
})
export class TodoListPageComponent implements OnInit {

  private readonly _httpClient: HttpClient;
  private readonly _maintenaceListService: MaintenanceListService;
  private readonly _router: Router;

  constructor(private router: Router, httpClient:HttpClient, maintenaceListService: MaintenanceListService) {
    this._router = router;
    this._httpClient = httpClient;
    this._maintenaceListService = maintenaceListService;
  }


  lists$: Observable<MaintenanceList[]> = of([]);
  lists: MaintenanceList[] = [];
  selectedList?: MaintenanceList;
  
  allGroups$: Observable<string[]> = of([]);

  allUsers: User[] = [ DefaultUser ];

  addListForm = new FormGroup(
    {
      groupControl: new FormControl(""),
      userControl: new FormControl(DefaultUser),
      titleControl: new FormControl(""),

    });
  myControl3 = new FormControl();

  groupName: string = "";

  title: string = "";
  ApplicationUser: User = DefaultUser;



  ngOnInit(): void {

    this.lists$ = this._maintenaceListService.getLists();

    //this.lists$.subscribe(data => this.allGroups$ = of(data.map(g => g.group)));
    this.allGroups$ = this.lists$.pipe(map(l => l.map(list => list.group)));
  }


  onSelect(list: MaintenanceList): void {
    this.selectedList = list;
    let route = '/edit-list';
    this.router.navigate([route], { queryParams: { id: this.selectedList.maintenanceListId } });
  }

  formSubmit(data: any) {
    this._maintenaceListService.addList(data.groupControl, data.titleControl, data.userControl);
  }

  public getDisplayFn() {
    return (val:User) => this.display(val);
  }
  private display(user: User): string {

    //access component "this" here
    return user?.email ?? " ";
  }
  selectUser(user: User) {
    this.addListForm.get('userControl')?.setValue(user);
  }
 

}
