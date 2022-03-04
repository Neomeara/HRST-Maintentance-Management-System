import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ListItem } from '../../Models/MaintenanceList';
import { DeleteListItemDialogComponent } from '../Dialogs/delete-list-item-dialog/delete-list-item-dialog.component';
import { MaintenanceListService } from '../maintenance-list.service';

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
      this.maintenaceListService.getListItem(Number(this.itemId)).subscribe(result =>
        this.listItem = result);
    }
      
  }


  // functions for adding a new list item
  addItem(data: any) {
  
    this.maintenaceListService.addListItem(data, this.listId).subscribe(() => {
      this.router.navigate(['/edit-list', this.listId]);

    });
    

  }

  // functions for editing/viewing existin list item

  openDialog(): void {

    //let deleteListItemData: DeleteListItemDialogData = { item: {}, listId: };

    const dialogRef = this.dialog.open(DeleteListItemDialogComponent, { width: '400px', height: '250px', data: this.listItem });

    dialogRef.afterClosed().subscribe(result => {

      
    });

  }

}
