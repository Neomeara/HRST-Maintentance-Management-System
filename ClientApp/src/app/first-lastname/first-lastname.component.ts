import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Component({
  selector: 'app-first-lastname',
  templateUrl: './first-lastname.component.html',
  styleUrls: ['./first-lastname.component.css']
})
export class FirstLastnameComponent implements OnInit {
  componentproperty: any;
  username: any;
  formresult: any;
  defaultemail: string = "";
  public userdata: any = {};

  
  private Http_: HttpClient;
  private baseurl_: string;


  public isAuthenticated?: Observable<boolean>;
  public userName?: Observable<string | null | undefined>;

    formdata = new FormGroup({
      Email:new FormControl(),
      UserName: new FormControl(),
      FirstName: new FormControl(),
      LastName: new FormControl()
    });
  constructor(Http: HttpClient, @Inject('BASE_URL') getBaseUrl: string, private authorizeService: AuthorizeService, private route: ActivatedRoute) {
    this.Http_ = Http;
    this.baseurl_ = getBaseUrl;
  }
  newusername: any = "";

  ngOnInit(): void {

    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
    if (this.userName != null) {
      this.userName.subscribe(x => this.newusername = x);
    }
    let params = new HttpParams();
    params = params.append('username', this.newusername);
    this.Http_.get<any>(this.baseurl_ + 'api/users/editfirstnamelastname', { params: params }).subscribe(result => {
      this.userdata = result;
      console.log(result);
      this.formdata.setValue({ Email: this.userdata.email, UserName: this.userdata.userName, FirstName: this.userdata.firstname, LastName: this.userdata.lastname });
    }, error => console.error(error));

  }
  showSuccessAlert() {
    Swal.fire('User Information Updated!', '', 'success')
  }
  onClickSubmit(data: any) {
    
    this.Http_.put<any>(this.baseurl_ + 'api/users/updateuser',data).subscribe(result => {
      this.formresult = result;
      
      console.log(result);
    }, error => console.error(error));
    this.showSuccessAlert();
  }
}
