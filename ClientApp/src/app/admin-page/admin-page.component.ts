import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { getBaseUrl } from '../../main';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserServiceService } from '../Services/Users/user-service.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit,AfterViewInit {

  public allUsers$: Observable<User[]> = this.userService.getAllUsers();
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'company'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public allUsers: User[] = [];
  constructor(Http: HttpClient, private router: Router, private userService: UserServiceService) {

    this.dataSource = new MatTableDataSource(this.allUsers);
  }


  ngOnInit(): void {
    this.allUsers$.subscribe(u => {
      this.allUsers = u;
      this.dataSource = new MatTableDataSource(this.allUsers);
      this.dataSource.paginator = this.paginator;
});

    //use this to filter stuff
  //  this.maintenaceListService.getLists().subscribe(l => {
  //    this.lists = l;

  //    this.lists$ = this.filterControl.valueChanges.pipe(
  //      startWith(''),

  //      map(value => this.filterLists(value))
  //    );
  //  });


  //}


  //private filterLists(term: string) {
  //  const lowerTerm = term.toLowerCase();
  //  return this.lists.filter(item => item.title.toLowerCase().includes(lowerTerm) //
  //    //item.applicationUser.email.toLowerCase().includes(lowerTerm) 
  //    //item.applicationUser.firstname.toLowerCase().includes(lowerTerm) 
  //    //item.applicationUser.lastname.toLowerCase().includes(lowerTerm) 
  //    //item.group.name.toLowerCase().includes(lowerTerm))
  //  )
  
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filteredUsers: User[] = [];
    const filterValue = (event.target as HTMLInputElement).value;
    const lowerTerm  = filterValue.trim().toLowerCase();
    filteredUsers = this.allUsers.filter(x => x.userName.toLowerCase().includes(lowerTerm)
      || x.firstname.toLowerCase().includes(lowerTerm)
      || x.lastname.toLowerCase().includes(lowerTerm)
      || x.group.name.toLowerCase().includes(lowerTerm));

    this.dataSource = new MatTableDataSource(filteredUsers);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  test(user : User) {
    console.log("This works");

    let route = '/user-edit';
    this.router.navigate([route], { queryParams: { id: user.id } });
  }


}
