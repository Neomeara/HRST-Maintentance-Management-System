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
exports.AuthorizeService = exports.AuthenticationResultStatus = void 0;
var core_1 = require("@angular/core");
var oidc_client_1 = require("oidc-client");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var api_authorization_constants_1 = require("./api-authorization.constants");
var AuthenticationResultStatus;
(function (AuthenticationResultStatus) {
    AuthenticationResultStatus[AuthenticationResultStatus["Success"] = 0] = "Success";
    AuthenticationResultStatus[AuthenticationResultStatus["Redirect"] = 1] = "Redirect";
    AuthenticationResultStatus[AuthenticationResultStatus["Fail"] = 2] = "Fail";
})(AuthenticationResultStatus = exports.AuthenticationResultStatus || (exports.AuthenticationResultStatus = {}));
var AuthorizeService = /** @class */ (function () {
    function AuthorizeService() {
        // By default pop ups are disabled because they don't work properly on Edge.
        // If you want to enable pop up authentication simply set this flag to false.
        this.popUpDisabled = true;
        this.userSubject = new rxjs_1.BehaviorSubject(null);
    }
    AuthorizeService.prototype.isAuthenticated = function () {
        return this.getUser().pipe(operators_1.map(function (u) { return !!u; }));
    };
    AuthorizeService.prototype.getUser = function () {
        var _this = this;
        return rxjs_1.concat(this.userSubject.pipe(operators_1.take(1), operators_1.filter(function (u) { return !!u; })), this.getUserFromStorage().pipe(operators_1.filter(function (u) { return !!u; }), operators_1.tap(function (u) { return _this.userSubject.next(u); })), this.userSubject.asObservable());
    };
    AuthorizeService.prototype.getAccessToken = function () {
        var _this = this;
        return rxjs_1.from(this.ensureUserManagerInitialized())
            .pipe(operators_1.mergeMap(function () { return rxjs_1.from(_this.userManager.getUser()); }), operators_1.map(function (user) { return user && user.access_token; }));
    };
    // We try to authenticate the user in three different ways:
    // 1) We try to see if we can authenticate the user silently. This happens
    //    when the user is already logged in on the IdP and is done using a hidden iframe
    //    on the client.
    // 2) We try to authenticate the user using a PopUp Window. This might fail if there is a
    //    Pop-Up blocker or the user has disabled PopUps.
    // 3) If the two methods above fail, we redirect the browser to the IdP to perform a traditional
    //    redirect flow.
    AuthorizeService.prototype.signIn = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var user, silentError_1, popupError_1, redirectError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureUserManagerInitialized()];
                    case 1:
                        _a.sent();
                        user = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 13]);
                        return [4 /*yield*/, this.userManager.signinSilent(this.createArguments())];
                    case 3:
                        user = _a.sent();
                        this.userSubject.next(user.profile);
                        return [2 /*return*/, this.success(state)];
                    case 4:
                        silentError_1 = _a.sent();
                        // User might not be authenticated, fallback to popup authentication
                        console.log('Silent authentication error: ', silentError_1);
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 12]);
                        if (this.popUpDisabled) {
                            throw new Error('Popup disabled. Change \'authorize.service.ts:AuthorizeService.popupDisabled\' to false to enable it.');
                        }
                        return [4 /*yield*/, this.userManager.signinPopup(this.createArguments())];
                    case 6:
                        user = _a.sent();
                        this.userSubject.next(user.profile);
                        return [2 /*return*/, this.success(state)];
                    case 7:
                        popupError_1 = _a.sent();
                        if (popupError_1.message === 'Popup window closed') {
                            // The user explicitly cancelled the login action by closing an opened popup.
                            return [2 /*return*/, this.error('The user closed the window.')];
                        }
                        else if (!this.popUpDisabled) {
                            console.log('Popup authentication error: ', popupError_1);
                        }
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, this.userManager.signinRedirect(this.createArguments(state))];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, this.redirect()];
                    case 10:
                        redirectError_1 = _a.sent();
                        console.log('Redirect authentication error: ', redirectError_1);
                        return [2 /*return*/, this.error(redirectError_1)];
                    case 11: return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    AuthorizeService.prototype.completeSignIn = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.ensureUserManagerInitialized()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userManager.signinCallback(url)];
                    case 2:
                        user = _a.sent();
                        this.userSubject.next(user && user.profile);
                        return [2 /*return*/, this.success(user && user.state)];
                    case 3:
                        error_1 = _a.sent();
                        console.log('There was an error signing in: ', error_1);
                        return [2 /*return*/, this.error('There was an error signing in.')];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthorizeService.prototype.signOut = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var popupSignOutError_1, redirectSignOutError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 8]);
                        if (this.popUpDisabled) {
                            throw new Error('Popup disabled. Change \'authorize.service.ts:AuthorizeService.popupDisabled\' to false to enable it.');
                        }
                        return [4 /*yield*/, this.ensureUserManagerInitialized()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userManager.signoutPopup(this.createArguments())];
                    case 2:
                        _a.sent();
                        this.userSubject.next(null);
                        return [2 /*return*/, this.success(state)];
                    case 3:
                        popupSignOutError_1 = _a.sent();
                        console.log('Popup signout error: ', popupSignOutError_1);
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.userManager.signoutRedirect(this.createArguments(state))];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, this.redirect()];
                    case 6:
                        redirectSignOutError_1 = _a.sent();
                        console.log('Redirect signout error: ', redirectSignOutError_1);
                        return [2 /*return*/, this.error(redirectSignOutError_1)];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AuthorizeService.prototype.completeSignOut = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureUserManagerInitialized()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.userManager.signoutCallback(url)];
                    case 3:
                        response = _a.sent();
                        this.userSubject.next(null);
                        return [2 /*return*/, this.success(response && response.state)];
                    case 4:
                        error_2 = _a.sent();
                        console.log("There was an error trying to log out '" + error_2 + "'.");
                        return [2 /*return*/, this.error(error_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthorizeService.prototype.createArguments = function (state) {
        return { useReplaceToNavigate: true, data: state };
    };
    AuthorizeService.prototype.error = function (message) {
        return { status: AuthenticationResultStatus.Fail, message: message };
    };
    AuthorizeService.prototype.success = function (state) {
        return { status: AuthenticationResultStatus.Success, state: state };
    };
    AuthorizeService.prototype.redirect = function () {
        return { status: AuthenticationResultStatus.Redirect };
    };
    AuthorizeService.prototype.ensureUserManagerInitialized = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, settings;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.userManager !== undefined) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fetch(api_authorization_constants_1.ApplicationPaths.ApiAuthorizationClientConfigurationUrl)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Could not load settings for '" + api_authorization_constants_1.ApplicationName + "'");
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        settings = _a.sent();
                        settings.automaticSilentRenew = true;
                        settings.includeIdTokenInSilentRenew = true;
                        this.userManager = new oidc_client_1.UserManager(settings);
                        this.userManager.events.addUserSignedOut(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.userManager.removeUser()];
                                    case 1:
                                        _a.sent();
                                        this.userSubject.next(null);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthorizeService.prototype.getUserFromStorage = function () {
        var _this = this;
        return rxjs_1.from(this.ensureUserManagerInitialized())
            .pipe(operators_1.mergeMap(function () { return _this.userManager.getUser(); }), operators_1.map(function (u) { return u && u.profile; }));
    };
    AuthorizeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthorizeService);
    return AuthorizeService;
}());
exports.AuthorizeService = AuthorizeService;
//# sourceMappingURL=authorize.service.js.map