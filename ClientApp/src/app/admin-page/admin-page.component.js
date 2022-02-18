"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPageComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var AdminPageComponent = /** @class */ (function () {
    function AdminPageComponent(Http, getBaseUrl, router) {
        var _this = this;
        this.router = router;
        this.users = [];
        this.displayedColumns = ['username', 'firstname', 'lastname', 'company'];
        this.dataSource = this.users;
        Http.get(getBaseUrl + 'api/users/userinfo').subscribe(function (result) {
            _this.users = result;
        }, function (error) { return console.error(error); });
    }
    AdminPageComponent.prototype.ngOnInit = function () {
    };
    AdminPageComponent.prototype.test = function (user) {
        console.log("This works");
        var route = '/user-edit';
        this.router.navigate([route], { queryParams: { id: user.id } });
    };
    AdminPageComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-page',
            templateUrl: './admin-page.component.html',
            styleUrls: ['./admin-page.component.css']
        }),
        __param(1, core_2.Inject('BASE_URL'))
    ], AdminPageComponent);
    return AdminPageComponent;
}());
exports.AdminPageComponent = AdminPageComponent;
//# sourceMappingURL=admin-page.component.js.map