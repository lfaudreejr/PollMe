webpackJsonp([2],{

/***/ "../../../../../src/app/pages/profile/profile-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_component__ = __webpack_require__("../../../../../src/app/pages/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var profileRoutes = [
    { path: "", component: __WEBPACK_IMPORTED_MODULE_2__profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth_auth_guard__["a" /* AuthGuard */]] }
];
var ProfileRoutingModule = (function () {
    function ProfileRoutingModule() {
    }
    return ProfileRoutingModule;
}());
ProfileRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(profileRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], ProfileRoutingModule);

//# sourceMappingURL=profile-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/pages/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading *ngIf=\"loading\">\n</app-loading>\n\n<ng-template [ngIf]=\"auth.userProfile\">\n  <div class=\"container\" id=\"profile\">\n\n    <div class=\"row justify-content-center\">\n      <div class=\"col-sm-6 text-center\">\n        <div class=\"\">\n          <img class=\"img-fluid\" *ngIf=\"auth.userProfile.picture\" src=\"{{auth.userProfile.picture}}\" alt=\"profile image\">\n        </div>\n        <div class=\"\">\n          <h4 class=\"\" *ngIf=\"auth.userProfile.name\">{{auth.userProfile.name}}</h4>\n          <p class=\"\" *ngIf=\"auth.userProfile.nickname\">{{auth.userProfile.nickname}}</p>\n          <p class=\"\" *ngIf=\"auth.userProfile.updated_at\"><small class=\"text-muted\">Last updated: {{auth.userProfile.updated_at | date}}</small></p>\n        </div>\n      </div>\n      <div class=\"col-sm-6\">\n        <ng-template [ngIf]=\"utils.isLoaded(loading)\">\n          <ng-template [ngIf]=\"userPolls\">\n            <ng-template [ngIf]=\"userPolls.length\">\n              <h3 class=\"text-center\">Your Current Polls:</h3>\n\n              <!-- Poll Listing -->\n              <div class=\"container\">\n                <section class=\"list-group\">\n                  <a *ngFor=\"let poll of userPolls\" [routerLink]=\"['/poll', poll._id]\" class=\"list-group-item list-group-item-action flex-column align-items-start\">\n                    <div class=\"d-flex w-100 justify-content-between\">\n                      <h5 class=\"mb-1\" [innerHTML]=\"poll.title\"></h5>\n                    </div>\n                  </a>\n                </section>\n              </div>\n\n            </ng-template>\n            <!-- No Polls available -->\n            <div class=\"container\">\n              <p *ngIf=\"!userPolls.length\" class=\"alert alert-info\">\n                No polls available.\n              </p>\n            </div>\n          </ng-template>\n          <!-- Error Loading Events -->\n          <div class=\"container\">\n            <p *ngIf=\"error\" class=\"alert alert-danger\">\n              <strong>Oops!</strong> {{errorMsg}}\n            </p>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </div>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/pages/profile/profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#profile {\n  margin: 50px auto 50px auto; }\n\nimg {\n  margin-bottom: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_utils_service__ = __webpack_require__("../../../../../src/app/core/utils.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileComponent = (function () {
    function ProfileComponent(auth, api, utils, title) {
        this.auth = auth;
        this.api = api;
        this.utils = utils;
        this.title = title;
        this.pageTitle = "Profile";
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.title.setTitle(this.pageTitle);
        this.getUserPolls();
    };
    ProfileComponent.prototype.getUserPolls = function () {
        var _this = this;
        this.loading = true;
        this.api.getUserPolls$(this.auth.userProfile.name).subscribe(function (res) {
            _this.userPolls = res;
            _this.loading = false;
        }, function (err) {
            console.error(err);
            _this.loading = false;
            _this.error = true;
            _this.errorMsg = "There was an error retreiving user polls.";
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "app-profile",
        template: __webpack_require__("../../../../../src/app/pages/profile/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pages/profile/profile.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__core_utils_service__["a" /* UtilsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_utils_service__["a" /* UtilsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === "function" && _d || Object])
], ProfileComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/profile/profile.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_component__ = __webpack_require__("../../../../../src/app/pages/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_routing_module__ = __webpack_require__("../../../../../src/app/pages/profile/profile-routing.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ProfileModule = (function () {
    function ProfileModule() {
    }
    return ProfileModule;
}());
ProfileModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_4__profile_routing_module__["a" /* ProfileRoutingModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__profile_component__["a" /* ProfileComponent */]]
    })
], ProfileModule);

//# sourceMappingURL=profile.module.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map