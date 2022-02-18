"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeInterceptor = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var AuthorizeInterceptor = /** @class */ (function () {
    function AuthorizeInterceptor(authorize) {
        this.authorize = authorize;
    }
    AuthorizeInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return this.authorize.getAccessToken()
            .pipe(operators_1.mergeMap(function (token) { return _this.processRequestWithToken(token, req, next); }));
    };
    // Checks if there is an access_token available in the authorize service
    // and adds it to the request in case it's targeted at the same origin as the
    // single page application.
    AuthorizeInterceptor.prototype.processRequestWithToken = function (token, req, next) {
        if (!!token && this.isSameOriginUrl(req)) {
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + token
                }
            });
        }
        return next.handle(req);
    };
    AuthorizeInterceptor.prototype.isSameOriginUrl = function (req) {
        // It's an absolute url with the same origin.
        if (req.url.startsWith(window.location.origin + "/")) {
            return true;
        }
        // It's a protocol relative url with the same origin.
        // For example: //www.example.com/api/Products
        if (req.url.startsWith("//" + window.location.host + "/")) {
            return true;
        }
        // It's a relative url like /api/Products
        if (/^\/[^\/].*/.test(req.url)) {
            return true;
        }
        // It's an absolute or protocol relative url that
        // doesn't have the same origin.
        return false;
    };
    AuthorizeInterceptor = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthorizeInterceptor);
    return AuthorizeInterceptor;
}());
exports.AuthorizeInterceptor = AuthorizeInterceptor;
//# sourceMappingURL=authorize.interceptor.js.map