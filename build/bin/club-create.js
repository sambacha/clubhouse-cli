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
var stories_1 = require("../lib/stories");
var child_process_1 = require("child_process");
var client_1 = require("../lib/client");
var spinner_1 = require("../lib/spinner");
var commander = require("commander");
var configure_1 = require("../lib/configure");
var config = configure_1.loadConfig();
var spin = spinner_1.default();
var log = console.log;
var program = commander
    .usage('[options]')
    .description('create a story with provided details')
    .option('-d, --description [text]', 'Set description of story', '')
    .option('-e, --estimate [number]', 'Set estimate of story')
    .option('--epic [id|name]', 'Set epic of story')
    .option('--git-branch', 'Checkout git branch from story slug <mention-name>/ch<id>/<type>-<title>\n' +
    '\t\t\t\tas required by the Git integration: https://bit.ly/2RKO1FF')
    .option('--git-branch-short', 'Checkout git branch from story slug <mention-name>/ch<id>/<title>')
    .option('-i, --iteration [id|name]', 'Set iteration of story')
    .option('-I, --idonly', 'Print only ID of story result')
    .option('-l, --label [id|name]', 'Stories with label id/name, by regex', '')
    .option('-o, --owners [id|name]', 'Set owners of story, comma-separated', '')
    .option('-O, --open', 'Open story in browser')
    .option('-p, --project [id|name]', 'Set project of story, required', '')
    .option('-t, --title [text]', 'Set title of story, required', '')
    .option('-s, --state [id|name]', 'Set workflow state of story', '')
    .option('-y, --type [name]', 'Set type of story, default: feature', 'feature')
    .parse(process.argv);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var entities, update, story, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, stories_1.default.fetchEntities()];
            case 1:
                entities = _a.sent();
                if (!program.idonly)
                    spin.start();
                update = {
                    name: program.title,
                    story_type: program.type,
                    description: "" + program.description,
                    estimate: program.estimate || undefined,
                };
                if (program.project) {
                    update.project_id = (stories_1.default.findProject(entities, program.project) || {}).id;
                }
                if (program.state) {
                    update.workflow_state_id = (stories_1.default.findState(entities, program.state) || {}).id;
                }
                if (program.epic) {
                    update.epic_id = (stories_1.default.findEpic(entities, program.epic) || {}).id;
                }
                if (program.iteration) {
                    update.iteration_id = (stories_1.default.findIteration(entities, program.iteration) || {}).id;
                }
                if (program.estimate) {
                    update.estimate = parseInt(program.estimate, 10);
                }
                if (program.owners) {
                    update.owner_ids = stories_1.default.findOwnerIds(entities, program.owners);
                }
                if (program.label) {
                    update.labels = stories_1.default.findLabelNames(entities, program.label);
                }
                if (!(!update.name || !update.project_id)) return [3, 2];
                if (!program.idonly)
                    spin.stop(true);
                log('Must provide --title and --project');
                return [3, 5];
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4, client_1.default.createStory(update)];
            case 3:
                story = _a.sent();
                return [3, 5];
            case 4:
                e_1 = _a.sent();
                log('Error creating story');
                return [3, 5];
            case 5:
                if (!program.idonly)
                    spin.stop(true);
                if (story) {
                    story = stories_1.default.hydrateStory(entities, story);
                    stories_1.default.printDetailedStory(story);
                    if (program.gitBranch) {
                        stories_1.default.checkoutStoryBranch(story);
                    }
                    else if (program.gitBranchShort) {
                        stories_1.default.checkoutStoryBranch(story, config.mentionName + "/ch" + story.id + "/");
                    }
                    if (program.open) {
                        child_process_1.exec('open ' + stories_1.default.storyURL(story));
                    }
                }
                return [2];
        }
    });
}); };
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi1jcmVhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluL2NsdWItY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUF5RDtBQUV6RCwrQ0FBcUM7QUFFckMsd0NBQW1DO0FBR25DLDBDQUFxQztBQUNyQyxxQ0FBdUM7QUFDdkMsOENBQThDO0FBRTlDLElBQU0sTUFBTSxHQUFHLHNCQUFVLEVBQUUsQ0FBQztBQUM1QixJQUFNLElBQUksR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdkIsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN4QixJQUFNLE9BQU8sR0FBRyxTQUFTO0tBQ3BCLEtBQUssQ0FBQyxXQUFXLENBQUM7S0FDbEIsV0FBVyxDQUFDLHNDQUFzQyxDQUFDO0tBQ25ELE1BQU0sQ0FBQywwQkFBMEIsRUFBRSwwQkFBMEIsRUFBRSxFQUFFLENBQUM7S0FDbEUsTUFBTSxDQUFDLHlCQUF5QixFQUFFLHVCQUF1QixDQUFDO0tBQzFELE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQztLQUMvQyxNQUFNLENBQ0gsY0FBYyxFQUNkLDRFQUE0RTtJQUN4RSxvRUFBb0UsQ0FDM0U7S0FDQSxNQUFNLENBQ0gsb0JBQW9CLEVBQ3BCLG1FQUFtRSxDQUN0RTtLQUNBLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSx3QkFBd0IsQ0FBQztLQUM3RCxNQUFNLENBQUMsY0FBYyxFQUFFLCtCQUErQixDQUFDO0tBQ3ZELE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxzQ0FBc0MsRUFBRSxFQUFFLENBQUM7S0FDM0UsTUFBTSxDQUFDLHdCQUF3QixFQUFFLHNDQUFzQyxFQUFFLEVBQUUsQ0FBQztLQUM1RSxNQUFNLENBQUMsWUFBWSxFQUFFLHVCQUF1QixDQUFDO0tBQzdDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxnQ0FB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