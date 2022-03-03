import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListItem } from '../../../Models/MaintenanceList';
import { MaintenanceListService } from '../../maintenance-list.service';

export interface DeleteListItemDialogData {
  listId: number,
  item: ListItem
  
}

@Component({
  selector: 'app-delete-list-item-dialog',
  templateUrl: './delete-list-item-dialog.component.html',
  styleUrls: ['./delete-list-item-dialog.component.css']
})
export class DeleteListItemDialogComponent implements OnInit {

  constructor(
    private router: Router,
    private maintenaceListService: MaintenanceListService,
    public dialogRef: MatDialogRef<DeleteListItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListItem,  ) { }

  ngOnInit(): void {
  }


  deleteListItem() {
    this.maintenaceListService
    this.maintenaceListService.deleteListItem(this.data.listItemId).subscribe(() => {
      this.dialogRef.close();
      let route = '/edit-list';
      this.router.navigate([route, this.data.maintenanceListId]);

    });


  }

  onNoClick(): void {
    this.dialogRef.close("exit");
  }

}
