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
var spin = spinner_1.default();
var log = console.log;
var program = commander
    .description('Display projects available for stories')
    .option('-a, --archived', 'List only projects including archived', '')
    .option('-d, --detailed', 'List more details for each project', '')
    .option('-t, --title [query]', 'List projects with name/title containing query', '')
    .parse(process.argv);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var projects, textMatch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spin.start();
                return [4, client_1.default.listProjects()];
            case 1:
                projects = _a.sent();
                spin.stop(true);
                textMatch = new RegExp(program.title, 'i');
                projects
                    .filter(function (o) {
                    return !!(o.name + " " + o.name).match(textMatch);
                })
                    .map(printItem);
                return [2];
        }
    });
}); };
var printItem = function (proj) {
    if (proj.archived && !program.archived)
        return;
    log(chalk_1.default.bold("#" + proj.id) + chalk_1.default.blue(" " + proj.name));
    log(chalk_1.default.bold('Points:        ') + (" " + proj.stats.num_points));
    log(chalk_1.default.bold('Stories:       ') + (" " + proj.stats.num_stories));
    log(chalk_1.default.bold('Started:       ') + (" " + proj.start_time));
    if (proj.archived) {
        log(chalk_1.default.bold('Archived:      ') + (" " + proj.archived));
    }
    if (program.detailed) {
        log(chalk_1.default.bold('Description:    ') + (" " + proj.description));
    }
    log();
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi1wcm9qZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vY2x1Yi1wcm9qZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3Q0FBbUM7QUFFbkMscUNBQXVDO0FBQ3ZDLCtCQUEwQjtBQUMxQiwwQ0FBcUM7QUFHckMsSUFBTSxJQUFJLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBQ3ZCLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEIsSUFBTSxPQUFPLEdBQUcsU0FBUztLQUNwQixXQUFXLENBQUMsd0NBQXdDLENBQUM7S0FDckQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLHVDQUF1QyxFQUFFLEVBQUUsQ0FBQztLQUNyRSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsb0NBQW9DLEVBQUUsRUFBRSxDQUFDO0tBQ2xFLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxnREFBZ0QsRUFBRSxFQUFFLENBQUM7S0FDbkYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixJQUFNLElBQUksR0FBRzs7Ozs7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNJLFdBQU0sZ0JBQU0sQ0FBQyxZQUFZLEVBQUUsRUFBQTs7Z0JBQXRDLFFBQVEsR0FBRyxTQUEyQjtnQkFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDVixTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDakQsUUFBUTtxQkFDSCxNQUFNLENBQUMsVUFBQyxDQUFVO29CQUNmLE9BQU8sQ0FBQyxDQUFDLENBQUcsQ0FBQyxDQUFDLElBQUksU0FBSSxDQUFDLENBQUMsSUFBTSxDQUFBLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDLENBQUM7cUJBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O0tBQ3ZCLENBQUM7QUFFRixJQUFNLFNBQVMsR0FBRyxVQUFDLElBQWE7SUFDNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7UUFBRSxPQUFPO0lBQy9DLEdBQUcsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLE1BQUksSUFBSSxDQUFDLEVBQUksQ0FBQyxHQUFHLGVBQUssQ0FBQyxJQUFJLENBQUMsTUFBSSxJQUFJLENBQUMsSUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3RCxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFHLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFZLENBQUEsQ0FBQyxDQUFDO0lBQ2pFLEdBQUcsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUcsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQWEsQ0FBQSxDQUFDLENBQUM7SUFDbEUsR0FBRyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBRyxNQUFJLElBQUksQ0FBQyxVQUFZLENBQUEsQ0FBQyxDQUFDO0lBQzNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNmLEdBQUcsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUcsTUFBSSxJQUFJLENBQUMsUUFBVSxDQUFBLENBQUMsQ0FBQztLQUM1RDtJQUNELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNsQixHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFHLE1BQUksSUFBSSxDQUFDLFdBQWEsQ0FBQSxDQUFDLENBQUM7S0FDaEU7SUFDRCxHQUFHLEVBQUUsQ0FBQztBQUNWLENBQUMsQ0FBQztBQUNGLElBQUksRUFBRSxDQUFDIn0=