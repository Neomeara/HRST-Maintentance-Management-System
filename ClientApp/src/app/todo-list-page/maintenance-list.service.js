"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceListService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var main_1 = require("../../main");
var MaintenanceList_1 = require("../Models/MaintenanceList");
var MaintenanceListService = /** @class */ (function () {
    function MaintenanceListService(httpClient) {
        this._httpClient = httpClient;
    }
    MaintenanceListService.prototype.getLists = function () {
        return this._httpClient.get(main_1.getBaseUrl() + 'api/lists/getAllLists').pipe(function (lists) { return lists; });
    };
    MaintenanceListService.prototype.getGroups = function () {
        var groups = [];
        this.getLists().subscribe(function (data) { return groups = data.map(function (g) { return g.group; }); });
        return rxjs_1.of(groups);
    };
    MaintenanceListService.prototype.addList = function (groupName, title, ApplicationUser) {
        var list = MaintenanceList_1.newList(groupName, title, ApplicationUser);
        var result;
        this._httpClient.post(main_1.getBaseUrl() + 'api/lists/newlist', list).subscribe(function (data) {
            result = data;
        });
        return result;
    };
    MaintenanceListService.prototype.getList = function (id) {
        //http get to database
        var list;
        var params = new http_1.HttpParams();
        params = params.append('id', id);
        return this._httpClient.get(main_1.getBaseUrl() + 'api/lists/getList', { params: params });
    };
    MaintenanceListService.prototype.deleteList = function (id) {
        this._httpClient.delete(main_1.getBaseUrl() + '/api/list/deleteList', {}).subscribe(function (data) { return data; });
    };
    MaintenanceListService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MaintenanceListService);
    return MaintenanceListService;
}());
exports.MaintenanceListService = MaintenanceListService;
//# sourceMappingURL=maintenance-list.service.js.map