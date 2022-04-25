import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { getBaseUrl } from '../../../main';
import { ListItem, MaintenanceList } from '../../Models/MaintenanceList';
import { Group } from '../../Models/user';
import { MaintenanceListService } from '../../Services/MaintenanceList/maintenance-list.service';
import { DeleteListDialogComponent } from '../Dialogs/delete-list-dialog/delete-list-dialog.component';
import { defaultGroup } from '../mockLists';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'priority', 'nextevent'];
  private readonly _httpClient: HttpClient;
  private readonly _router: Router;
  private readonly _maintenaceListservice: MaintenanceListService;

  public response: { dbPath: '' } = {dbPath: ''};
  public uploadFinished = (event:any) => {
    this.response = event;
  }

  fullList?: MaintenanceList;
  listId: number = 0;
  listGroup: Group = defaultGroup;

  selectedItem?: ListItem;
  itemId: number = 0;

  newItem: boolean = false;
  filterControl = new FormControl('');

  listItems$: Observable<ListItem[]> = null!;
  sortedData: ListItem[];
  listItems: ListItem[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    httpClient: HttpClient,
    maintenanceListService: MaintenanceListService,
    public dialog: MatDialog  ) {
    this._router = router;
    this._httpClient = httpClient;
    this._maintenaceListservice = maintenanceListService;
    this.sortedData = this.listItems.slice();

  }

  ngOnInit(): void {
    // get the params
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listId = Number(params.get('listId'))
    })


    this._maintenaceListservice.getList(this.listId).subscribe(data => {
      if (data != null) {
        this.fullList = data;
        this.sortedData = this.fullList.listItems;
        this._maintenaceListservice.getGroup(data.groupId).subscribe(g => {
          this.listGroup = g;
          //this.listItems$ = this.filterControl.valueChanges.pipe(
          //  startWith(''),

          //  map(value => this.filterItems(value))
          //);
        });
      }
      else {
        this.router.navigate(['/todo-list']);
      }
    });
    
  }


  sortData(sort: Sort) {
    //console.log("hello");
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name,b.name,isAsc);
        case 'location':
          return compare(a.location, b.location, isAsc);
        case 'priority':
          return compare(a.priority, b.priority, isAsc);
        case 'nextevent':
          return compare(a.nextScheduledEvent, b.nextScheduledEvent, isAsc);
        default:
          return 0;
      }
    });
  }




  public filterItems(event:Event) {
    const lowerTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.sortedData = this.fullList!.listItems.filter(item => item.name.toLowerCase().includes(lowerTerm)
      || item.location.toLowerCase().includes(lowerTerm)
      || item.priority.toLowerCase().includes(lowerTerm)
    )
  }

  addItem() {
    let route = '/edit-list-item';
    this.newItem = true;
    this.router.navigate([route, this.listId, this.newItem]);

  }

  selectItem(item: ListItem) {
    this.selectedItem = item;
    this.newItem = false;
    let route = '/edit-list-item/';
    if (this.selectedItem !== null) {
      this.router.navigate([route, item.maintenanceListId, this.newItem, this.selectedItem.listItemId]);
    }
  }

  openDialog(): void {


    const dialogRef = this.dialog.open(DeleteListDialogComponent, { width: '400px', height: '250px', data: this.fullList });

    dialogRef.afterClosed().subscribe(result => {

    });

  }


  public goToListAccessPage() {
    if (this.fullList) {

    this.router.navigate([`edit-list-access/${this.fullList.maintenanceListId}/${this.fullList.groupId}`])
    }

  public createImgPath = () => {
    return 'https://localhost:7123' + this.response.dbPath;

  }

}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
