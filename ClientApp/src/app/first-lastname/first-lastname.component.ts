import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-first-lastname',
  templateUrl: './first-lastname.component.html',
  styleUrls: ['./first-lastname.component.css']
})
export class FirstLastnameComponent implements OnInit {
  componentproperty: any;
  username: any;
  formdata: any;
  formresult: any;
  
  private Http_: HttpClient;
  private baseurl_: string;

  constructor(Http: HttpClient, @Inject('BASE_URL') getBaseUrl: string) {
    this.Http_ = Http;
    this.baseurl_ = getBaseUrl;
  }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      Email:new FormControl(),
      UserName: new FormControl(),
      FirstName: new FormControl(),
      LastName: new FormControl()
    });
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
