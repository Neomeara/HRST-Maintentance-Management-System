import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Group, User,Role } from '../Models/user';
import { UserServiceService } from '../Services/Users/user-service.service';
import { defaultGroup } from '../todo-list-page/mockLists';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public currentUserRole: Role = {} as Role;
  public userdata?: User;

    formdata = new FormGroup({
      Email: new FormControl(""),
      UserName: new FormControl(""),
      FirstName: new FormControl(""),
      LastName: new FormControl(""),
      Group: new FormControl(defaultGroup),
      Role:new FormControl()
    }); formresult: any;

  private id: string ="";
  private Http_: HttpClient;
  private baseurl_: string;
  private readonly router_: Router;
  public groups: Group[] = [];
  public roles: Role[] = [];

  constructor(Http: HttpClient, @Inject('BASE_URL') getBaseUrl: string, private route: ActivatedRoute, router: Router, private userService: UserServiceService) {
    this.Http_ = Http;
    this.baseurl_ = getBaseUrl;
    this.router_ = router;
  }
  ngOnInit(): void {
    // get the query params
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.id = params.id;
      console.log(this.id);

    });
    this.userService.getAllRoles().subscribe(r => this.roles = r);
    this.userService.getAllGroups().subscribe(x => this.groups = x);
    this.userService.getUserRole(this.id).subscribe(u => { this.currentUserRole = u; this.formdata.patchValue({Role:u.name})});
    // get the user data
   this.userService.getUser(this.id).subscribe(result => {
      this.userdata = result;
     this.formdata.patchValue({ Email: result.email, UserName: result.userName, FirstName: result.firstname, LastName: result.lastname, Group: result.group});

    }, error => console.error(error));


  }

  showSuccessAlert() {
    
    Swal.fire('User Information Updated', '', 'success');
    
    this.redirectToAdminPage();
  } 
  redirectToAdminPage() {
    setTimeout(() => {
      this.router_.navigate(['admin-page'])
    }, 2000);  
  }

  onClickSubmit(data: any) {
    let params = new HttpParams();
    params = params.append('id', this.id);
    this.Http_.put<any>(this.baseurl_ + 'api/users/updateuser2', data, {params: params}).subscribe(result => {
      this.formresult = result;
      console.log(result);
      console.log(data);
    }, error => console.error(error));
    this.userService.putRole(this.id, this.formdata.get('Role')!.value).subscribe();
    this.showSuccessAlert();
  }

  deleteUser() {
    this.userService.deleteUser(this.id).subscribe(() => {

      this.router_.navigate(['/admin-page']);
    });
  }

  // select and submit full group object
  public getGroupDisplayFn() {
    return (val: Group) => this.groupDisplay(val);
  }

  private groupDisplay(group: Group): string {
    //access component "this" here
    return group ? group.name : defaultGroup.name;
  }

  selectGroup(group: Group) {
    this.formdata.get('Group')?.setValue(group);
  }


}
