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
var client_1 = require("../lib/client");
var commander = require("commander");
var chalk_1 = require("chalk");
var spinner_1 = require("../lib/spinner");
var log = console.log;
var spin = spinner_1.default();
var program = commander
    .description('Display epics available for stories')
    .option('-a, --archived', 'List only epics including archived', '')
    .option('-c, --completed', 'List only epics that have been completed', '')
    .option('-d, --detailed', 'List more details for each epic', '')
    .option('-f, --format [template]', 'Format each epic output by template', '')
    .option('-M, --milestone [ID]', 'List epics in milestone matching id', '')
    .option('-t, --title [query]', 'List epics with name/title containing query', '')
    .option('-s, --started', 'List epics that have been started', '')
    .parse(process.argv);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var epics, textMatch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spin.start();
                return [4, client_1.default.listEpics()];
            case 1:
                epics = _a.sent();
                spin.stop(true);
                textMatch = new RegExp(program.title, 'i');
                epics
                    .filter(function (epic) {
                    return (!!(epic.name + " " + epic.name).match(textMatch) &&
                        !!(program.milestone ? epic.milestone_id == program.milestone : true));
                })
                    .map(printItem);
                return [2];
        }
    });
}); };
var printItem = function (epic) {
    if (epic.archived && !program.archived)
        return;
    if (!epic.started && program.started)
        return;
    if (!epic.completed && program.completed)
        return;
    var defaultFormat = "#%id %t\nMilestone:\t%m\nState:\t\t%s\nDeadline:\t%dl\n";
    defaultFormat += "Points:\t\t%p\nPoints Started: %ps\nPoints Done:\t%pd\nCompletion:\t%c\n";
    if (epic.archived) {
        defaultFormat += "Archived:\t%ar\n";
    }
    if (epic.started) {
        defaultFormat += "Started:\t%st\n";
    }
    if (epic.completed) {
        defaultFormat += "Completed:\t%co\n";
    }
    if (program.detailed) {
        defaultFormat += "Description:\t%d\n";
    }
    var format = program.format || defaultFormat;
    log(format
        .replace(/%id/, chalk_1.default.bold("" + epic.id))
        .replace(/%t/, chalk_1.default.blue("" + epic.name))
        .replace(/%m/, "" + (epic.milestone_id || '_'))
        .replace(/%s/, "" + epic.state)
        .replace(/%dl/, "" + (epic.deadline || '_'))
        .replace(/%d/, "" + epic.description)
        .replace(/%p/, "" + epic.stats.num_points)
        .replace(/%ps/, "" + epic.stats.num_points_started)
        .replace(/%pd/, "" + epic.stats.num_points_done)
        .replace(/%c/, Math.round((epic.stats.num_points_done / (epic.stats.num_points || 1)) * 100) + "%")
        .replace(/%a/, "" + epic.archived)
        .replace(/%st/, "" + epic.started_at)
        .replace(/%co/, "" + epic.completed_at));
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vY2x1Yi1lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3Q0FBbUM7QUFDbkMscUNBQXVDO0FBQ3ZDLCtCQUEwQjtBQUcxQiwwQ0FBcUM7QUFFckMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN4QixJQUFNLElBQUksR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFFdkIsSUFBTSxPQUFPLEdBQUcsU0FBUztLQUNwQixXQUFXLENBQUMscUNBQXFDLENBQUM7S0FDbEQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLG9DQUFvQyxFQUFFLEVBQUUsQ0FBQztLQUNsRSxNQUFNLENBQUMsaUJBQWlCLEVBQUUsMENBQTBDLEVBQUUsRUFBRSxDQUFDO0tBQ3pFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxpQ0FBaUMsRUFBRSxFQUFFLENBQUM7S0FDL0QsTUFBTSxDQUFDLHlCQUF5QixFQUFFLHFDQUFxQyxFQUFFLEVBQUUsQ0FBQztLQUM1RSxNQUFNLENBQUMsc0JBQXNCLEVBQUUscUNBQXFDLEVBQUUsRUFBRSxDQUFDO0tBQ3pFLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSw2Q0FBNkMsRUFBRSxFQUFFLENBQUM7S0FDaEYsTUFBTSxDQUFDLGVBQWUsRUFBRSxtQ0FBbUMsRUFBRSxFQUFFLENBQUM7S0FDaEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixJQUFNLElBQUksR0FBRzs7Ozs7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNDLFdBQU0sZ0JBQU0sQ0FBQyxTQUFTLEVBQUUsRUFBQTs7Z0JBQWhDLEtBQUssR0FBRyxTQUF3QjtnQkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDVixTQUFTLEdB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