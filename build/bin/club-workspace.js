#!/usr/bin/env node
"use strict";
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
var configure_1 = require("../lib/configure");
var commander = require("commander");
var stories_1 = require("../lib/stories");
var club_search_1 = require("./club-search");
var config = configure_1.default.loadConfig();
var log = console.log;
var program = commander
    .description('List stories matching saved workspace query')
    .option('-l, --list', 'List saved workspaces')
    .option('-q, --quiet', 'Print only workspace story output, no loading dialog', '')
    .option('-n, --name [name]', 'Load named workspace', '')
    .option('-u, --unset [name]', 'Force unset saved workspace')
    .parse(process.argv);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var success, name, workspace, found, findOpts, additionalArgs, stories, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config || !config.token) {
                    log('Not installed yet.');
                    log('Please run: club install');
                    return [2];
                }
                else if (!config.workspaces) {
                    log('No workspace saved.');
                    log('Please run:');
                    log('  club search [options] --save');
                    log('to create your first one.');
                    return [2];
                }
                else if (program.list) {
                    log('Workspaces:');
                    Object.keys(config.workspaces).map(function (w) {
                        log(' ', w + ':', toArgs(config.workspaces[w]));
                    });
                    return [2];
                }
                else if (program.unset) {
                    success = configure_1.default.removeWorkspace(program.unset);
                    if (success) {
                        log('Successfully removed %s workspace', program.unset);
                    }
                    else {
                        log('Failed to remove %s workspace', program.unset);
                    }
                    return [2];
                }
                name = "" + (program.name || program.args[0] || 'default');
                workspace = config.workspaces[name];
                if (!workspace) {
                    log('No workspace saved with name', name);
                    log('Please run:');
                    log('  club search [options] --save', name);
                    log('to create it.');
                    return [2];
                }
                found = club_search_1.program.parse(process.argv);
                findOpts = found.options.map(function (o) { return o.name(); });
                additionalArgs = findOpts.reduce(function (acc, val) {
                    acc[val] = found[val] || acc[val] || found[val];
                    return acc;
                }, workspace);
                if (!program.quiet) {
                    log('Loading %s workspace ...', name);
                    log();
                }
                stories = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, stories_1.default.listStories(additionalArgs)];
            case 2:
                stories = _a.sent();
                return [3, 4];
            case 3:
                e_1 = _a.sent();
                log('Error fetching stories:', e_1);
                return [3, 4];
            case 4:
                stories.map(stories_1.default.printFormattedStory(additionalArgs));
                return [2];
        }
    });
}); };
main();
var toArgs = function (obj) {
    return Object.keys(obj)
        .map(function (k) { return "--" + k + " '" + obj[k] + "'"; })
        .join(' ');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi13b3Jrc3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluL2NsdWItd29ya3NwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUN6QyxxQ0FBdUM7QUFDdkMsMENBQXNDO0FBRXRDLDZDQUF5RDtBQUd6RCxJQUFNLE1BQU0sR0FBRyxtQkFBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3RDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEIsSUFBTSxPQUFPLEdBQUcsU0FBUztLQUNwQixXQUFXLENBQUMsNkNBQTZDLENBQUM7S0FDMUQsTUFBTSxDQUFDLFlBQVksRUFBRSx1QkFBdUIsQ0FBQztLQUM3QyxNQUFNLENBQUMsYUFBYSxFQUFFLHNEQUFzRCxFQUFFLEVBQUUsQ0FBQztLQUNqRixNQUFNLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxDQUFDO0tBQ3ZELE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSw2QkFBNkIsQ0FBQztLQUMzRCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLElBQU0sSUFBSSxHQUFHOzs7OztnQkFDVCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDMUIsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7b0JBQzFCLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO29CQUNoQyxXQUFPO2lCQUNWO3FCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO29CQUMzQixHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDM0IsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNuQixHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztvQkFDdEMsR0FBRyxDQUFDLDJCQUEyQixDQUFD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