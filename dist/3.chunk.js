webpackJsonp([3],{

/***/ "../../../../../src/app/pages/poll/poll-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__poll_component__ = __webpack_require__("../../../../../src/app/pages/poll/poll.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PollRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var pollRoutes = [
    {
        path: "",
        component: __WEBPACK_IMPORTED_MODULE_2__poll_component__["a" /* PollComponent */]
    },
    { path: ":id", component: __WEBPACK_IMPORTED_MODULE_2__poll_component__["a" /* PollComponent */] }
];
var PollRoutingModule = (function () {
    function PollRoutingModule() {
    }
    return PollRoutingModule;
}());
PollRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(pollRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], PollRoutingModule);

//# sourceMappingURL=poll-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/pages/poll/poll.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading *ngIf=\"loading\">\n</app-loading>\n\n<ng-template [ngIf]=\"utils.isLoaded(loading)\">\n  <div class=\"container\">\n    <h1 class=\"text-center\">{{pageTitle}}</h1>\n  </div>\n  <ng-template [ngIf]=\"poll\">\n    <div class=\"container bg-faded\">\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"input-group\" *ngFor=\"let option of poll.options\">\n            <button class=\"btn btn-primary btn-lg btn-block\" type=\"button\" (click)=\"makeVote(option.title)\">Vote for {{option.title}}\n            </button>\n          </div>\n          <p>Note: You must be logged in to vote.</p>\n        </div>\n        <div class=\"col\">\n          <div style=\"display: block\">\n            <canvas baseChart [data]=\"pieChartData\" [labels]=\"pieChartLabels\" [chartType]=\"pieChartType\" (chartHover)=\"chartHovered($event)\"\n              (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n      <button class=\"btn btn-danger\" *ngIf=\"myPoll\" (click)=\"deletePoll()\">Delete Poll</button>\n    </div>\n  </ng-template>\n\n  <!-- Error loading poll -->\n  <div class=\"container\">\n    <p *ngIf=\"error\" class=\"alert alert-danger\">\n      <strong>Oops!</strong> {{errorMsg}}.\n    </p>\n  </div>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/pages/poll/poll.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  padding: 50px; }\n\n.btn {\n  margin-bottom: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/poll/poll.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_utils_service__ = __webpack_require__("../../../../../src/app/core/utils.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PollComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PollComponent = (function () {
    function PollComponent(route, auth, api, title, utils, router) {
        this.route = route;
        this.auth = auth;
        this.api = api;
        this.title = title;
        this.utils = utils;
        this.router = router;
        this.myPoll = false;
        // Pie
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.pieChartType = "pie";
    }
    PollComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Set poll Id from route params and subscribe
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            _this._getPoll();
        });
    };
    // events
    PollComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    PollComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    PollComponent.prototype._getPoll = function () {
        var _this = this;
        this.loading = true;
        this.pollSub = this.api.getPoll$(this.id).subscribe(function (res) {
            _this.poll = res;
            // console.log(res);
            _this.poll.options.forEach(function (option) {
                _this.pieChartLabels.push(option.title.toString());
                _this.pieChartData.push(option.count.toString());
            });
            _this._setPageTitle(_this.poll.title);
            if (_this.auth.userProfile) {
                if (_this.auth.userProfile.name === _this.poll.owner) {
                    _this.myPoll = true;
                }
            }
            _this.loading = false;
        }, function (err) {
            console.error(err);
            _this.loading = false;
            _this.error = true;
            _this.errorMsg = "There was an error retreiving this poll.";
            _this._setPageTitle("Poll Details");
        });
    };
    PollComponent.prototype.makeVote = function (option) {
        var _this = this;
        if (!this.auth.userProfile) {
            this.auth.login();
        }
        this.loading = true;
        this.submitVoteObj = {
            title: this.poll.title,
            option: option,
            voter: this.auth.userProfile.name
        };
        console.log(this.submitVoteObj);
        this.api.postVote$(this.poll._id, this.submitVoteObj).subscribe(function (res) {
            _this.poll = res;
            _this.poll.options.forEach(function (option) {
                for (var i = 0; i < _this.pieChartLabels.length; i++) {
                    if (_this.pieChartLabels[i] === option.title.toString()) {
                        _this.pieChartData[i] = option.count;
                    }
                }
            });
            _this._setPageTitle(_this.poll.title);
            _this.loading = false;
        }, function (err) {
            console.error(err);
            _this.loading = false;
            _this.error = true;
            _this.errorMsg = "You have already voted on this poll.";
            _this._setPageTitle("Poll Details");
        });
    };
    PollComponent.prototype.deletePoll = function () {
        var _this = this;
        this.api.deletePoll$(this.poll._id).subscribe(function (res) {
            console.log(res);
            _this.router.navigate(["/"]);
        }, function (error) { return console.error(error); });
    };
    PollComponent.prototype._setPageTitle = function (title) {
        this.pageTitle = title;
        this.title.setTitle(title);
    };
    PollComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
        this.pollSub.unsubscribe();
    };
    return PollComponent;
}());
PollComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "app-poll",
        template: __webpack_require__("../../../../../src/app/pages/poll/poll.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pages/poll/poll.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__core_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_api_service__["a" /* ApiService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* Title */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__core_utils_service__["a" /* UtilsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_utils_service__["a" /* UtilsService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _f || Object])
], PollComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=poll.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/poll/poll.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts__ = __webpack_require__("../../../../ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__poll_component__ = __webpack_require__("../../../../../src/app/pages/poll/poll.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__poll_routing_module__ = __webpack_require__("../../../../../src/app/pages/poll/poll-routing.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PollModule", function() { return PollModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var PollModule = (function () {
    function PollModule() {
    }
    return PollModule;
}());
PollModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_5__poll_routing_module__["a" /* PollRoutingModule */], __WEBPACK_IMPORTED_MODULE_2_ng2_charts__["ChartsModule"]],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__poll_component__["a" /* PollComponent */]]
    })
], PollModule);

//# sourceMappingURL=poll.module.js.map

/***/ })

});
//# sourceMappingURL=3.chunk.js.map