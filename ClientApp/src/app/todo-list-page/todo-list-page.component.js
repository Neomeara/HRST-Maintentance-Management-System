"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListPageComponent = void 0;
var core_1 = require("@angular/core");
var mockLists_1 = require("./mockLists");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var TodoListPageComponent = /** @class */ (function () {
    function TodoListPageComponent(router, httpClient, maintenaceListService) {
        this.router = router;
        this.lists$ = rxjs_1.of([]);
        this.lists = [];
        this.allGroups$ = rxjs_1.of([]);
        this.allUsers = [mockLists_1.DefaultUser];
        this.addListForm = new forms_1.FormGroup({
            groupControl: new forms_1.FormControl(""),
            userControl: new forms_1.FormControl(mockLists_1.DefaultUser),
            titleControl: new forms_1.FormControl(""),
        });
        this.myControl3 = new forms_1.FormControl();
        this.groupName = "";
        this.title = "";
        this.ApplicationUser = mockLists_1.DefaultUser;
        this._router = router;
        this._httpClient = httpClient;
        this._maintenaceListService = maintenaceListService;
    }
    TodoListPageComponent.prototype.ngOnInit = function () {
        this.lists$ = this._maintenaceListService.getLists();
        //this.lists$.subscribe(data => this.allGroups$ = of(data.map(g => g.group)));
        this.allGroups$ = this.lists$.pipe(operators_1.map(function (l) { return l.map(function (list) { return list.group; }); }));
    };
    TodoListPageComponent.prototype.onSelect = function (list) {
        this.selectedList = list;
        var route = '/edit-list';
        this.router.navigate([route], { queryParams: { id: this.selectedList.maintenanceListId } });
    };
    TodoListPageComponent.prototype.formSubmit = function (data) {
        this._maintenaceListService.addList(data.groupControl, data.titleControl, data.userControl);
    };
    TodoListPageComponent.prototype.getDisplayFn = function () {
        var _this = this;
        return function (val) { return _this.display(val); };
    };
    TodoListPageComponent.prototype.display = function (user) {
        var _a;
        //access component "this" here
        return (_a = user === null || user === void 0 ? void 0 : user.email) !== null && _a !== void 0 ? _a : user;
    };
    TodoListPageComponent.prototype.selectUser = function (user) {
        var _a;
        (_a = this.addListForm.get('userControl')) === null || _a === void 0 ? void 0 : _a.setValue(user);
    };
    TodoListPageComponent = __decorate([
        core_1.Component({
            selector: 'app-todo-list-page',
            templateUrl: './todo-list-page.component.html',
            styleUrls: ['./todo-list-page.component.css']
        })
    ], TodoListPageComponent);
    return TodoListPageComponent;
}());
exports.TodoListPageComponent = TodoListPageComponent;
//# sourceMappingURL=todo-list-page.component.js.map