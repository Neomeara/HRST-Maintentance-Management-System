import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListItem, MaintenanceList} from '../../Models/MaintenanceList';
import { MaintenanceListService } from '../../Services/MaintenanceList/maintenance-list.service';
import { DeleteListItemDialogComponent } from '../Dialogs/delete-list-item-dialog/delete-list-item-dialog.component';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.css']
})
export class EditListItemComponent implements OnInit {

  listId: number = 0;
  newList: boolean = false;
  itemId?: number;
  listItem?: ListItem;
  

  constructor(
    private maintenaceListService: MaintenanceListService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
      ) {
    
  }

  public listItemForm = this.formBuilder.group({
    name: [''],
    location: [''],
    priority: [''],
    totalCost: [0],
    costPerYear: [0],
    maintenanceInterval: [0],
    maintenanceIntervalType: [''],
    lastCompleted: [new Date],
    nextScheduledEvent: [new Date],
    comments: [''],

  })

  ngOnInit(): void {
    // get params from url
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listId = Number(params.get('listId'))
      if (String(params.get('newList')).toLowerCase() === 'true') {
        this.newList = true;
      }
      else {
        this.newList = false;
        this.itemId = Number(params.get('listItemId'));
        this.maintenaceListService.getListItem(Number(this.itemId)).subscribe((result : ListItem) => {

          this.listItem = result;
          this.listItemForm.patchValue({
            name: result.name,
            location: result.location,
            priority: result.priority,
            totalCost: result.totalCost,
            costPerYear: result.costPerYear,
            maintenanceInterval: result.maintenanceInterval,
            maintenanceIntervalType: result.maintenanceIntervalType,
            lastCompleted: formatDate(result.lastCompleted, 'yyyy-MM-dd', 'en'),
            nextScheduledEvent: formatDate(result.nextScheduledEvent, 'yyyy-MM-dd', 'en'),
            comments: result.comments
          });         

        });
        

      }
    });

  }

 

  setListItemForm(item: ListItem) {
    this.listItemForm.patchValue({
      NameControl: item.name,
      CostControl: item.totalCost,
      CostYearControl: item.costPerYear,
      CommentsControl: item.comments,
      //PicturesControl: new FormControl([]),
    })
  }

  

  backToList() {
    this.router.navigate(['/edit-list', this.listId]);

  }

  // button choice function
  submit(data:any) {
    if (this.newList === true) {
      this.addItem(data);
    }
    else {
      this.updateItem(data);
    }
  }


  // functions for adding a new list item
  addItem(data: any) {
    let newItem: ListItem = data;
    newItem.maintenanceListId = this.listId;
    this.maintenaceListService.addListItem(newItem, this.listId).subscribe(() => {
      this.backToList();
    });
    //console.log(data);
    //let loc: Location | undefined = this.locations.find(l => l.name === data.LocationGroup.LocationNameControl);
    //let schedule: MaintenanceSchedule|undefined = this.schedules.find(s => s === data.ScheduleGroup);

    //let newItem: ListItem = {
    //  listItem: {
    //    listItemId: 0,
    //    maintenanceListId: this.listId,
    //    name: data.NameControl,
    //    locationId: loc?.locationId || -1,
    //    cost: data.CostControl,
    //    costYear: data.CostYearControl,
    //    maintenanceScheduleId: schedule?.maintenanceScheduleId || -1,
    //    comments: data.CommentsControl,
    //    pictures: []
    //  },
    //  location: {
    //    locationId: loc?.locationId || -1,
    //    name: loc?.name || data.LocationGroup.LocationNameControl
    //  },
    //  maintenanceSchedule: {
    //    name: schedule?.name || '',
    //    maintenanceScheduleId: schedule?.maintenanceScheduleId || -1,
    //    maintenanceInterval: schedule?.maintenanceInterval || data.ScheduleGroup.MaintenanceIntervalControl,
    //    lastCompleted: schedule?.lastCompleted || data.ScheduleGroup.LastCompletedControl,
    //    nextScheduledEventForcasted: schedule?.nextScheduledEventForcasted || data.ScheduleGroup.NextScheduledEventForcastedControl, 
    //    nextScheduledEventPlanned: schedule?.nextScheduledEventPlanned || data.ScheduleGroup.NextScheduledEventPlannedControl,
    //    yearsToDelay: schedule?.yearsToDelay || data.ScheduleGroup.YearsToDelayControl
    //  }
    //};
    
    

  }

  // functions for editing/viewing existing list item
  updateItem(data: any) {
     let formList: ListItem = data;
    formList.maintenanceListId = this.listId;
    formList.listItemId = Number(this.itemId);


      this.maintenaceListService.editItem(formList).subscribe(results => console.log(results));
      this.backToList();
    
  }

  openDialog(): void {

    //let deleteListItemData: DeleteListItemDialogData = { item: {}, listId: };
    if (this.listItem) {

      const dialogRef = this.dialog.open(DeleteListItemDialogComponent, { width: '400px', height: '250px', data: this.listItem });
      dialogRef.afterClosed().subscribe(result => {
      });
    }


      

  }

  public goToListFilesPage() {
    if (this.newList === false) {

      this.router.navigate([`edit-list/${this.listId}/${this.itemId}/files`])
    }
  }

}
