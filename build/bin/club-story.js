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
var child_process_1 = require("child_process");
var commander = require("commander");
var os = require("os");
var node_fetch_1 = require("node-fetch");
var path = require("path");
var fs = require("fs");
var chalk_1 = require("chalk");
var configure_1 = require("../lib/configure");
var debug_1 = require("debug");
var client_1 = require("../lib/client");
var stories_1 = require("../lib/stories");
var spinner_1 = require("../lib/spinner");
var config = configure_1.loadConfig();
var spin = spinner_1.default();
var log = console.log;
var logError = console.error;
var debug = debug_1.default('club');
var program = commander
    .usage('[options] <id>')
    .description('Update and/or display story details')
    .option('-a, --archived', 'Update story as archived')
    .option('-c, --comment [text]', 'Add comment to story', '')
    .option('-d, --description [text]', 'Update description of story', '')
    .option('-D, --download', 'Download all attached files', '')
    .option('--download-dir [path]', 'Directory to download files to', '.')
    .option('-e, --estimate [number]', 'Update estimate of story', '')
    .option('--epic [id|name]', 'Set epic of story')
    .option('-i, --iteration [id|name]', 'Set iteration of story')
    .option('-f, --format [template]', 'Format the story output by template', '')
    .option('--from-git', 'Fetch story parsed by ID from current git branch')
    .option('--git-branch', 'Checkout git branch from story slug <mention-name>/ch<id>/<type>-<title>\n' +
    '\t\t\t\tas required by the Git integration: https://bit.ly/2RKO1FF')
    .option('--git-branch-short', 'Checkout git branch from story slug <mention-name>/ch<id>/<title>')
    .option('-I, --idonly', 'Print only ID of story results', '')
    .option('-l, --label [id|name]', 'Stories with label id/name, by regex', '')
    .option('--move-after [id]', 'Move story to position below story ID')
    .option('--move-before [id]', 'Move story to position above story ID')
    .option('--move-down [n]', 'Move story position downward by n stories')
    .option('--move-up [n]', 'Move story position upward by n stories')
    .option('-o, --owners [id|name]', 'Update owners of story, comma-separated', '')
    .option('-O, --open', 'Open story in browser')
    .option('--oe, --open-epic', "Open story's epic in browser")
    .option('--oi, --open-iteration', "Open story's iteration in browser")
    .option('--op, --open-project', "Open story's project in browser")
    .option('-q, --quiet', 'Print only story output, no loading dialog', '')
    .option('-s, --state [id|name]', 'Update workflow state of story', '')
    .option('-t, --title [text]', 'Update title/name of story', '')
    .option('--task [text]', 'Create new task on story')
    .option('--task-complete [text]', 'Toggle completion of task on story matching text')
    .option('-y, --type [name]', 'Update type of story', '')
    .parse(process.argv);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var entities, update, typeMatch_1, hasPositionUpdate, hasUpdate, gitID, branch, id, argIDs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, stories_1.default.fetchEntities()];
            case 1:
                entities = _a.sent();
                if (!(program.idonly || program.quiet))
                    spin.start();
                debug('constructing story update');
                update = {};
                if (program.archived) {
                    update.archived = true;
                }
                if (program.state) {
                    update.workflow_state_id = (stories_1.default.findState(entities, program.state) || {}).id;
                }
                if (program.estimate) {
                    update.estimate = parseInt(program.estimate, 10);
                }
                if (program.title) {
                    update.name = program.title;
                }
                if (program.description) {
                    update.description = "" + program.description;
                }
                if (program.type) {
                    typeMatch_1 = new RegExp(program.type, 'i');
                    update.story_type = ['feature', 'bug', 'chore'].filter(function (t) {
                        return !!t.match(typeMatch_1);
                    })[0];
                }
                if (program.owners) {
                    update.owner_ids = stories_1.default.findOwnerIds(entities, program.owners);
                }
                if (program.epic) {
                    update.epic_id = (stories_1.default.findEpic(entities, program.epic) || {}).id;
                }
                if (program.iteration) {
                    update.iteration_id = (stories_1.default.findIteration(entities, program.iteration) || {}).id;
                }
                if (program.label) {
                    update.labels = stories_1.default.findLabelNames(entities, program.label);
                }
                hasPositionUpdate = program.moveAfter !== undefined ||
                    program.moveBefore !== undefined ||
                    program.moveDown !== undefined ||
                    program.moveUp !== undefined;
                hasUpdate = Object.keys(update).length > 0 || hasPositionUpdate;
                debug('constructed story update', update);
                gitID = [];
                if (program.fromGit || !program.args.length) {
                    debug('fetching story ID from git');
                    branch = '';
                    try {
                        branch = child_process_1.execSync('git branch').toString('utf-8');
                    }
                    catch (e) {
                        debug(e);
                    }
                    if (branch.match(/\*.*[0-9]+/)) {
                        debug('parsing story ID from git branch:', branch);
                        id = parseInt(branch.match(/\*.*/)[0].match(/\/ch([0-9]+)/)[1], 10);
                        debug('parsed story ID from git branch:', id);
                        if (id) {
                            gitID.push(id.toString());
                        }
                    }
                    else {
                        stopSpinner();
                        logError('No story ID argument present or found in git branch');
                        process.exit(2);
                    }
                }
                argIDs = program.args.map(function (a) { return (a.match(/\d+/) || [])[0]; });
                argIDs.concat(gitID).map(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    var story, e_1, e_2, e_3, descMatch_1, tasks, updatedTaskIds_1, e_4, siblings, siblingIds, storyIndex, changed, e_5;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                if (!program.comment) return [3, 2];
                                debug('request comment create');
                                return [4, client_1.default.createStoryComment(id, program.comment)];
                            case 1:
                                _a.sent();
                                debug('response comment create');
                                _a.label = 2;
                            case 2: return [3, 4];
                            case 3:
                                e_1 = _a.sent();
                                stopSpinner();
                                log('Error creating comment', id);
                                process.exit(3);
                                return [3, 4];
                            case 4:
                                _a.trys.push([4, 7, , 8]);
                                if (!program.task) return [3, 6];
                                debug('request task create');
                                return [4, client_1.default.createTask(id, { description: program.task })];
                            case 5:
                                _a.sent();
                                debug('response task create');
                                _a.label = 6;
                            case 6: return [3, 8];
                            case 7:
                                e_2 = _a.sent();
                                stopSpinner();
                                log('Error creating task', id);
                                process.exit(3);
                                return [3, 8];
                            case 8:
                                _a.trys.push([8, 10, , 11]);
                                debug('request story');
                                return [4, client_1.default.getStory(id)];
                            case 9:
                                story = _a.sent();
                                debug('response story');
                                return [3, 11];
                            case 10:
                                e_3 = _a.sent();
                                stopSpinner();
                                logError('Error fetching story', id);
                                process.exit(4);
                                return [3, 11];
                            case 11:
                                _a.trys.push([11, 14, , 15]);
                                if (!program.taskComplete) return [3, 13];
                                debug('calculating task(s) to complete');
                                descMatch_1 = new RegExp(program.taskComplete, 'i');
                                tasks = story.tasks.filter(function (t) { return t.description.match(descMatch_1); });
                                updatedTaskIds_1 = tasks.map(function (t) { return t.id; });
                                debug('request tasks complete', updatedTaskIds_1);
                                return [4, Promise.all(tasks.map(function (t) { return client_1.default.updateTask(id, t.id, { complete: !t.complete }); }))];
                            case 12:
                                _a.sent();
                                debug('response tasks complete');
                                story.tasks = story.tasks.map(function (t) {
                                    if (updatedTaskIds_1.indexOf(t.id) > -1)
                                        t.complete = !t.complete;
                                    return t;
                                });
                                _a.label = 13;
                            case 13: return [3, 15];
                            case 14:
                                e_4 = _a.sent();
                                stopSpinner();
                                log('Error updating tasks', e_4);
                                process.exit(3);
                                return [3, 15];
                            case 15:
                                _a.trys.push([15, 20, , 21]);
                                if (!hasUpdate) return [3, 19];
                                if (!hasPositionUpdate) return [3, 17];
                                debug('calculating move up/down');
                                return [4, stories_1.default.listStories({
                                        state: story.workflow_state_id.toString(),
                                        sort: 'state.position:asc,position:asc',
                                    })];
                            case 16:
                                siblings = _a.sent();
                                siblingIds = siblings.map(function (s) { return s.id; });
                                storyIndex = siblingIds.indexOf(~~id);
                                if (program.moveAfter) {
                                    update.after_id = ~~program.moveAfter;
                                }
                                else if (program.moveBefore) {
                                    update.before_id = ~~program.moveBefore;
                                }
                                else if (program.moveUp) {
                                    update.before_id =
                                        siblingIds[Math.max(0, storyIndex - (~~program.moveUp || 1))];
                                }
                                else if (program.moveDown) {
                                    update.after_id =
                                        siblingIds[Math.min(siblings.length - 1, storyIndex + (~~program.moveDown || 1))];
                                }
                                debug('constructed story position update', update);
                                _a.label = 17;
                            case 17:
                                debug('request story update');
                                return [4, client_1.default.updateStory(id, update)];
                            case 18:
                                changed = _a.sent();
                                debug('response story update');
                                story = Object.assign({}, story, changed);
                                _a.label = 19;
                            case 19: return [3, 21];
                            case 20:
                                e_5 = _a.sent();
                                stopSpinner();
                                logError('Error updating story', id);
                                process.exit(5);
                                return [3, 21];
                            case 21:
                                if (story) {
                                    story = stories_1.default.hydrateStory(entities, story);
                                }
                                if (!program.idonly)
                                    spin.stop(true);
                                if (story) {
                                    printStory(story, entities);
                                    if (program.open)
                                        openURL(stories_1.default.storyURL(story));
                                    if (program.openEpic)
                                        openURL(stories_1.default.buildURL('epic', story.epic_id));
                                    if (program.openIteration)
                                        openURL(stories_1.default.buildURL('iteration', story.iteration_id));
                                    if (program.openProject)
                                        openURL(stories_1.default.buildURL('project', story.project_id));
                                }
                                if (program.download) {
                                    downloadFiles(story);
                                }
                                if (story && program.gitBranch) {
                                    if (!config.mentionName) {
                                        stopSpinner();
                                        stories_1.default.checkoutStoryBranch(story, story.story_type + "-" + story.id + "-");
                                        logError('Error creating story branch in Clubhouse format');
                                        logError('Please run: "club install --force" to add your mention name to the config.');
                                        process.exit(10);
                                    }
                                    stories_1.default.checkoutStoryBranch(story);
                                }
                                else if (story && program.gitBranchShort) {
                                    stories_1.default.checkoutStoryBranch(story, config.mentionName + "/ch" + story.id + "/");
                                }
                                return [2];
                        }
                    });
                }); });
                stopSpinner();
                return [2];
        }
    });
}); };
var openURL = function (url) {
    var open = os.platform() === 'darwin' ? 'open' : 'xdg-open';
    child_process_1.execSync(open + " '" + url + "'");
};
var stopSpinner = function () {
    if (!(program.idonly || program.quiet))
        spin.stop(true);
};
var downloadFiles = function (story) {
    story.files.map(function (file) {
        var filePath = path.join(program.downloadDir, file.name);
        log(chalk_1.default.bold('Downloading file to: ') + filePath);
        return node_fetch_1.default(stories_1.default.fileURL(file)).then(function (res) {
            return res.body.pipe(fs.createWriteStream(filePath));
        });
    });
};
var printStory = function (story, entities) {
    if (program.idonly) {
        return log(story.id);
    }
    if (program.format) {
        return stories_1.default.printFormattedStory(program)(story);
    }
    stories_1.default.printDetailedStory(story, entities);
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi1zdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vY2x1Yi1zdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwrQ0FBeUM7QUFDekMscUNBQXVDO0FBRXZDLHVCQUF5QjtBQUN6Qix5Q0FBK0I7QUFDL0IsMkJBQTZCO0FBQzdCLHVCQUF5QjtBQUN6QiwrQkFBMEI7QUFDMUIsOENBQThDO0FBRTlDLCtCQUE4QjtBQUM5Qix3Q0FBbUM7QUFDbkMsMENBQW1FO0FBV25FLDBDQUFxQztBQUVyQyxJQUFNLE1BQU0sR0FBRyxzQkFBVSxFQUFFLENBQUM7QUFDNUIsSUFBTSxJQUFJLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBQ3ZCLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDeEIsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUMvQixJQUFNLEtBQUssR0FBRyxlQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFaEMsSUFBTSxPQUFPLEdBQUcsU0FBUztLQUNwQixLQUFLLENBQUMsZ0JBQWdCLENBQUM7S0FDdkIsV0FBVyxDQUFDLHFDQUFxQyxDQUFDO0tBQ2xELE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSwwQkFBMEIsQ0FBQztLQUNwRCxNQUFNLENBQUMsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxDQUFDO0tBQzFELE1BQU0sQ0FBQywwQkFBMEIsRUFBRSw2QkFBNkIsRUFBRSxFQUFFLENBQUM7S0FDckUsTUFBTSxDQUFDLGdCQUFnQixFQUFFLDZCQUE2QixFQUFFLEVBQUUsQ0FBQztLQUMzRCxNQUFNLENBQUMsdUJBQXVCLEVBQUUsZ0NBQWdDLEVBQUUsR0FBRyxDQUFDO0tBQ3RFLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSxFQUFFLENBQUM7S0FDakUsTUFBTSxDQUFD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