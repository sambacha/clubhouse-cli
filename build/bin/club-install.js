#!/usr/bin/env node
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
var prompt = require("prompt");
var configure_1 = require("../lib/configure");
var commander = require("commander");
var clubhouse_lib_api_1 = require("clubhouse-lib-api");
var extant = configure_1.loadCachedConfig();
var log = console.log;
var program = commander
    .version(require('../../package').version)
    .description('Install access token and other settings for the Clubhouse API')
    .option('-f, --force', 'Force install/reinstall')
    .option('-r, --refresh', 'Refresh the configuration with details from Clubhouse.')
    .parse(process.argv);
var enrichConfigWithMemberDetails = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var member;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log('Fetching user/member details from Clubhouse...');
                return [4, clubhouse_lib_api_1.default.create(config.token).getCurrentMember()];
            case 1:
                member = _a.sent();
                return [2, __assign({ mentionName: member.mention_name, urlSlug: member.workspace2.url_slug }, config)];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, schema;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!program.refresh) return [3, 2];
                _a = configure_1.updateConfig;
                return [4, enrichConfigWithMemberDetails(extant)];
            case 1:
                _a.apply(void 0, [_b.sent()]);
                return [3, 3];
            case 2:
                if (!extant.token || program.force) {
                    schema = {
                        properties: {
                            token: {
                                message: 'API Token -> https://app.clubhouse.io/xxxx/settings/account/api-tokens',
                                required: true,
                            },
                        },
                    };
                    prompt.start({ message: 'clubhouse' });
                    prompt.get(schema, function (err, result) { return __awaiter(void 0, void 0, void 0, function () {
                        var config, success;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err)
                                        return [2, log(err)];
                                    return [4, enrichConfigWithMemberDetails(result)];
                                case 1:
                                    config = _a.sent();
                                    log('Saving config...');
                                    success = configure_1.updateConfig(config);
                                    if (success) {
                                        log('Saved config');
                                    }
                                    else {
                                        log('Error saving config');
                                    }
                                    return [2];
                            }
                        });
                    }); });
                }
                else if (extant.token) {
                    log('A configuration/token is already saved. To override, re-run with --force');
                }
                _b.label = 3;
            case 3: return [2];
        }
    });
}); };
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi1pbnN0YWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Jpbi9jbHViLWluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSwrQkFBaUM7QUFFakMsOENBQTBFO0FBQzFFLHFDQUF1QztBQUN2Qyx1REFBMEM7QUFFMUMsSUFBTSxNQUFNLEdBQUcsNEJBQWdCLEVBQUUsQ0FBQztBQUNsQyxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRXhCLElBQU0sT0FBTyxHQUFHLFNBQVM7S0FDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDekMsV0FBVyxDQUFDLCtEQUErRCxDQUFDO0tBQzVFLE1BQU0sQ0FBQyxhQUFhLEVBQUUseUJBQXlCLENBQUM7S0FDaEQsTUFBTSxDQUFDLGVBQWUsRUFBRSx3REFBd0QsQ0FBQztLQUNqRixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLElBQU0sNkJBQTZCLEdBQUcsVUFBTyxNQUFjOzs7OztnQkFDdkQsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7Z0JBQ3ZDLFdBQU0sMkJBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUE7O2dCQUFoRSxNQUFNLEdBQUcsU0FBdUQ7Z0JBQ3RFLHNCQUNJLFdBQVcsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUNoQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQ2hDLE1BQU0sR0FDWDs7O0tBQ0wsQ0FBQztBQUVGLElBQU0sSUFBSSxHQUFHOzs7OztxQkFDTCxPQUFPLENBQUMsT0FBTyxFQUFmLGNBQWU7Z0JBQ2YsS0FBQSx3QkFBWSxDQUFBO2dCQUFDLFdBQU0sNkJBQTZCLENBQUMsTUFBTSxDQUFDLEVBQUE7O2dCQUF4RCxrQkFBYSxTQUEyQyxFQUFDLENBQUM7OztnQkFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtvQkFDakMsTUFBTSxHQUFHO3dCQUNYLFVBQVUsRUFBRTs0QkFDUixLQUFLLEVBQUU7Z0NBQ0gsT0FBTyxFQUNILHdFQUF3RTtnQ0FDNUUsUUFBUSxFQUFFLElBQUk7NkJBQ2pCO3lCQUNKO3FCQUNKLENBQUM7b0JBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFPLEdBQVUsRUFBRSxNQUFXOzs7OztvQ0FDN0MsSUFBSSxHQUFHO3dDQUFFLFdBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFDO29DQUNWLFdBQU0sNkJBQTZCLENBQUMsTUFBTSxDQUFDLEVBQUE7O29DQUFwRCxNQUFNLEdBQUcsU0FBMkM7b0NBQzFELEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29DQUNsQixPQUFPLEdBQUcsd0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDckMsSUFBSSxPQUFPLEVBQUU7d0NBQ1QsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3FDQUN2Qjt5Q0FBTTt3Q0FDSCxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztxQ0FDOUI7Ozs7eUJBQ0osQ0FBQyxDQUFDO2lCQUNOO3FCQUFNLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDckIsR0FBRyxDQUFDLDBFQUEwRSxDQUFDLENBQUM7aUJBQ25GOzs7OztLQUNKLENBQUM7QUFFRixJQUFJLEVBQUUsQ0FBQyJ9