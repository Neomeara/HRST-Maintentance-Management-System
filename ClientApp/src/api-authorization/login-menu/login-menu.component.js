"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginMenuComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var LoginMenuComponent = /** @class */ (function () {
    function LoginMenuComponent(authorizeService) {
        this.authorizeService = authorizeService;
    }
    LoginMenuComponent.prototype.ngOnInit = function () {
        this.isAuthenticated = this.authorizeService.isAuthenticated();
        this.userName = this.authorizeService.getUser().pipe(operators_1.map(function (u) { return u && u.name; }));
    };
    LoginMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-login-menu',
            templateUrl: './login-menu.component.html',
            styleUrls: ['./login-menu.component.css']
        })
    ], LoginMenuComponent);
    return LoginMenuComponent;
}());
exports.LoginMenuComponent = LoginMenuComponent;
//# sourceMappingURL=login-menu.component.js.map