"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListComponent = void 0;
var core_1 = require("@angular/core");
var TodoListComponent = /** @class */ (function () {
    function TodoListComponent(router, route, httpClient, maintenanceListService) {
        this.router = router;
        this.route = route;
        this.id = 0;
        this._router = router;
        this._httpClient = httpClient;
        this._maintenaceListservice = maintenanceListService;
    }
    TodoListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get the query params
        this.route.queryParams.subscribe(function (params) {
            console.log(params);
            _this.id = params.id;
            console.log(_this.id);
        });
        ////http get to database
        //let params = new HttpParams();
        //params = params.append('id', this.id);
        //this._httpClient.get<MaintenanceList>(getBaseUrl() + 'api/lists/getList', { params: params }).subscribe(result => {
        //  this.list = result;
        //});
        this._maintenaceListservice.getList(this.id).subscribe(function (data) { return _this.list = data; });
    };
    TodoListComponent.prototype.selectItem = function (item) {
        this.selectedItem = item;
        var route = '/edit-list-item';
        this.router.navigate([route], { queryParams: { id: this.selectedItem.listItemId } });
    };
    TodoListComponent = __decorate([
        core_1.Component({
            selector: 'app-todo-list',
            templateUrl: './todo-list.component.html',
            styleUrls: ['./todo-list.component.css']
        })
    ], TodoListComponent);
    return TodoListComponent;
}());
exports.TodoListComponent = TodoListComponent;
//# sourceMappingURL=todo-list.component.js.map