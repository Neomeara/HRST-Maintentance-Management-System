import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ListItem } from '../../Models/MaintenanceList';
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



  listItemForm = new FormGroup({
    NameControl: new FormControl(""),
    LocationControl: new FormControl(""),
    CostControl: new FormControl(0),
    CostYearControl: new FormControl(new Date()),
    MaintenanceIntervalControl: new FormControl(0),
    LastCompletedControl: new FormControl(new Date()),
    NextScheduledEventForcastedControl: new FormControl(new Date()),
    NextScheduledEventPlannedControl: new FormControl(new Date()),
    YearsToDelayControl: new FormControl(0),
    CommentsControl: new FormControl(""),
    PicturesControl: new FormControl([])


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
      this.maintenaceListService.getListItem(Number(this.itemId)).subscribe(result => {

        this.listItem = result;
        if (this.listItem) {
        this.listItemForm.controls['NameControl'].setValue(this.listItem.name);
        this.listItemForm.controls['LocationControl'].setValue(this.listItem.location.name);
        this.listItemForm.controls['CostControl'].setValue(this.listItem.cost);
        this.listItemForm.controls['CostYearControl'].setValue(this.listItem.costYear);
        this.listItemForm.controls['MaintenanceIntervalControl'].setValue(this.listItem.maintenanceSchedule.maintenanceInterval);
        this.listItemForm.controls['LastCompletedControl'].setValue(this.listItem.maintenanceSchedule.lastCompleted);
        this.listItemForm.controls['NextScheduledEventForcastedControl'].setValue(this.listItem.maintenanceSchedule.nextScheduledEventForcasted);
        this.listItemForm.controls['NextScheduledEventPlannedControl'].setValue(this.listItem.maintenanceSchedule.nextScheduledEventPlanned);
        this.listItemForm.controls['YearsToDelayControl'].setValue(this.listItem.maintenanceSchedule.yearsToDelay);
        this.listItemForm.controls['CommentsControl'].setValue(this.listItem.comments);
        this.listItemForm.controls['PicturesControl'].setValue(this.listItem.pictures);
      }

      });

  

     
    }

   
      
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
  
    this.maintenaceListService.addListItem(data, this.listId).subscribe(() => {
      this.router.navigate(['/edit-list', this.listId]);

    });
    

  }

  // functions for editing/viewing existing list item
  updateItem() {
    if (this.listItem) {

    this.listItem.name = this.listItemForm.controls['NameControl'].value;
    this.listItem.location.name = this.listItemForm.controls['LocationControl'].value;
    this.listItem.cost = this.listItemForm.controls['CostControl'].value;
    this.listItem.costYear = this.listItemForm.controls['CostYearControl'].value;
    this.listItem.maintenanceSchedule.maintenanceInterval = this.listItemForm.controls['MaintenanceIntervalControl'].value;
    this.listItem.maintenanceSchedule.lastCompleted = this.listItemForm.controls['LastCompletedControl'].value;
    this.listItem.maintenanceSchedule.nextScheduledEventForcasted = this.listItemForm.controls['NextScheduledEventForcastedControl'].value;
    this.listItem.maintenanceSchedule.nextScheduledEventPlanned = this.listItemForm.controls['NextScheduledEventPlannedControl'].value;
    this.listItem.maintenanceSchedule.yearsToDelay = this.listItemForm.controls['YearsToDelayControl'].value;
    this.listItem.comments = this.listItemForm.controls['CommentsControl'].value;
    //this.listItem.pictures = this.listItemForm.controls['PicturesControl'].value;

      this.maintenaceListService.editItem(this.listItem).subscribe(results => console.log(results));

    }
  }

  openDialog(): void {

    //let deleteListItemData: DeleteListItemDialogData = { item: {}, listId: };

    const dialogRef = this.dialog.open(DeleteListItemDialogComponent, { width: '400px', height: '250px', data: this.listItem });

    dialogRef.afterClosed().subscribe(result => {

      
    });

  }

}
