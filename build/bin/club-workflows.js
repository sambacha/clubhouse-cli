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
var chalk_1 = require("chalk");
var commander = require("commander");
var client_1 = require("../lib/client");
var spinner_1 = require("../lib/spinner");
var spin = spinner_1.default();
var log = console.log;
var program = commander
    .description('Display workflows/states available for stories')
    .option('-s, --search [query]', 'List states containing query', '')
    .parse(process.argv);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var wfs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spin.start();
                return [4, client_1.default.listWorkflows()];
            case 1:
                wfs = _a.sent();
                spin.stop(true);
                wfs.map(printWf);
                return [2];
        }
    });
}); };
var printWf = function (wf) {
    log(chalk_1.default.bold("#" + wf.id) + (" " + wf.name));
    log('    == States:');
    wf.states.map(printWfState);
};
var printWfState = function (state) {
    if (!state.name.match(new RegExp(program.search, 'i'))) {
        return;
    }
    log(chalk_1.default.bold("    #" + state.id) + (" " + state.name));
    log("         Type:   \t" + state.type);
    log("         Stories:\t" + state.num_stories);
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi13b3JrZmxvd3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluL2NsdWItd29ya2Zsb3dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtCQUEwQjtBQUUxQixxQ0FBdUM7QUFDdkMsd0NBQW1DO0FBRW5DLDBDQUFxQztBQUdyQyxJQUFNLElBQUksR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdkIsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUV4QixJQUFNLE9BQU8sR0FBRyxTQUFTO0tBQ3BCLFdBQVcsQ0FBQyxnREFBZ0QsQ0FBQztLQUM3RCxNQUFNLENBQUMsc0JBQXNCLEVBQUUsOEJBQThCLEVBQUUsRUFBRSxDQUFDO0tBQ2xFLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsSUFBTSxJQUFJLEdBQUc7Ozs7O2dCQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDRCxXQUFNLGdCQUFNLENBQUMsYUFBYSxFQUFFLEVBQUE7O2dCQUFsQyxHQUFHLEdBQUcsU0FBNEI7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7S0FDcEIsQ0FBQztBQUVGLElBQU0sT0FBTyxHQUFHLFVBQUMsRUFBWTtJQUN6QixHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFJLEVBQUUsQ0FBQyxFQUFJLENBQUMsSUFBRyxNQUFJLEVBQUUsQ0FBQyxJQUFNLENBQUEsQ0FBQyxDQUFDO0lBQzdDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQztBQUVGLElBQU0sWUFBWSxHQUFHLFVBQUMsS0FBb0I7SUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNwRCxPQUFPO0tBQ1Y7SUFDRCxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxVQUFRLEtBQUssQ0FBQyxFQUFJLENBQUMsSUFBRyxNQUFJLEtBQUssQ0FBQyxJQUFNLENBQUEsQ0FBQyxDQUFDO0lBQ3ZELEdBQUcsQ0FBQyx3QkFBc0IsS0FBSyxDQUFDLElBQU0sQ0FBQyxDQUFDO0lBQ3hDLEdBQUcsQ0FBQyx3QkFBc0IsS0FBSyxDQUFDLFdBQWEsQ0FBQyxDQUFDO0FBQ25ELENBQUMsQ0FBQztBQUVGLElBQUksRUFBRSxDQUFDIn0=