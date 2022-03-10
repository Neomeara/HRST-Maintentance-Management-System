import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { getBaseUrl } from '../../main';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserServiceService } from '../Services/Users/user-service.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  public allUsers$: Observable<User[]> = this.userService.getAllUsers();
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'company'];

  constructor(Http: HttpClient, private router: Router, private userService: UserServiceService) {
 
  }


  ngOnInit(): void {

  }



  test(user : User) {
    console.log("This works");

    let route = '/user-edit';
    this.router.navigate([route], { queryParams: { id: user.id } });
  }


}
