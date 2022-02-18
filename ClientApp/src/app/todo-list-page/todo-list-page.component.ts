import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MaintenanceList } from '../Models/MaintenanceList';
import { User } from '../Models/user';
import { addListDialog, DialogData } from './Dialogs/AddList/addListDialog';
import { MaintenanceListService } from './maintenance-list.service';
import { DefaultUser } from './mockLists';





@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.css']
})
export class TodoListPageComponent implements OnInit {

  private readonly _httpClient: HttpClient;
  private readonly _maintenaceListService: MaintenanceListService;
  private readonly _router: Router;
  public addListData: DialogData = {lists:[], groups:[], users:[]};

  //public readonly addListDialog: addListDialog;

  constructor(private router: Router, httpClient: HttpClient, maintenaceListService: MaintenanceListService, public dialog: MatDialog) {
    this._router = router;
    this._httpClient = httpClient;
    this._maintenaceListService = maintenaceListService;
    //this._addListData = addListData;
  }

 

  lists$: Observable<MaintenanceList[]> = of([]);
  lists: MaintenanceList[] = [];
  selectedList?: MaintenanceList;
  
  allGroups$: Observable<string[]> = of([]);

  allUsers: User[] = [ DefaultUser ];



  ngOnInit(): void {

    //this.lists$ = this._maintenaceListService.getLists();

    this._maintenaceListService.getLists().subscribe(a => {
      this.lists$ = of(a);
      this.addListData.lists = a;
      this.addListData.groups = [... new Set(a.map(g => g.group))];
      this.addListData.users = this.allUsers;
    });

    

    this.addListData.groups = [... new Set(this.addListData.groups)];
    
  }


  onSelect(list: MaintenanceList): void {
    this.selectedList = list;
    let route = '/edit-list';
    this.router.navigate([route], { queryParams: { id: this.selectedList.maintenanceListId } });
  }
  

  openDialog(): void {
 

    const dialogRef = this.dialog.open(addListDialog, { width: '400px', height: '500px', data: this.addListData });

    dialogRef.afterClosed().subscribe(result => {
      
      this._maintenaceListService.getLists().subscribe(a => {
        this.lists$ = of(a);
        this.addListData.lists = a;
        this.addListData.groups = a.map(g => g.group);
        this.addListData.users = this.allUsers;
      });
    });

  }
 

}
