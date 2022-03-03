import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintenanceList } from '../../../Models/MaintenanceList';
import { User } from '../../../Models/user';
import { MaintenanceListService } from '../../maintenance-list.service';
import { DefaultUser } from '../../mockLists';


export interface AddListDialogData {
  lists: MaintenanceList[];
  groups: string[];
  users: User[];
}

@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'addListDialog.html',
})
export class addListDialog {
  private _maintenaceListService: MaintenanceListService;
  addListForm = new FormGroup(
    {
      groupControl: new FormControl(""),
      userControl: new FormControl(DefaultUser),
      titleControl: new FormControl(""),

    });

  constructor(
    public dialogRef: MatDialogRef<addListDialog>,
    maintenanceListService: MaintenanceListService,
    @Inject(MAT_DIALOG_DATA) public data: AddListDialogData  ) {
    this._maintenaceListService = maintenanceListService;
  }

  formSubmit(data: any) {
    this._maintenaceListService.addList(data.groupControl, data.titleControl, data.userControl).subscribe(() => {
      this.dialogRef.close();
    });
    
  }

  public getDisplayFn() {
    return (val: User) => this.display(val);
  }
  private display(user: User): string {
    //access component "this" here
    return user ? user.email : user;
  }
  selectUser(user: User) {
    this.addListForm.get('userControl')?.setValue(user);
  }

  onNoClick(): void {
    this.dialogRef.close("exit");
  }


}
