import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, EventEmitter } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, pipe } from 'rxjs';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { FullMaintenanceList, MaintenanceList } from '../Models/MaintenanceList';
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

 

  lists: FullMaintenanceList[] =[];
  lists$: Observable<FullMaintenanceList[]> = this.maintenaceListService.getAllFullLists();
  selectedList?: FullMaintenanceList;
  
  users$: Observable<User[]> = this.userService.getAllUsers()

  filterControl = new FormControl('');

  ngOnInit(): void {
    //use this to filter stuff
    this.maintenaceListService.getAllFullLists().subscribe(l => {
      this.lists = l;

      this.lists$ = this.filterControl.valueChanges.pipe(
      startWith(''),
      
      map(value => this.filterLists(value))
    );
    });


  }


  private filterLists(term: string) {
    const lowerTerm = term.toLowerCase();
    return this.lists.filter(item => item.maintenanceList.title.toLowerCase().includes(lowerTerm) ||
      item.applicationUser.email.toLowerCase().includes(lowerTerm) ||
      item.applicationUser.firstname.toLowerCase().includes(lowerTerm) ||
      item.applicationUser.lastname.toLowerCase().includes(lowerTerm) ||
      item.group.name.toLowerCase().includes(lowerTerm))

  }


  onSelect(list: FullMaintenanceList): void {
    this.selectedList = list;
    let route = '/edit-list';
    this.router.navigate([route, list.maintenanceList.maintenanceListId]);
  }
  

  openDialog(): void {

   // get all the users
    this.userService.getAllUsers().subscribe(u => this.addListData.users = u);
    this.maintenaceListService.getAllGroups().subscribe(g => this.addListData.groups = g);
 

    const dialogRef = this.dialog.open(addListDialog, { width: '400px', height: '500px', data: this.addListData });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result !== "cancel") {
        this.lists$ = this.maintenaceListService.getAllFullLists();
      }

    });

  }
 

}
