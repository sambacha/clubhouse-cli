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
var spinner_1 = require("../lib/spinner");
var spin = spinner_1.default('Loading... %s ');
var log = console.log;
var commander = require("commander");
var chalk_1 = require("chalk");
var program = commander
    .description('Display members available for stories')
    .option('-s, --search [query]', 'List members with name containing query', '')
    .option('-d, --disabled', 'List members including disabled', '')
    .parse(process.argv);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var members, ownerMatch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spin.start();
                return [4, client_1.default.listMembers()];
            case 1:
                members = _a.sent();
                spin.stop(true);
                ownerMatch = new RegExp(program.search, 'i');
                members
                    .filter(function (o) {
                    return !!(o.profile.name + " " + o.profile.mention_name).match(ownerMatch);
                })
                    .map(printMember);
                return [2];
        }
    });
}); };
var printMember = function (member) {
    if (member.disabled && !program.disabled)
        return;
    log(chalk_1.default.bold("#" + member.id));
    log(chalk_1.default.bold('Name:          ') + (" " + member.profile.name));
    log(chalk_1.default.bold('Mention Name:  ') + (" " + member.profile.mention_name));
    log(chalk_1.default.bold('Role:          ') + (" " + member.role));
    log(chalk_1.default.bold('Email:         ') + (" " + member.profile.email_address));
    if (member.disabled) {
        log(chalk_1.default.bold('Disabled:      ') + (" " + member.disabled));
    }
    log();
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi1tZW1iZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Jpbi9jbHViLW1lbWJlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0NBQW1DO0FBQ25DLDBDQUFxQztBQUNyQyxJQUFNLElBQUksR0FBRyxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDdkMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN4QixxQ0FBdUM7QUFFdkMsK0JBQTBCO0FBRTFCLElBQU0sT0FBTyxHQUFHLFNBQVM7S0FDcEIsV0FBVyxDQUFDLHVDQUF1QyxDQUFDO0tBQ3BELE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSx5Q0FBeUMsRUFBRSxFQUFFLENBQUM7S0FDN0UsTUFBTSxDQUFDLGdCQUFnQixFQUFFLGlDQUFpQyxFQUFFLEVBQUUsQ0FBQztLQUMvRCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLElBQU0sSUFBSSxHQUFHOzs7OztnQkFDVCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ0csV0FBTSxnQkFBTSxDQUFDLFdBQVcsRUFBRSxFQUFBOztnQkFBcEMsT0FBTyxHQUFHLFNBQTBCO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNWLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPO3FCQUNGLE1BQU0sQ0FBQyxVQUFDLENBQVM7b0JBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksU0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQWMsQ0FBQSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDN0UsQ0FBQyxDQUFDO3FCQUNELEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7OztLQUN6QixDQUFDO0FBRUYsSUFBTSxXQUFXLEdBQUcsVUFBQyxNQUFjO0lBQy9CLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO1FBQUUsT0FBTztJQUNqRCxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFJLE1BQU0sQ0FBQyxFQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLEdBQUcsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUcsTUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQU0sQ0FBQSxDQUFDLENBQUM7SUFDL0QsR0FBRyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBRyxNQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBYyxDQUFBLENBQUMsQ0FBQztJQUN2RSxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFHLE1BQUksTUFBTSxDQUFDLElBQU0sQ0FBQSxDQUFDLENBQUM7SUFDdkQsR0FBRyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBRyxNQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBZSxDQUFBLENBQUMsQ0FBQztJQUN4RSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDakIsR0FBRyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBRyxNQUFJLE1BQU0sQ0FBQyxRQUFVLENBQUEsQ0FBQyxDQUFDO0tBQzlEO0lBQ0QsR0FBRyxFQUFFLENBQUM7QUFDVixDQUFDLENBQUM7QUFDRixJQUFJLEVBQUUsQ0FBQyJ9