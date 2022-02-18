"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var main_1 = require("../../../main");
var ListItemComponent = /** @class */ (function () {
    function ListItemComponent(route, httpClient) {
        this.route = route;
        this.id = 0;
        this._httpClient = httpClient;
    }
    ListItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get the query params
        this.route.queryParams.subscribe(function (params) {
            _this.id = params.id;
        });
        // get the item from the db
        var params = new http_1.HttpParams();
        params = params.append('id', this.id);
        this._httpClient.get(main_1.getBaseUrl() + 'api/lists/getListItem', { params: params }).subscribe(function (results) {
            _this.listItem = results;
        });
    };
    ListItemComponent = __decorate([
        core_1.Component({
            selector: 'app-list-item',
            templateUrl: './list-item.component.html',
            styleUrls: ['./list-item.component.css']
        })
    ], ListItemComponent);
    return ListItemComponent;
}());
exports.ListItemComponent = ListItemComponent;
//# sourceMappingURL=list-item.component.js.map