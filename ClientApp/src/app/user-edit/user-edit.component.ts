import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name = "Jon";
  lastname = "Davis"
  username = "JD10101"
  role = "Basic User"
  company = "Company1"

}
