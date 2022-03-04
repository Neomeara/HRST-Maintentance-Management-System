import { Component, OnInit } from '@angular/core';
import { AdminPageComponent } from '../admin-page/admin-page.component'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { getBaseUrl } from '../../main';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserServiceService } from '../user-service.service';
import { User } from '../Models/user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public userdata?: User;

    formdata = new FormGroup({
      Email: new FormControl(),
      UserName: new FormControl(),
      FirstName: new FormControl(),
      LastName: new FormControl(),
      Group:new FormControl()
    }); formresult: any;

  private id: string ="";
  private Http_: HttpClient;
  private baseurl_: string;
  private readonly router_: Router;

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

    // get the user data
   this.userService.getUser(this.id).subscribe(result => {
      this.userdata = result;
      this.formdata.setValue({ Email: this.userdata.email, UserName: this.userdata.userName, FirstName: this.userdata.firstname, LastName: this.userdata.lastname,Group:this.userdata.group.name });

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
    }, error => console.error(error));
    this.showSuccessAlert();
  }

  deleteUser() {
    this.userService.deleteUser(this.id).subscribe(() => {

      this.router_.navigate(['/admin-page']);
    });


  }


}
