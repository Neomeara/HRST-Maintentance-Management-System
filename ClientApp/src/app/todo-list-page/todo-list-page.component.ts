import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MaintenanceList } from '../Models/MaintenanceList';
import { Group, User } from '../Models/user';
import { MaintenanceListService } from '../Services/MaintenanceList/maintenance-list.service';
import { UserServiceService } from '../Services/Users/user-service.service';
import { addListDialog, AddListDialogData } from './Dialogs/AddList/addListDialog';

interface ListRow {
  list: MaintenanceList,
  group: Group,
  applicationUser: User
}



@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.css']
})
export class TodoListPageComponent implements OnInit {

  private readonly _httpClient: HttpClient;
  private readonly _router: Router;
  private readonly _userService: UserServiceService
  public addListData: AddListDialogData = {lists:[], groups:[], users:[]};


  constructor(private router: Router, httpClient: HttpClient, private maintenaceListService: MaintenanceListService, public dialog: MatDialog, private userService:UserServiceService) {
    this._router = router;
    this._httpClient = httpClient;
    this._userService = userService;
  }

  listRows: ListRow[] = [];

  lists: MaintenanceList[] =[];
  listRows$?: Observable<ListRow[]>;
  selectedList?: MaintenanceList;
  
  users$: Observable<User[]> = this.userService.getAllUsers()


  filterControl = new FormControl('');

  ngOnInit(): void {
    let lists: MaintenanceList[] = [];
    let groups: Group[] = [];
    let users: User[] = [];
    this.maintenaceListService.getLists().subscribe(l => {
      lists = l;
      this.maintenaceListService.getAllGroups().subscribe(g => {
        groups = g;
        this.userService.getAllUsers().subscribe(u => {
          users = u;
          this.listRows = lists.map(l => ({ list: l, group: groups.find(g => g.groupId === l.groupId)!, applicationUser: users.find(u => u.id === l.applicationUserId)! }));
          this.listRows$ = this.filterControl.valueChanges.pipe(
            startWith(''),

            map(value => this.filterLists(value))
          );
        });
      });
    });

  }


  private filterLists(term: string) {
    const lowerTerm = term.toLowerCase();
  return this.listRows.filter(item => item.list.title.toLowerCase().includes(lowerTerm) ||
      item.applicationUser.email.toLowerCase().includes(lowerTerm) ||
      item.applicationUser.firstname.toLowerCase().includes(lowerTerm) ||
      item.applicationUser.lastname.toLowerCase().includes(lowerTerm) ||
      item.group.name.toLowerCase().includes(lowerTerm))
    
  }

  private createListRows() {
    let lists: MaintenanceList[] = [];
    let groups: Group[] = [];
    let users: User[] = [];
    this.maintenaceListService.getLists().subscribe(l => {
      lists = l;
      this.maintenaceListService.getAllGroups().subscribe(g => {
        groups = g;
        this.userService.getAllUsers().subscribe(u => {
          users = u;
          this.listRows = lists.map(l => ({ list: l, group: groups.find(g => g.groupId === l.groupId)!, applicationUser: users.find(u => u.id === l.applicationUserId)! }));
          this.listRows$ = this.filterControl.valueChanges.pipe(
          startWith(''),

          map(value => this.filterLists(value))
          );
        });
      });
    });
  }


  onSelect(list: MaintenanceList): void {
    this.selectedList = list;
    let route = '/edit-list';
    this.router.navigate([route, list.maintenanceListId]);
  }
  

  openDialog(): void {

   // get all the users
    this.userService.getAllUsers().subscribe(u => this.addListData.users = u);
    this.maintenaceListService.getAllGroups().subscribe(g => this.addListData.groups = g);
 

    const dialogRef = this.dialog.open(addListDialog, { width: '400px', height: '500px', data: this.addListData });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === "ok") {
        this.createListRows();
      }

    });

  }
 

}
