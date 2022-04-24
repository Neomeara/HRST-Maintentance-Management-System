import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../Models/user';
import { UserServiceService } from '../../Services/Users/user-service.service';

export interface userRole {
  user: User,
  role: string
}

@Component({
  selector: 'app-edit-list-access',
  templateUrl: './edit-list-access.component.html',
  styleUrls: ['./edit-list-access.component.css']
})
export class EditListAccessComponent implements OnInit {

  public listGroupId: number = 0;
  public listId: number = 0;
  userRoles: userRole[] = [];

  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'email', 'access'];


  constructor(private userService: UserServiceService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    // get the params
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listGroupId = Number(params.get('listGroupId'));
      this.listId = Number(params.get('listId'))
    })

    this.userService.getListAccessUserRoles(this.listGroupId).subscribe(ur => this.userRoles = ur);
  }

  public onRoleChange(event: any, ur:userRole) {
    let index = this.userRoles.indexOf(ur);
    this.userRoles[index].role = event.target.value;
    console.log(this.userRoles[index].role);
    console.log(this.userRoles);
    //console.log(ur);
  }

  public updateUserRoles() {
    this.userService.updateListAccessUserRoles(this.userRoles).subscribe((result) => {
      Swal.fire('User Access Updated', '', 'success').then(() => {
        this.router.navigate([`edit-list/${this.listId}`])
      });
 
      
    }, error => {
      Swal.fire('Save failed - An unxpeced error occured', error, 'error');
    });
  }

}
