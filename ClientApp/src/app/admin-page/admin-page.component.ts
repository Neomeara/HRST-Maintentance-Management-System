import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { getBaseUrl } from '../../main';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  public users: any[] =[];
  constructor(Http: HttpClient, @Inject('BASE_URL') getBaseUrl: string, private router: Router) {
    Http.get<any[]>(getBaseUrl + 'api/users/userinfo').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {

  }

  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'company'];
   dataSource = this.users;


  test(user : User) {
    console.log("This works");

    let route = '/user-edit';
    this.router.navigate([route], { queryParams: { id: user.id } });
  }


}
