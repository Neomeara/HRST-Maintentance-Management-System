import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaintenanceList } from '../Models/MaintenanceList';
import { User } from '../Models/user';
import { MaintenanceListService } from '../Services/MaintenanceList/maintenance-list.service';
import { UserServiceService } from '../Services/Users/user-service.service';
import { addListDialog, AddListDialogData } from './Dialogs/AddList/addListDialog';





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

 

  lists$: Observable<MaintenanceList[]> = this.maintenaceListService.getLists();
  selectedList?: MaintenanceList;
  
  users$: Observable<User[]> = this.userService.getAllUsers()



  ngOnInit(): void {
    
  }


  onSelect(list: MaintenanceList): void {
    this.selectedList = list;
    let route = '/edit-list';
    this.router.navigate([route, list.maintenanceListId]);
  }
  

  openDialog(): void {

    this.users$.subscribe((users: User[]) => {
      this.addListData.users = users;
      this.addListData.groups = users.map(u => u.group)
    console.log(this.addListData.users, this.addListData.groups);

    });
 

    const dialogRef = this.dialog.open(addListDialog, { width: '400px', height: '500px', data: this.addListData });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result !== "cancel") {
        this.lists$ = this.maintenaceListService.getLists();
      }

    });

  }
 

}
