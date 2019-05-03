(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./views/dashboard/dashboard.module": [
		"./src/app/views/dashboard/dashboard.module.ts",
		"views-dashboard-dashboard-module"
	],
	"./views/home/home.module": [
		"./src/app/views/home/home.module.ts",
		"views-home-home-module"
	],
	"./views/task/task.module": [
		"./src/app/views/task/task.module.ts",
		"views-task-task-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [
    {
        path: "",
        loadChildren: "./views/home/home.module#HomeModule"
    },
    {
        path: "home",
        loadChildren: "./views/home/home.module#HomeModule"
    },
    {
        path: "dashboard",
        loadChildren: "./views/dashboard/dashboard.module#DashboardModule"
    },
    {
        path: "task",
        loadChildren: "./views/task/task.module#TaskModule"
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { useHash: true })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-layout></app-layout>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = "Seisewa Web";
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-root",
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _ui_ui_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/ui.module */ "./src/app/ui/ui.module.ts");







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"], _ui_ui_module__WEBPACK_IMPORTED_MODULE_6__["UiModule"]],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/ui/footer/footer-template/footer-template.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/ui/footer/footer-template/footer-template.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer pb-4\">\r\n  <div class=\"d-flex flex-row justify-content-lg-around justify-content-sm-center flex-wrap mt-5\">\r\n    <div class=\"applogo\">\r\n      <img src=\"assets/images/footer_logo.jpg\" class=\"img-responsive\">\r\n    </div>\r\n    <div>\r\n      <nav class=\"navbar navbar-expand-lg navbar-light\">\r\n        <ul class=\"navbar-nav d-flex flex-row flex-wrap justify-content-around\">\r\n          <li><a class=\"nav-item nav-link ml-2\" href=\"#\"\r\n              i18n=\"Terms & Conditions | first menu in the footer menu@@footerMenuTermsAndConditions\">Terms &\r\n              Conditions</a></li>\r\n          <li><a class=\"nav-item nav-link ml-2\" href=\"#\"\r\n              i18n=\"Site Index | second menu in the footer menu@@footerMenuSiteIndex\">Site Index</a></li>\r\n          <li><a class=\"nav-item nav-link ml-2\" href=\"#\"\r\n              i18n=\"Links | third menu in the footer menu@@footerMenuLinks\">Links</a></li>\r\n          <li><a class=\"nav-item nav-link ml-2\" href=\"#\" i18n=\"FAQ | fourth menu in the footer menu@@footerFAQ\">FAQ</a>\r\n          </li>\r\n          <li><a class=\"nav-item nav-link ml-2\" href=\"#\"\r\n              i18n=\"Web Support | fifth menu in the footer menu@@footerMenuWebSupport\">Web Support</a></li>\r\n          <li><a class=\"nav-item nav-link ml-2\" href=\"#\"\r\n              i18n=\"Contact Us | sixth menu in the footer menu@@footerMenuContactUs\">Contact Us</a></li>\r\n        </ul>\r\n      </nav>\r\n    </div>\r\n  </div>\r\n</footer>\r\n"

/***/ }),

/***/ "./src/app/ui/footer/footer-template/footer-template.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/ui/footer/footer-template/footer-template.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\n  width: 100%;\n  display: block;\n  background: #fff;\n  box-shadow: 0 0 30px 30px #fff; }\n  .footer .navbar-nav a {\n    font-family: 'Open Sans';\n    font-size: 16px;\n    color: #3b474f; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tdXJwaGV1eC9Xb3Jrc3BhY2UvcHJvamVjdHMvcXRhc2tyL3dlYi9zcmMvYXBwL3VpL2Zvb3Rlci9mb290ZXItdGVtcGxhdGUvZm9vdGVyLXRlbXBsYXRlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBRUksV0FBVztFQUNYLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsOEJBQThCLEVBQUE7RUFMbEM7SUFRUSx3QkFBd0I7SUFDeEIsZUFBZTtJQUNmLGNBQWMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3VpL2Zvb3Rlci9mb290ZXItdGVtcGxhdGUvZm9vdGVyLXRlbXBsYXRlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGZvbnQtc3RhY2s6ICAnRGluIFJlZ3VsYXInO1xyXG5cclxuLmZvb3RlclxyXG57XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGJveC1zaGFkb3c6IDAgMCAzMHB4IDMwcHggI2ZmZjtcclxuICAgIC5uYXZiYXItbmF2IGFcclxuICAgIHtcclxuICAgICAgICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIGNvbG9yOiAjM2I0NzRmO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/ui/footer/footer-template/footer-template.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/ui/footer/footer-template/footer-template.component.ts ***!
  \************************************************************************/
