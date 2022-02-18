import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItem, MaintenanceList } from '../../Models/MaintenanceList';
import { DeleteListDialogComponent } from '../Dialogs/delete-list-dialog/delete-list-dialog.component';
import { MaintenanceListService } from '../maintenance-list.service';

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
    // get the query params
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.id = params.id;
      console.log(this.id);


    });


    this._maintenaceListservice.getList(this.id).subscribe(data => {
      if (data != null) {
        this.list = data;
      }
      else {
        this.router.navigate(['/todo-list']);
      }
    });
    
  }

  selectItem(item: ListItem) {
    this.selectedItem = item;
    let route = '/edit-list-item';
    this.router.navigate([route], { queryParams: { id: this.selectedItem.listItemId } });
  }

  openDialog(): void {


    const dialogRef = this.dialog.open(DeleteListDialogComponent, { width: '400px', height: '250px', data: this.list });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  

}
