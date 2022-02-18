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
exports.UserEditComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var core_2 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var UserEditComponent = /** @class */ (function () {
    function UserEditComponent(Http, getBaseUrl, route) {
        this.route = route;
        this.userdata = {};
        this.formdata = new forms_1.FormGroup({
            Email: new forms_1.FormControl(),
            UserName: new forms_1.FormControl(),
            FirstName: new forms_1.FormControl(),
            LastName: new forms_1.FormControl()
        });
        this.id = "";
        this.Http_ = Http;
        this.baseurl_ = getBaseUrl;
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            console.log(params);
            _this.id = params.id;
            console.log(_this.id);
        });
        var params = new http_1.HttpParams();
        params = params.append('id', this.id);
        this.Http_.get(this.baseurl_ + 'api/users/edituser', { params: params }).subscribe(function (result) {
            _this.userdata = result;
            console.log(result);
            _this.formdata.setValue({ Email: _this.userdata.email, UserName: _this.userdata.userName, FirstName: _this.userdata.firstname, LastName: _this.userdata.lastname });
        }, function (error) { return console.error(error); });
    };
    UserEditComponent.prototype.showSuccessAlert = function () {
        sweetalert2_1.default.fire('User Information Updated', '', 'success');
    };
    UserEditComponent.prototype.onClickSubmit = function (data) {
        var _this = this;
        var params = new http_1.HttpParams();
        params = params.append('id', this.id);
        this.Http_.put(this.baseurl_ + 'api/users/updateuser2', data, { params: params }).subscribe(function (result) {
            _this.formresult = result;
            console.log(result);
        }, function (error) { return console.error(error); });
        this.showSuccessAlert();
    };
    UserEditComponent = __decorate([
        core_1.Component({
            selector: 'app-user-edit',
            templateUrl: './user-edit.component.html',
            styleUrls: ['./user-edit.component.css']
        }),
        __param(1, core_2.Inject('BASE_URL'))
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit.component.js.map