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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var spinner_1 = require("../lib/spinner");
var commander = require("commander");
var configure_1 = require("../lib/configure");
var stories_1 = require("../lib/stories");
var spin = spinner_1.default('Finding... %s ');
var log = console.log;
exports.program = commander
    .description("Search through clubhouse stories. Arguments (non-flag/options) will be\n  passed to Clubhouse story search API as search operators. Passing '%self%' as\n  a search operator argument will be replaced by your mention name. Note that\n  passing search operators and options (e.g. --owner foobar) will use the\n  options as extra filtering in the client.\n\n  Refer to https://help.clubhouse.io/hc/en-us/articles/360000046646-Search-Operators\n  for more details about search operators.")
    .usage('[options] [SEARCH OPERATORS]')
    .option('-a, --archived', 'Include archived Stories')
    .option('-c, --created [operator][date]', 'Stories created within criteria (operator is one of <|>|=)', '')
    .option('-q, --quiet', 'Print only story output, no loading dialog', '')
    .option('-l, --label [id|name]', 'Stories with label id/name, by regex', '')
    .option('-o, --owner [name]', 'Stories with owner, by regex', '')
    .option('-p, --project [id]', 'Stories in project', '')
    .option('-s, --state [id|name]', 'Stories in workflow state id/name, by regex', '')
    .option('--epic [id|name]', 'Stories in epic id/name, by regex', '')
    .option('-i, --iteration [id|name]', 'Stories in iteration id/name, by regex', '')
    .option('-S, --save [name]', 'Save search configuration as workspace')
    .option('-t, --text [name]', 'Stories with text in name, by regex', '')
    .option('-u, --updated [operator][date]', 'Stories updated within criteria (operator is one of <|>|=)', '')
    .option('-y, --type [name]', 'Stories of type, by regex', '')
    .option('-r, --sort [field]', 'Sort stories by field (accessor[:asc|desc][,next])', 'state.position:asc,position:asc')
    .option('-f, --format [template]', 'Format each story output by template', '');
var getWorkspaceOptions = function (program) {
    var blacklistedKeys = ['Command', 'commands', 'Option', 'options', 'rawArgs', 'save'];
    return Object.entries(program)
        .filter(function (_a) {
        var _b = __read(_a, 1), key = _b[0];
        return !(blacklistedKeys.includes(key) || key.startsWith('_'));
    })
        .reduce(function (obj, _a) {
        var _b;
        var _c = __read(_a, 2), key = _c[0], val = _c[1];
        return Object.assign(obj, (_b = {}, _b[key] = val, _b));
    }, {});
};
exports.main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var stories, e_1, name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exports.program.parse(process.argv);
                if (!exports.program.quiet) {
                    if (!exports.program.args.length) {
                        log('Fetching all stories for search since no search operators were passed ...');
                    }
                    spin.start();
                }
                stories = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, stories_1.default.listStories(exports.program)];
            case 2:
                stories = _a.sent();
                return [3, 4];
            case 3:
                e_1 = _a.sent();
                log('Error fetching stories:', e_1);
                return [3, 4];
            case 4:
                if (!exports.program.quiet)
                    spin.stop(true);
                stories.map(stories_1.default.printFormattedStory(exports.program));
                if (!exports.program.save) {
                    return [2];
                }
                name = exports.program.save === true ? 'default' : exports.program.save;
                if (configure_1.default.saveWorkspace(name, getWorkspaceOptions(exports.program))) {
                    log('Saved query as %s workspace', name);
                }
                return [2];
        }
    });
}); };
if (require.main === module) {
    exports.main();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi1zZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluL2NsdWItc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwQ0FBcUM7QUFDckMscUNBQXVDO0FBRXZDLDhDQUF5QztBQUN6QywwQ0FBeUQ7QUFFekQsSUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFWCxRQUFBLE9BQU8sR0FBRyxTQUFTO0tBQzNCLFdBQVcsQ0FDUixvZUFPbUMsQ0FDdEM7S0FDQSxLQUFLLENBQUMsOEJBQThCLENBQUM7S0FDckMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLDBCQUEwQixDQUFDO0tBQ3BELE1BQU0sQ0FDSCxnQ0FBZ0MsRUFDaEMsNERBQTRELEVBQzVELEVBQUUsQ0FDTDtLQUNBLE1BQU0sQ0FBQyxhQUFhLEVBQUUsNENBQTRDLEVBQUUsRUFBRSxDQUFDO0tBQ3ZFLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxzQ0FBc0MsRUFBRSxFQUFFLENBQUM7S0FDM0UsTUFBTSxDQUFDLG9CQUFvQixFQUFFLDhCQUE4QixFQUFFLEVBQUUsQ0FBQztLQUNoRSxNQUFNLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxDQUFDO0tBQ3RELE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSw2Q0FBNkMsRUFBRSxFQUFFLENBQUM7S0FDbEYsTUFBTSxDQUFDLGtCQUFrQixFQUFFLG1DQUFtQyxFQUFFLEVBQUUsQ0FBQztLQUNuRSxNQUFNLENBQUMsMkJBQTJCLEVBQUUsd0NBQXdDLEVBQUUsRUFBRSxDQUFDO0tBQ2pGLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSx3Q0FBd0MsQ0FBQztLQUNyRSxNQUFNLENBQUMsbUJBQW1CLEVB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