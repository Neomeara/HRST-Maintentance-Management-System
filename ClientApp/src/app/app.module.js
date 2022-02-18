"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var nav_menu_component_1 = require("./nav-menu/nav-menu.component");
var home_component_1 = require("./home/home.component");
var counter_component_1 = require("./counter/counter.component");
var fetch_data_component_1 = require("./fetch-data/fetch-data.component");
var api_authorization_module_1 = require("../api-authorization/api-authorization.module");
var authorize_interceptor_1 = require("../api-authorization/authorize.interceptor");
var todo_list_page_component_1 = require("./todo-list-page/todo-list-page.component");
var admin_page_component_1 = require("./admin-page/admin-page.component");
var animations_1 = require("@angular/platform-browser/animations");
var table_1 = require("@angular/material/table");
var user_edit_component_1 = require("./user-edit/user-edit.component");
var checkbox_1 = require("@angular/material/checkbox");
var todo_list_component_1 = require("./todo-list-page/todo-list/todo-list.component");
var list_item_component_1 = require("./todo-list-page/list-item/list-item.component");
var autocomplete_1 = require("@angular/material/autocomplete");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var first_lastname_component_1 = require("./first-lastname/first-lastname.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                nav_menu_component_1.NavMenuComponent,
                home_component_1.HomeComponent,
                counter_component_1.CounterComponent,
                fetch_data_component_1.FetchDataComponent,
                admin_page_component_1.AdminPageComponent,
                user_edit_component_1.UserEditComponent,
                todo_list_page_component_1.TodoListPageComponent,
                todo_list_component_1.TodoListComponent,
                list_item_component_1.ListItemComponent,
                first_lastname_component_1.FirstLastnameComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                api_authorization_module_1.ApiAuthorizationModule,
                animations_1.BrowserAnimationsModule,
                router_1.RouterModule.forRoot([
                    { path: '', component: home_component_1.HomeComponent, pathMatch: 'full' },
                    { path: 'admin-page', component: admin_page_component_1.AdminPageComponent },
                    { path: 'user-edit', component: user_edit_component_1.UserEditComponent },
                    { path: 'first-lastname', component: first_lastname_component_1.FirstLastnameComponent },
                    { path: 'todo-list', component: todo_list_page_component_1.TodoListPageComponent },
                    { path: 'edit-list', component: todo_list_component_1.TodoListComponent },
                    { path: 'edit-list-item', component: list_item_component_1.ListItemComponent }
                ]),
                animations_1.BrowserAnimationsModule,
                table_1.MatTableModule,
                checkbox_1.MatCheckboxModule,
                autocomplete_1.MatAutocompleteModule,
                form_field_1.MatFormFieldModule,
                forms_1.ReactiveFormsModule,
                input_1.MatInputModule,
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: authorize_interceptor_1.AuthorizeInterceptor, multi: true }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map