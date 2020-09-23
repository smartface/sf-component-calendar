"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Application = require("sf-core/application");
var System = require("sf-core/device/system");
;
var File = require("sf-core/io/file");
var FileStream = require("sf-core/io/filestream");
var Path = require("sf-core/io/path");
function parseErrorStackIOS(lines) {
    var lineRegex = /^(?:(.+)(?:\@(.*)\:(\d+)(?::(\d+)))|(?:(.*)\:(\d+)(?::(\d+))))/;
    var parsed = lines
        .map(function (line) { return lineRegex.exec(line); });
    return parsed
        .map(function (parsedLine) {
        if (parsedLine) {
            var res = parsedLine
                .filter(function (res) { return !!res; });
            var stackLine = {
                path: null,
                line: null,
                column: null,
                callee: null
            };
            stackLine.path = res.length === 5 ? res[2] : res[1];
            stackLine.line = parseInt(res.length === 5 ? res[3] : res[2]);
            stackLine.column = parseInt(res.length === 5 ? res[4] : res[3]);
            stackLine.callee = res[0];
            return stackLine;
        }
        return parsedLine;
    });
}
function parseErrorStackAndroid(lines) {
    var lineRegex = /at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/;
    var parsed = lines
        .map(function (line) { return lineRegex.exec(line); });
    return parsed
        .map(function (parsedLine) {
        if (parsedLine) {
            var res = parsedLine
                .filter(function (res) { return !!res; });
            var stackLine = {
                path: null,
                line: null,
                column: null,
                callee: null
            };
            stackLine.path = res[2];
            stackLine.line = parseInt(res[3]);
            stackLine.column = parseInt(res[4]);
            stackLine.callee = res[1];
            return stackLine;
        }
        return parsedLine;
    });
}
function errorStackBySourceMap(e) {
    if (!e.stack)
        return e;
    var lines = e.stack.split('\n');
    var scriptsRoot = System.OS === "Android" ? Path.android.storages.internal + "/Android/data/" + Application.android.packageName + "/cache/assets/" : Path.DataDirectory + "/scripts/";
    var parsedStack;
    try {
        parsedStack = (System.OS === "iOS" ? parseErrorStackIOS : parseErrorStackAndroid)(lines)
            .map(function (stackLine, index) {
            if (stackLine) {
                var mapFilePath = scriptsRoot + stackLine.path + ".map";
                var mapFile = new File({
                    path: mapFilePath
                });
                if (mapFile.exists) {
                    var mapData = mapFile.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY).readToEnd();
                    var smc = new sourceMap.SourceMapConsumer(JSON.parse(mapData));
                    var originalPosition = smc.originalPositionFor({
                        line: stackLine.line,
                        column: stackLine.column
                    });
                    var transpiledPath = stackLine.path + ":" + stackLine.line + ":" + stackLine.column;
                    var originalPosStr = ":" + originalPosition.line + ":" + originalPosition.column;
                    var originialPath = stackLine.path.replace(".js", ".ts") + originalPosStr;
                    return lines[index].replace(transpiledPath, originialPath);
                }
            }
            return lines[index];
        });
    }
    catch (e) {
        return e;
    }
    finally {
        return __assign(__assign({}, e), { stack: parsedStack.join('\n') });
    }
}
exports.errorStackBySourceMap = errorStackBySourceMap;
var sourceMap = require('source-map');
//# sourceMappingURL=error-by-sourcemap.js.map