/*! exports provided: FooterTemplateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterTemplateComponent", function() { return FooterTemplateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FooterTemplateComponent = /** @class */ (function () {
    function FooterTemplateComponent() {
    }
    FooterTemplateComponent.prototype.ngOnInit = function () {
    };
    FooterTemplateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer-template',
            template: __webpack_require__(/*! ./footer-template.component.html */ "./src/app/ui/footer/footer-template/footer-template.component.html"),
            styles: [__webpack_require__(/*! ./footer-template.component.scss */ "./src/app/ui/footer/footer-template/footer-template.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FooterTemplateComponent);
    return FooterTemplateComponent;
}());



/***/ }),

/***/ "./src/app/ui/footer/footer.module.ts":
/*!********************************************!*\
  !*** ./src/app/ui/footer/footer.module.ts ***!
  \********************************************/
/*! exports provided: FooterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterModule", function() { return FooterModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _footer_template_footer_template_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer-template/footer-template.component */ "./src/app/ui/footer/footer-template/footer-template.component.ts");




var FooterModule = /** @class */ (function () {
    function FooterModule() {
    }
    FooterModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            declarations: [_footer_template_footer_template_component__WEBPACK_IMPORTED_MODULE_3__["FooterTemplateComponent"]],
            exports: [_footer_template_footer_template_component__WEBPACK_IMPORTED_MODULE_3__["FooterTemplateComponent"]]
        })
    ], FooterModule);
    return FooterModule;
}());



/***/ }),

/***/ "./src/app/ui/footer/index.ts":
/*!************************************!*\
  !*** ./src/app/ui/footer/index.ts ***!
  \************************************/
/*! exports provided: FooterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _footer_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.module */ "./src/app/ui/footer/footer.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FooterModule", function() { return _footer_module__WEBPACK_IMPORTED_MODULE_0__["FooterModule"]; });




/***/ }),

/***/ "./src/app/ui/header/header-template/header-template.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/ui/header/header-template/header-template.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <div class=\"d-flex flex-row flex-wrap justify-content-around\">\r\n    <div>\r\n      <a class=\"applogo\" href=\"/\">\r\n        <img src=\"assets/images/app_logo.jpg\" class=\"img-fluid\">\r\n      </a>\r\n    </div>\r\n    <div class=\"d-flex flex-row sign-in-partial\">\r\n      <div>\r\n        <img src=\"assets/images/def_avatar.jpg\" class=\"mt-1\">\r\n      </div>\r\n      <div class=\"dropdown pt-2 ml-1\">\r\n        <!-- if logged in\r\n                <a class=\"nav-link btn dropdown-toggle\" data-toggle=\"dropdown\" [routerLink]=\"['./user/login']\"  i18n=\"@@signIn\">Sign in</a>\r\n              <div class=\"dropdown-menu\">\r\n                  <a class=\"dropdown-item\" href=\"#\" i18n=\"@@userSubMenu1\"\">Link 1</a>\r\n                  <a class=\"dropdown-item\" href=\"#\" i18n=\"@@userSubMenu2\"\">Link 2</a>\r\n                  <a class=\"dropdown-item\" href=\"#\" i18n=\"@@userSubMenu3\"\">Link 3</a>\r\n              </div>\r\n            -->\r\n        <a class=\"nav-link btn\" [routerLink]=\"['./user/login']\"\r\n          i18n=\"Sign In | user sign in button on the top navbar@@signIn\">Sign\r\n          in</a>\r\n      </div>\r\n    </div>\r\n    <div class=\"language-bar\">\r\n      <ul>\r\n        <li><a href=\"#\" [ngClass]=\"{selected: selectedLanguage === 'en'}\" (click)=\"changeLang('en')\"><span>En</span></a>\r\n          | </li>\r\n        <li><a href=\"#\" [ngClass]=\"{selected: selectedLanguage === 'fr'}\" (click)=\"changeLang('fr')\"><span>Fr</span></a>\r\n          | </li>\r\n        <li><a href=\"#\" [ngClass]=\"{selected: selectedLanguage === 'es'}\"\r\n            (click)=\"changeLang('es')\"><span>Esp</span></a></li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"d-flex flex-row justify-content-around p-2 m-2\">\r\n    <div>\r\n      <nav class=\"navbar top-nav navbar-expand-lg navbar-light\">\r\n        <ul class=\"navbar-nav d-flex flex-row flex-wrap justify-content-center\">\r\n          <li class=\"nav-item p-3\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\r\n            <a class=\"nav-link\" [routerLink]=\"['./home']\"\r\n              i18n=\"Home | first menu in the main menu@@mainMenuHome\">Home</a>\r\n          </li>\r\n          <li class=\"nav-item p-3\">\r\n            <a class=\"nav-link\" [routerLink]=\"['./task']\"\r\n              i18n=\"Task | third menu in the main menu @@mainMenuTask\">Task</a>\r\n          </li>\r\n          <li class=\"nav-item p-3\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\r\n            <a class=\"nav-link\" [routerLink]=\"['./dashboard']\"\r\n              i18n=\"Dashboard | second menu in the main menu@@mainMenuDashboard\">Dashboard</a>\r\n          </li>\r\n          <li class=\"nav-item p-3\" routerLinkActive=\"active\">\r\n            <a class=\"nav-link\" [routerLink]=\"['./entities']\">About</a>\r\n          </li>\r\n          <li class=\"nav-item p-3\">\r\n            <a class=\"nav-link\" [routerLink]=\"['./stakeholders']\">Privacy</a>\r\n          </li>\r\n        </ul>\r\n      </nav>\r\n    </div>\r\n  </div>\r\n\r\n</header>\r\n"

