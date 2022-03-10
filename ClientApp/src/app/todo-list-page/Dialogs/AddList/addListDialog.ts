import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintenanceList } from '../../../Models/MaintenanceList';
import { Group, User } from '../../../Models/user';
import { MaintenanceListService } from '../../../Services/MaintenanceList/maintenance-list.service';
import { defaultGroup, DefaultUser } from '../../mockLists';


export interface AddListDialogData {
  lists: MaintenanceList[];
  groups: Group[];
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
      groupControl: new FormControl(),
      userControl: new FormControl(),
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

  // Select and submit full user object
  public getUserDisplayFn() {
    return (val: User) => this.userDisplay(val);
  }


  private userDisplay(user: User): string {
    //access component "this" here
    return user ? user.email : user;
  }
  selectUser(user: User) {
    this.addListForm.get('userControl')?.setValue(user);
  }


  // select and submit full group object
  public getGroupDisplayFn() {
    return (val: Group) => this.groupDisplay(val);
  }

  private groupDisplay(group: Group): string {
    //access component "this" here
    return group ? group.name : group;
  }
  selectGroup(group: Group) {
    this.addListForm.get('groupControl')?.setValue(group);
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }


}
