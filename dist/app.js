"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* globals lang */
require("i18n/i18n.js"); // Generates global lang object
var Application = require("sf-core/application");
// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e) {
    var error = error_by_sourcemap_1.errorStackBySourceMap(e);
    alert({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? error.stack : (e.message + "\n\n*" + error.stack)
    });
};
var error_by_sourcemap_1 = require("error-by-sourcemap");
var System = require("sf-core/device/system");
var routes_1 = require("./routes");
require("./theme");
require("sf-extension-utils");
routes_1.default.push("/pages/newPage001");
//# sourceMappingURL=app.js.map