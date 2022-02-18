"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeGuard = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var api_authorization_constants_1 = require("./api-authorization.constants");
var AuthorizeGuard = /** @class */ (function () {
    function AuthorizeGuard(authorize, router) {
        this.authorize = authorize;
        this.router = router;
    }
    AuthorizeGuard.prototype.canActivate = function (_next, state) {
        var _this = this;
        return this.authorize.isAuthenticated()
            .pipe(operators_1.tap(function (isAuthenticated) { return _this.handleAuthorization(isAuthenticated, state); }));
    };
    AuthorizeGuard.prototype.handleAuthorization = function (isAuthenticated, state) {
        var _a;
        if (!isAuthenticated) {
            this.router.navigate(api_authorization_constants_1.ApplicationPaths.LoginPathComponents, {
                queryParams: (_a = {},
                    _a[api_authorization_constants_1.QueryParameterNames.ReturnUrl] = state.url,
                    _a)
            });
        }
    };
    AuthorizeGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthorizeGuard);
    return AuthorizeGuard;
}());
exports.AuthorizeGuard = AuthorizeGuard;
//# sourceMappingURL=authorize.guard.js.map