import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FullListItem, ListItem, MaintenanceSchedule ,Location} from '../../Models/MaintenanceList';
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
  fullListItem?: FullListItem;
  //listItem?: ListItem;

  locations: Location[] = []
  schedules: MaintenanceSchedule[] = []



  listItemForm = new FormGroup({
    NameControl: new FormControl(""),
    CostControl: new FormControl(0),
    CostYearControl: new FormControl(new Date()),
    CommentsControl: new FormControl(""),
    PicturesControl: new FormControl([]),
    LocationGroup: new FormGroup({
      LocationNameControl: new FormControl("")
    }),
    ScheduleGroup: new FormGroup({

      MaintenanceIntervalControl: new FormControl(0),
      LastCompletedControl: new FormControl(new Date()),
      NextScheduledEventForcastedControl: new FormControl(new Date()),
      NextScheduledEventPlannedControl: new FormControl(new Date()),
      YearsToDelayControl: new FormControl(0),
    })

   


  });



  constructor(private maintenaceListService: MaintenanceListService, private route: ActivatedRoute,private router: Router, private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    // get params from url
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listId = Number(params.get('listId'))
      if (String(params.get('newList')).toLowerCase() === 'true') {
        this.newList = true;
      }
      else {
        this.newList = false;
        this.itemId = Number(params.get('listItemId'))
        

      }
    });

    if (this.newList === false && this.itemId !== null) {
      console.log(this.newList);
      this.maintenaceListService.getFullListItem(Number(this.itemId)).subscribe(result => {

        this.fullListItem= result;
        if (this.fullListItem) {
          
          this.setListItemForm(this.fullListItem.listItem);
          this.setLocationForm(this.fullListItem.location);
          this.setScheduleForm(this.fullListItem.maintenanceSchedule);
      }

      });

    }

   // get all the locations and schedules
    this.maintenaceListService.getAllLocations().subscribe(l => this.locations = l);
    this.maintenaceListService.getAllSchedules().subscribe(s => this.schedules = s);
      
  }

  setLocationForm(loc: Location) {
    this.listItemForm.patchValue({
      LocationGroup: {
        LocationNameControl: loc.name
      }
    })
  }

  setListItemForm(item: ListItem) {
    this.listItemForm.patchValue({
      NameControl: item.name,
      CostControl: formatDate(item.costYear, 'yyyy-MM-dd', 'en-us'),
      CostYearControl: item.costYear,
      CommentsControl: item.comments,
      //PicturesControl: new FormControl([]),
    })
  }

  setScheduleForm(s: MaintenanceSchedule) {
    this.listItemForm.patchValue({
      ScheduleGroup: {
        MaintenanceIntervalControl: s.maintenanceInterval,
        LastCompletedControl: formatDate(s.lastCompleted, 'yyyy-MM-dd', 'en-us'),
        NextScheduledEventForcastedControl: formatDate(s.nextScheduledEventForcasted, 'yyyy-MM-dd', 'en-us'),
      NextScheduledEventPlannedControl: formatDate(s.nextScheduledEventPlanned, 'yyyy-MM-dd', 'en-us'),
        YearsToDelayControl: s.yearsToDelay,
      }
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
      this.updateItem();
    }
  }


  // functions for adding a new list item
  addItem(data: any) {
    console.log(data);
    let loc: Location | undefined = this.locations.find(l => l.name === data.LocationGroup.LocationNameControl);
    let schedule: MaintenanceSchedule|undefined = this.schedules.find(s => s === data.ScheduleGroup);

    let newItem: FullListItem = {
      listItem: {
        listItemId: 0,
        maintenanceListId: this.listId,
        name: data.NameControl,
        locationId: loc?.locationId || -1,
        cost: data.CostControl,
        costYear: data.CostYearControl,
        maintenanceScheduleId: schedule?.maintenanceScheduleId || -1,
        comments: data.CommentsControl,
        pictures: []
      },
      location: {
        locationId: loc?.locationId || -1,
        name: loc?.name || data.LocationGroup.LocationNameControl
      },
      maintenanceSchedule: {
        maintenanceScheduleId: schedule?.maintenanceScheduleId || -1,
        maintenanceInterval: schedule?.maintenanceInterval || data.ScheduleGroup.MaintenanceIntervalControl,
        lastCompleted: schedule?.lastCompleted || data.ScheduleGroup.LastCompletedControl,
        nextScheduledEventForcasted: schedule?.nextScheduledEventForcasted || data.ScheduleGroup.NextScheduledEventForcastedControl, 
        nextScheduledEventPlanned: schedule?.nextScheduledEventPlanned || data.ScheduleGroup.NextScheduledEventPlannedControl,
        yearsToDelay: schedule?.yearsToDelay || data.ScheduleGroup.YearsToDelayControl
      }
    };
    
    this.maintenaceListService.addListItem(newItem, this.listId).subscribe(() => {
      this.backToList();
    });
    

  }

  // functions for editing/viewing existing list item
  updateItem() {
    if (this.fullListItem) {

    this.fullListItem.listItem.name = this.listItemForm.controls['NameControl'].value;
    this.fullListItem.location.name = this.listItemForm.controls['LocationControl'].value;
    this.fullListItem.listItem.cost = this.listItemForm.controls['CostControl'].value;
    this.fullListItem.listItem.costYear = this.listItemForm.controls['CostYearControl'].value;
    this.fullListItem.maintenanceSchedule.maintenanceInterval = this.listItemForm.controls['MaintenanceIntervalControl'].value;
    this.fullListItem.maintenanceSchedule.lastCompleted = this.listItemForm.controls['LastCompletedControl'].value;
    this.fullListItem.maintenanceSchedule.nextScheduledEventForcasted = this.listItemForm.controls['NextScheduledEventForcastedControl'].value;
    this.fullListItem.maintenanceSchedule.nextScheduledEventPlanned = this.listItemForm.controls['NextScheduledEventPlannedControl'].value;
    this.fullListItem.maintenanceSchedule.yearsToDelay = this.listItemForm.controls['YearsToDelayControl'].value;
    this.fullListItem.listItem.comments = this.listItemForm.controls['CommentsControl'].value;
    //this.listItem.pictures = this.listItemForm.controls['PicturesControl'].value;

      this.maintenaceListService.editItem(this.fullListItem.listItem).subscribe(results => console.log(results));
      this.backToList();
    }
  }

  openDialog(): void {

    //let deleteListItemData: DeleteListItemDialogData = { item: {}, listId: };
    if (this.fullListItem) {

      const dialogRef = this.dialog.open(DeleteListItemDialogComponent, { width: '400px', height: '250px', data: this.fullListItem.listItem });
      dialogRef.afterClosed().subscribe(result => {
      });
    }


      

  }

}
