"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildExtender = require("sf-extension-utils/lib/router/buildExtender");
var _a = require("@smartface/router"), Router = _a.NativeRouter, StackRouter = _a.NativeStackRouter, Route = _a.Route;
require("sf-extension-utils/lib/router/goBack"); // Implements onBackButtonPressed
var router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/newPage001",
                    build: buildExtender({ getPageClass: function () { return require("pages/newPage001").default; }, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/newPage003",
                    build: buildExtender({ getPageClass: function () { return require("pages/newPage003").default; }, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/newPage004",
                    build: buildExtender({ getPageClass: function () { return require("pages/newPage004").default; }, headerBarStyle: { visible: true } })
                }),
            ]
        })
    ]
});
exports.default = router;
//# sourceMappingURL=index.js.map