import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { TodoListPageComponent } from './todo-list-page/todo-list-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoListComponent } from './todo-list-page/todo-list/todo-list.component';
import { ListItemComponent } from './todo-list-page/list-item/list-item.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AdminPageComponent,
    UserEditComponent,
    AdminPageComponent,
    FetchDataComponent,
    TodoListPageComponent,
    TodoListComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },

      { path: 'admin-page', component: AdminPageComponent },
      { path: 'user-edit', component:UserEditComponent},

      { path: 'todo-list', component: TodoListPageComponent },
      { path: 'edit-list', component: TodoListComponent },
      { path: 'edit-list-item', component: ListItemComponent}
    
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
