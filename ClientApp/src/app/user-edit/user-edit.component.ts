import { Component, OnInit } from '@angular/core';
import { AdminPageComponent } from '../admin-page/admin-page.component'
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { getBaseUrl } from '../../main';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public userdata: any = {};

  private Http_: HttpClient;
  private baseurl_: string;
  constructor(Http: HttpClient, @Inject('BASE_URL') getBaseUrl: string, private route: ActivatedRoute) {
    this.Http_ = Http;
    this.baseurl_ = getBaseUrl;
  }
  id: string ="";
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.id = params.id;
      console.log(this.id);
    });
    let params = new HttpParams();
    params = params.append('id', this.id);
    this.Http_.get<any>(this.baseurl_ + 'api/users/edituser', { params: params }).subscribe(result => {
      this.userdata = result;
     console.log(result);
    },error => console.error(error));
  }

  name = "Jon";
  lastname = "Davis"
  username = "JD10101"
  role = "Basic User"
  company = "Company1"

}
