"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutComponent = void 0;
var core_1 = require("@angular/core");
var authorize_service_1 = require("../authorize.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var api_authorization_constants_1 = require("../api-authorization.constants");
// The main responsibility of this component is to handle the user's logout process.
// This is the starting point for the logout process, which is usually initiated when a
// user clicks on the logout button on the LoginMenu component.
var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(authorizeService, activatedRoute, router) {
        this.authorizeService = authorizeService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.message = new rxjs_1.BehaviorSubject(null);
    }
    LogoutComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        action = this.activatedRoute.snapshot.url[1];
                        _a = action.path;
                        switch (_a) {
                            case api_authorization_constants_1.LogoutActions.Logout: return [3 /*break*/, 1];
                            case api_authorization_constants_1.LogoutActions.LogoutCallback: return [3 /*break*/, 5];
                            case api_authorization_constants_1.LogoutActions.LoggedOut: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 8];
                    case 1:
                        if (!!!window.history.state.local) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.logout(this.getReturnUrl())];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        // This prevents regular links to <app>/authentication/logout from triggering a logout
                        this.message.next('The logout was not initiated from within the page.');
                        _b.label = 4;
                    case 4: return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, this.processLogoutCallback()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        this.message.next('You successfully logged out!');
                        return [3 /*break*/, 9];
                    case 8: throw new Error("Invalid action '" + action + "'");
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    LogoutComponent.prototype.logout = function (returnUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var state, isauthenticated, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        state = { returnUrl: returnUrl };
                        return [4 /*yield*/, this.authorizeService.isAuthenticated().pipe(operators_1.take(1)).toPromise()];
                    case 1:
                        isauthenticated = _b.sent();
                        if (!isauthenticated) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.authorizeService.signOut(state)];
                    case 2:
                        result = _b.sent();
                        _a = result.status;
                        switch (_a) {
                            case authorize_service_1.AuthenticationResultStatus.Redirect: return [3 /*break*/, 3];
                            case authorize_service_1.AuthenticationResultStatus.Success: return [3 /*break*/, 4];
                            case authorize_service_1.AuthenticationResultStatus.Fail: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, this.navigateToReturnUrl(returnUrl)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        this.message.next(result.message);
                        return [3 /*break*/, 8];
                    case 7: throw new Error('Invalid authentication result status.');
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        this.message.next('You successfully logged out!');
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    LogoutComponent.prototype.processLogoutCallback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = window.location.href;
                        return [4 /*yield*/, this.authorizeService.completeSignOut(url)];
                    case 1:
                        result = _b.sent();
                        _a = result.status;
                        switch (_a) {
                            case authorize_service_1.AuthenticationResultStatus.Redirect: return [3 /*break*/, 2];
                            case authorize_service_1.AuthenticationResultStatus.Success: return [3 /*break*/, 3];
                            case authorize_service_1.AuthenticationResultStatus.Fail: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 6];
                    case 2: 
                    // There should not be any redirects as the only time completeAuthentication finishes
                    // is when we are doing a redirect sign in flow.
                    throw new Error('Should not redirect.');
                    case 3: return [4 /*yield*/, this.navigateToReturnUrl(this.getReturnUrl(result.state))];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        this.message.next(result.message);
                        return [3 /*break*/, 7];
                    case 6: throw new Error('Invalid authentication result status.');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    LogoutComponent.prototype.navigateToReturnUrl = function (returnUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.router.navigateByUrl(returnUrl, {
                            replaceUrl: true
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LogoutComponent.prototype.getReturnUrl = function (state) {
        var fromQuery = this.activatedRoute.snapshot.queryParams.returnUrl;
        // If the url is coming from the query string, check that is either
        // a relative url or an absolute url
        if (fromQuery &&
            !(fromQuery.startsWith(window.location.origin + "/") ||
                /\/[^\/].*/.test(fromQuery))) {
            // This is an extra check to prevent open redirects.
            throw new Error('Invalid return url. The return url needs to have the same origin as the current page.');
        }
        return (state && state.returnUrl) ||
            fromQuery ||
            api_authorization_constants_1.ApplicationPaths.LoggedOut;
    };
    LogoutComponent = __decorate([
        core_1.Component({
            selector: 'app-logout',
            templateUrl: './logout.component.html',
            styleUrls: ['./logout.component.css']
        })
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map