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
var path = require("path");
var fs = require("fs");
var os = require("os");
var configDir = process.env.XDG_CONFIG_HOME ||
    path.resolve(process.env.XDG_DATA_HOME || os.homedir(), '.config', 'clubhouse-cli');
var configFile = path.resolve(configDir, 'config.json');
var legacyConfigDir = path.resolve(os.homedir(), '.clubhouse-cli');
var CONFIG_CACHE = null;
exports.loadConfig = function () {
    var config = exports.loadCachedConfig();
    if (!config || config === {} || !config.token) {
        console.error("Please run 'club install' to configure Clubhouse API access.");
        process.exit(11);
    }
    if (!config.urlSlug) {
        console.error('Your config must be updated with data from Clubhouse. ' +
            "Please run 'club install --refresh'.");
        process.exit(12);
    }
    return config;
};
exports.loadCachedConfig = function () {
    if (CONFIG_CACHE) {
        return __assign({}, CONFIG_CACHE);
    }
    var config = {};
    var token = process.env.CLUBHOUSE_API_TOKEN;
    if (fs.existsSync(legacyConfigDir)) {
        createConfigDir();
        fs.renameSync(legacyConfigDir, configDir);
    }
    if (fs.existsSync(configFile)) {
        try {
            config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        }
        catch (e) {
            console.error(e);
            process.exit(10);
        }
    }
    if (token) {
        config = __assign({ token: token }, config);
    }
    CONFIG_CACHE = __assign({}, config);
    return config;
};
var createConfigDir = function () {
    var dir = path.dirname(configDir);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir);
    }
};
var saveConfig = function (config) {
    try {
        createConfigDir();
        fs.writeFileSync(configFile, JSON.stringify(config), { flag: 'w' });
        CONFIG_CACHE = __assign({}, config);
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.updateConfig = function (newConfig) {
    var extantConfig = exports.loadCachedConfig() || {};
    return saveConfig(__assign(__assign({}, newConfig), extantConfig));
};
var saveWorkspace = function (name, workspace) {
    var extantConfig = exports.loadCachedConfig();
    var workspaces = extantConfig.workspaces || {};
    workspaces[name] = workspace;
    return saveConfig(__assign({ workspaces: workspaces }, extantConfig));
};
var removeWorkspace = function (name) {
    var extant = exports.loadCachedConfig();
    delete extant.workspaces[name];
    return saveConfig(Object.assign({}, extant));
};
exports.default = {
    loadConfig: exports.loadConfig,
    updateConfig: exports.updateConfig,
    saveWorkspace: saveWorkspace,
    removeWorkspace: removeWorkspace,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jb25maWd1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDJCQUE2QjtBQUM3Qix1QkFBeUI7QUFDekIsdUJBQXlCO0FBRXpCLElBQU0sU0FBUyxHQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZTtJQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFeEYsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDMUQsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQVdyRSxJQUFJLFlBQVksR0FBRyxJQUFjLENBQUM7QUFLckIsUUFBQSxVQUFVLEdBQWlCO0lBQ3BDLElBQU0sTUFBTSxHQUFHLHdCQUFnQixFQUFFLENBQUM7SUFDbEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEtBQU0sRUFBYSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtRQUN2RCxPQUFPLENBQUMsS0FBSyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7UUFDOUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNwQjtJQUVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQ1Qsd0RBQXdEO1lBQ3BELHNDQUFzQyxDQUM3QyxDQUFDO1FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNwQjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUtXLFFB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