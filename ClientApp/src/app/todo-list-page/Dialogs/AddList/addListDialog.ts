import { NullTemplateVisitor } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
export class addListDialog implements OnInit{
  private _maintenaceListService: MaintenanceListService;
  addListForm = new FormGroup(
    {
      groupControl: new FormControl(),
      userControl: new FormControl(),
      titleControl: new FormControl(""),

    });

  filteredGroups: Observable<Group[]> = of(this.data.groups);
  filteredUsers: Observable<User[]> = of(this.data.users)

  constructor(
    public dialogRef: MatDialogRef<addListDialog>,
    maintenanceListService: MaintenanceListService,
    @Inject(MAT_DIALOG_DATA) public data: AddListDialogData  ) {
    this._maintenaceListService = maintenanceListService;

  }

  ngOnInit() {
    this.filteredGroups = this.addListForm.get('groupControl')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroups(value))
    );

    this.filteredUsers = this.addListForm.get('userControl')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUsers(value))
    )

  }

  private _filterGroups(value: string): Group[] {
    const filterValue = value.toLowerCase();
    return this.data.groups.filter(option => option.name.toLowerCase().includes(filterValue))
  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.data.users.filter(option => option.email.toLowerCase().includes(filterValue))
  }


  formSubmit(data: any) {

    if (data.groupControl === null || data.userControl === null || data.titleControl === null) {
      alert("Invalid input, try again please")
    }
    else {


      this._maintenaceListService.addList(data.groupControl, data.titleControl, data.userControl).subscribe(() => {
        this.dialogRef.close('ok');
      });
    
    }
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

  groupChange() {
    console.log('yup');
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }


}