/***/ }),

/***/ "./src/app/ui/header/header-template/header-template.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/ui/header/header-template/header-template.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "header .sign-in-partial img {\n  height: 50px;\n  width: 50px;\n  border-radius: 60px;\n  border: #62778E solid 2px; }\n\nheader .sign-in-partial .dropdown button {\n  width: 110px;\n  height: 40px;\n  background: #1c81c3;\n  border-radius: 110px;\n  color: #fff; }\n\nheader .sign-in-partial .dropdown button:active {\n    outline: none !important;\n    box-shadow: none; }\n\nheader .sign-in-partial .dropdown button:focus {\n    outline: none !important;\n    box-shadow: none; }\n\nheader .top-nav ul.navbar-nav {\n  font-family: 'Open Sans';\n  font-size: 18px;\n  text-transform: uppercase; }\n\nheader .top-nav ul.navbar-nav li.active {\n    color: #1c81c3 !important;\n    border-bottom: solid 5px #1c81c3 !important; }\n\nheader .top-nav ul.navbar-nav li.active a.nav-link {\n      color: #1c81c3 !important; }\n\nheader .top-nav ul.navbar-nav li a {\n    font-weight: bold; }\n\nheader .language-bar ul {\n  padding: 5px;\n  margin: 10px 0;\n  list-style: none;\n  float: left; }\n\nheader .language-bar ul li {\n    float: left;\n    display: inline;\n    /*For ignore double margin in IE6*/\n    margin: 0 10px; }\n\nheader .language-bar ul li a {\n      text-decoration: none;\n      float: left;\n      color: #999;\n      cursor: pointer;\n      font: 900 14px/22px \"Arial\", Helvetica, sans-serif; }\n\nheader .language-bar ul li a span {\n        margin: 0 5px 0 -15px;\n        padding: 1px 2px 5px 9px;\n        position: relative;\n        /*To fix IE6 problem (not displaying)*/\n        float: left; }\n\nheader .language-bar ul li a.selected {\n        color: #1c81c3; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tdXJwaGV1eC9Xb3Jrc3BhY2UvcHJvamVjdHMvcXRhc2tyL3dlYi9zcmMvYXBwL3VpL2hlYWRlci9oZWFkZXItdGVtcGxhdGUvaGVhZGVyLXRlbXBsYXRlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBTVksWUFBWTtFQUNaLFdBQVc7RUFDWCxtQkFBa0I7RUFDbEIseUJBQXlCLEVBQUE7O0FBVHJDO0VBZ0JnQixZQUFZO0VBQ1osWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsV0FBVSxFQUFBOztBQXBCMUI7SUF1Qm9CLHdCQUF3QjtJQUNwQixnQkFBZ0IsRUFBQTs7QUF4QnhDO0lBNEJvQix3QkFBd0I7SUFDeEIsZ0JBQWdCLEVBQUE7O0FBN0JwQztFQXNDVSx3QkFBd0I7RUFDeEIsZUFBZTtFQUNmLHlCQUF5QixFQUFBOztBQXhDbkM7SUE4Q2MseUJBQXdCO0lBQ3hCLDJDQUEwQyxFQUFBOztBQS9DeEQ7TUFrRGdCLHlCQUF3QixFQUFBOztBQWxEeEM7SUFzRGMsaUJBQWlCLEVBQUE7O0FBdEQvQjtFQTZETSxZQUFZO0VBQ1osY0FBYztFQUNkLGdCQUFnQjtFQUNoQixXQUFXLEVBQUE7O0FBaEVqQjtJQWtFUSxXQUFXO0lBQ1gsZUFBZTtJQUFFLGtDQUFBO0lBQ2pCLGNBQWMsRUFBQTs7QUFwRXRCO01Bc0VVLHFCQUFxQjtNQUNyQixXQUFVO01BQ1YsV0FBVztNQUNYLGVBQWU7TUFDZixrREFBa0QsRUFBQTs7QUExRTVEO1FBNEVZLHFCQUFxQjtRQUNyQix3QkFBd0I7UUFDeEIsa0JBQWtCO1FBQUUsc0NBQUE7UUFDcEIsV0FBVSxFQUFBOztBQS9FdEI7UUFrRlUsY0FBYSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvdWkvaGVhZGVyL2hlYWRlci10ZW1wbGF0ZS9oZWFkZXItdGVtcGxhdGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaGVhZGVyXHJcbntcclxuICAgIC5zaWduLWluLXBhcnRpYWxcclxuICAgIHtcclxuICAgICAgICBpbWdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcclxuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6NjBweDtcclxuICAgICAgICAgICAgYm9yZGVyOiAjNjI3NzhFIHNvbGlkIDJweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmRyb3Bkb3duXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgYnV0dG9uXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBweDtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMxYzgxYzM7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMTBweDtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiNmZmY7XHJcbiAgICAgICAgICAgICAgICAmOmFjdGl2ZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICY6Zm9jdXNcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC50b3AtbmF2XHJcbiAgICB7XHJcbiAgICAgIHVsLm5hdmJhci1uYXZcclxuICAgICAge1xyXG4gICAgICAgICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnO1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuXHJcbiAgICAgICAgICBsaVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAmLmFjdGl2ZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICMxYzgxYzMhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDVweCAjMWM4MWMzIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICBhLm5hdi1saW5rXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICMxYzgxYzMhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhIHtcclxuICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfVxyXG4gIC5sYW5ndWFnZS1iYXJ7XHJcbiAgICB1bCB7XHJcbiAgICAgIHBhZGRpbmc6IDVweDtcclxuICAgICAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICBsaSB7XHJcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lOyAvKkZvciBpZ25vcmUgZG91YmxlIG1hcmdpbiBpbiBJRTYqL1xyXG4gICAgICAgIG1hcmdpbjogMCAxMHB4O1xyXG4gICAgICAgIGEge1xyXG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICAgIGNvbG9yOiAjOTk5O1xyXG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgZm9udDogOTAwIDE0cHgvMjJweCBcIkFyaWFsXCIsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxuICAgICAgICAgIHNwYW4ge1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgNXB4IDAgLTE1cHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDFweCAycHggNXB4IDlweDtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyAvKlRvIGZpeCBJRTYgcHJvYmxlbSAobm90IGRpc3BsYXlpbmcpKi9cclxuICAgICAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgJi5zZWxlY3RlZHtcclxuICAgICAgICAgIGNvbG9yOiMxYzgxYzM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/ui/header/header-template/header-template.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/ui/header/header-template/header-template.component.ts ***!
  \************************************************************************/
/*! exports provided: HeaderTemplateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderTemplateComponent", function() { return HeaderTemplateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HeaderTemplateComponent = /** @class */ (function () {
    function HeaderTemplateComponent() {
        this.selectedLanguage = "en";
    }
    HeaderTemplateComponent.prototype.ngOnInit = function () {
        this.selectedLanguage = localStorage.getItem("locale");
    };
    HeaderTemplateComponent.prototype.changeLang = function (lang) {
        if (lang === localStorage.getItem("locale")) {
            return;
        }
        if (lang === "en") {
            localStorage.setItem("locale", "en");
        }
        else if (lang === "fr") {
            localStorage.setItem("locale", "fr");
        }
        else {
            localStorage.setItem("locale", "es");
        }
        window.location.reload();
    };
    HeaderTemplateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-header-template",
            template: __webpack_require__(/*! ./header-template.component.html */ "./src/app/ui/header/header-template/header-template.component.html"),
            styles: [__webpack_require__(/*! ./header-template.component.scss */ "./src/app/ui/header/header-template/header-template.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HeaderTemplateComponent);
    return HeaderTemplateComponent;
}());



/***/ }),

/***/ "./src/app/ui/header/header.module.ts":
/*!********************************************!*\
  !*** ./src/app/ui/header/header.module.ts ***!
  \********************************************/
/*! exports provided: HeaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderModule", function() { return HeaderModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _header_template_header_template_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header-template/header-template.component */ "./src/app/ui/header/header-template/header-template.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var HeaderModule = /** @class */ (function () {
    function HeaderModule() {
    }
    HeaderModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]
            ],
            declarations: [_header_template_header_template_component__WEBPACK_IMPORTED_MODULE_3__["HeaderTemplateComponent"]],
            exports: [_header_template_header_template_component__WEBPACK_IMPORTED_MODULE_3__["HeaderTemplateComponent"]]
        })
    ], HeaderModule);
    return HeaderModule;
}());



