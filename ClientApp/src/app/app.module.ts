import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ApiAuthorizationModule } from '../api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from '../api-authorization/authorize.interceptor';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FirstLastnameComponent } from './first-lastname/first-lastname.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { addListDialog } from './todo-list-page/Dialogs/AddList/addListDialog';
import { TodoListPageComponent } from './todo-list-page/todo-list-page.component';
import { TodoListComponent } from './todo-list-page/todo-list/todo-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { DeleteListDialogComponent } from './todo-list-page/Dialogs/delete-list-dialog/delete-list-dialog.component';
import { EditListItemComponent } from './todo-list-page/edit-list-item/edit-list-item.component';
import { DeleteListItemDialogComponent } from './todo-list-page/Dialogs/delete-list-item-dialog/delete-list-item-dialog.component';
import { AuthorizeGuard, RoleGuard } from '../api-authorization/authorize.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ApplicationPaths } from '../api-authorization/api-authorization.constants';
import { LoginComponent } from '../api-authorization/login/login.component';
import { LogoutComponent } from '../api-authorization/logout/logout.component';
import { UnauthorizedComponent } from '../api-authorization/unauthorized/unauthorized.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { EditListAccessComponent } from './todo-list-page/edit-list-access/edit-list-access.component';
import { UploadComponent } from './file-upload/upload/upload.component';
import { DownloadComponent } from './file-upload/download/download.component';
import { FileManagerComponent } from './file-upload/file-manager/file-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AdminPageComponent,
    UserEditComponent,
    TodoListPageComponent,
    TodoListComponent,
    FirstLastnameComponent,
    addListDialog,
    DeleteListDialogComponent,
    EditListItemComponent,
    DeleteListItemDialogComponent,
    FileUploadComponent,
    EditListAccessComponent,
    UploadComponent,
    DownloadComponent,
    FileManagerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    BrowserAnimationsModule,
    MatSortModule,
    
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      
      { path: 'admin-page', component: AdminPageComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: ['HRST_Admin', 'HRST_Basic'] }},
      { path: 'user-edit', component: UserEditComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: ['HRST_Admin', 'HRST_Basic'] } },

      { path: 'todo-list', component: TodoListPageComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: ['HRST_Admin', 'HRST_Basic', 'HRSG_Owner', 'HRSG_Editer'] } },

      { path: 'edit-list', component: TodoListComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: ['HRST_Admin', 'HRST_Basic', 'HRSG_Owner', 'HRSG_Editer'] } },
      { path: 'edit-list/:listId', component: TodoListComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: ['HRST_Admin', 'HRST_Basic', 'HRSG_Owner', 'HRSG_Editer'] } },

      { path: 'edit-list-item', component: EditListItemComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: ['HRST_Admin', 'HRST_Basic', 'HRSG_Owner', 'HRSG_Editer'] }},
      { path: 'edit-list-item/:listId/:newList', component: EditListItemComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: ['HRST_Admin', 'HRST_Basic', 'HRSG_Owner', 'HRSG_Editer'] }},
      { path: 'edit-list-item/:listId/:newList/:listItemId', component: EditListItemComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: ['HRST_Admin', 'HRST_Basic', 'HRSG_Owner', 'HRSG_Editer'] } },
      { path: 'edit-list-access/:listId/:listGroupId', component: EditListAccessComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: ['HRST_Admin', 'HRST_Basic', 'HRSG_Owner'] }},
      { path: 'unauthorized', component: UnauthorizedComponent }


    
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
