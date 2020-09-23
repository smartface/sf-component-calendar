"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data = require("sf-core/data");
var Application = require("sf-core/application");
var config = require("./settings.json").config;
var themeConfig = config.theme;
var createThemeContextBound = require("@smartface/contx/lib/styling/ThemeContext").createThemeContextBound;
var currentTheme = Data.getStringVariable("currentTheme") || themeConfig.currentTheme;
var clearCache = require("sf-extension-utils/lib/getCombinedStyle").clearCache;
var themeSources = themeConfig.themes
    .map(function (name) { return ({
    name: name,
    rawStyles: require("./generated/themes/" + name),
    isDefault: currentTheme === name
}); });
Application["theme"] = createThemeContextBound(themeSources);
var themeListeners = new WeakMap();
var themeListenerKeys = [];
exports.ThemeService = {
    onChange: function (listener) {
        var key = {};
        themeListenerKeys.push(key);
        themeListeners.set(key, listener);
        var deletionIndex = themeListenerKeys.length - 1;
        return function () {
            if (themeListeners.has(key)) {
                themeListeners.delete(key);
                themeListenerKeys.splice(deletionIndex, 1);
            }
        };
    },
    changeTheme: function (name) {
        Application["theme"]()({
            type: "changeTheme",
            theme: name
        });
        clearCache();
        themeListenerKeys.forEach(function (key) {
            if (themeListeners.has(key)) {
                themeListeners.get(key)(name);
            }
        });
    }
};
//# sourceMappingURL=theme.js.map