/***/ }),

/***/ "./src/app/ui/header/index.ts":
/*!************************************!*\
  !*** ./src/app/ui/header/index.ts ***!
  \************************************/
/*! exports provided: HeaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.module */ "./src/app/ui/header/header.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderModule", function() { return _header_module__WEBPACK_IMPORTED_MODULE_0__["HeaderModule"]; });




/***/ }),

/***/ "./src/app/ui/layout.component.html":
/*!******************************************!*\
  !*** ./src/app/ui/layout.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid pt-1\">\r\n    <app-header-template></app-header-template>\r\n    <div class=\"container-fluid\">\r\n        <router-outlet></router-outlet>\r\n    </div>\r\n    <app-footer-template></app-footer-template>\r\n  </div>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/ui/layout.component.scss":
/*!******************************************!*\
  !*** ./src/app/ui/layout.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VpL2xheW91dC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/ui/layout.component.ts":
/*!****************************************!*\
  !*** ./src/app/ui/layout.component.ts ***!
  \****************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var LayoutComponent = /** @class */ (function () {
    function LayoutComponent() {
    }
    LayoutComponent.prototype.ngOnInit = function () {
    };
    LayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-layout',
            template: __webpack_require__(/*! ./layout.component.html */ "./src/app/ui/layout.component.html"),
            styles: [__webpack_require__(/*! ./layout.component.scss */ "./src/app/ui/layout.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LayoutComponent);
    return LayoutComponent;
}());



/***/ }),

