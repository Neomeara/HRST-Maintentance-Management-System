import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaintenanceList } from '../../../Models/MaintenanceList';
import { MaintenanceListService } from '../../maintenance-list.service';

@Component({
  selector: 'app-delete-list-dialog',
  templateUrl: './delete-list-dialog.component.html',
  styleUrls: ['./delete-list-dialog.component.css']
})
export class DeleteListDialogComponent implements OnInit {

  private readonly _router: Router;
  private readonly _maintenaceListservice: MaintenanceListService;

  

  constructor(
    public dialogRef: MatDialogRef<DeleteListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaintenanceList,
    maintenanceListService: MaintenanceListService,
router: Router  ) {

    this._router = router;
    this._maintenaceListservice = maintenanceListService;
  }

  ngOnInit(): void {
  }

  deleteList() {
    this._maintenaceListservice.deleteList(this.data.maintenanceListId).subscribe(() => {
    this.dialogRef.close();
    this._router.navigate(['/todo-list']);

    });
    
    
  }

  onNoClick(): void {
    this.dialogRef.close("exit");
  }

}
