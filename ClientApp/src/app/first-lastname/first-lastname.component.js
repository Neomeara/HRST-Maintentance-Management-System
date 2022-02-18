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
exports.FirstLastnameComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var FirstLastnameComponent = /** @class */ (function () {
    function FirstLastnameComponent(Http, getBaseUrl) {
        this.Http_ = Http;
        this.baseurl_ = getBaseUrl;
    }
    FirstLastnameComponent.prototype.ngOnInit = function () {
        this.formdata = new forms_1.FormGroup({
            Email: new forms_1.FormControl(),
            UserName: new forms_1.FormControl(),
            FirstName: new forms_1.FormControl(),
            LastName: new forms_1.FormControl()
        });
    };
    FirstLastnameComponent.prototype.showSuccessAlert = function () {
        sweetalert2_1.default.fire('User Information Updated!', '', 'success');
    };
    FirstLastnameComponent.prototype.onClickSubmit = function (data) {
        var _this = this;
        this.Http_.put(this.baseurl_ + 'api/users/updateuser', data).subscribe(function (result) {
            _this.formresult = result;
            console.log(result);
        }, function (error) { return console.error(error); });
        this.showSuccessAlert();
    };
    FirstLastnameComponent = __decorate([
        core_2.Component({
            selector: 'app-first-lastname',
            templateUrl: './first-lastname.component.html',
            styleUrls: ['./first-lastname.component.css']
        }),
        __param(1, core_1.Inject('BASE_URL'))
    ], FirstLastnameComponent);
    return FirstLastnameComponent;
}());
exports.FirstLastnameComponent = FirstLastnameComponent;
//# sourceMappingURL=first-lastname.component.js.map