/***/ "./src/app/ui/ui.module.ts":
/*!*********************************!*\
  !*** ./src/app/ui/ui.module.ts ***!
  \*********************************/
/*! exports provided: UiModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiModule", function() { return UiModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout.component */ "./src/app/ui/layout.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./header */ "./src/app/ui/header/index.ts");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./footer */ "./src/app/ui/footer/index.ts");







var UiModule = /** @class */ (function () {
    function UiModule() {
    }
    UiModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_layout_component__WEBPACK_IMPORTED_MODULE_3__["LayoutComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _header__WEBPACK_IMPORTED_MODULE_5__["HeaderModule"],
                _footer__WEBPACK_IMPORTED_MODULE_6__["FooterModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]
            ],
            exports: [
                _layout_component__WEBPACK_IMPORTED_MODULE_3__["LayoutComponent"]
            ],
            bootstrap: [_layout_component__WEBPACK_IMPORTED_MODULE_3__["LayoutComponent"]]
        })
    ], UiModule);
    return UiModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    API_Gateway_Base: "https://0091259a-112a-4196-ac71-7abe2acab76c.mock.pstmn.io/api/v1",
    Oauth2_issuer: "https://dev-209802.okta.com/oauth2/default",
    Oauth2_redirectUrl: "http://localhost:8080/implicit/callback",
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/murpheux/Workspace/projects/qtaskr/web/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map