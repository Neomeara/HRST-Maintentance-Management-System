import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FullMaintenanceList, ListItem, MaintenanceList } from '../../Models/MaintenanceList';
import { MaintenanceListService } from '../../Services/MaintenanceList/maintenance-list.service';
import { DeleteListDialogComponent } from '../Dialogs/delete-list-dialog/delete-list-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private readonly _httpClient: HttpClient;
  private readonly _router: Router;
  private readonly _maintenaceListservice: MaintenanceListService;

  fullList?: FullMaintenanceList;
  listId: number = 0;

  selectedItem?: ListItem;
  itemId: number = 0;

  newList: boolean = false;
  filterControl = new FormControl('');


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    httpClient: HttpClient,
    maintenanceListService: MaintenanceListService,
    public dialog: MatDialog  ) {
    this._router = router;
    this._httpClient = httpClient;
    this._maintenaceListservice = maintenanceListService;
  }

  ngOnInit(): void {
    // get the params
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listId = Number(params.get('listId'))
    })


    this._maintenaceListservice.getFullList(this.listId).subscribe(data => {
      if (data != null) {
        this.fullList = data;
      }
      else {
        this.router.navigate(['/todo-list']);
      }
    });
    
  }

  addItem() {
    let route = '/edit-list-item';
    this.newList = true;
    this.router.navigate([route, this.listId, this.newList]);

  }

  selectItem(item: ListItem) {
    this.selectedItem = item;
    this.newList = false;
    let route = '/edit-list-item/';
    if (this.selectedItem !== null) {
      this.router.navigate([route, item.maintenanceListId, this.newList, this.selectedItem.listItemId]);
    }
  }

  openDialog(): void {


    const dialogRef = this.dialog.open(DeleteListDialogComponent, { width: '400px', height: '250px', data: this.fullList });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  

}
