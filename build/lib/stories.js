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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var configure_1 = require("./configure");
var client_1 = require("./client");
var chalk_1 = require("chalk");
var child_process_1 = require("child_process");
var debug_1 = require("debug");
var debug = debug_1.default('club');
var config = configure_1.loadConfig();
var log = console.log;
function fetchEntities() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, projectsById, statesById, membersById, epicsById, iterationsById, labels;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, Promise.all([
                        client_1.default.listProjects().then(mapByItemId),
                        client_1.default
                            .listWorkflows()
                            .then(function (wfs) { return wfs.reduce(function (states, wf) { return states.concat(wf.states); }, []); })
                            .then(mapByItemId),
                        client_1.default.listMembers().then(mapByItemId),
                        client_1.default.listEpics().then(mapByItemId),
                        client_1.default.listIterations().then(mapByItemId),
                        client_1.default.listResource('labels'),
                    ]).catch(function (err) {
                        log("Error fetching workflows: " + err);
                        process.exit(2);
                    })];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 6]), projectsById = _a[0], statesById = _a[1], membersById = _a[2], epicsById = _a[3], iterationsById = _a[4], labels = _a[5];
                    debug('response workflows, members, projects, epics, iterations');
                    return [2, { projectsById: projectsById, statesById: statesById, membersById: membersById, epicsById: epicsById, iterationsById: iterationsById, labels: labels }];
            }
        });
    });
}
var listStories = function (program) { return __awaiter(void 0, void 0, void 0, function () {
    var entities, stories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debug('request workflows, members, projects, epics');
                return [4, fetchEntities()];
            case 1:
                entities = _a.sent();
                return [4, fetchStories(program, entities)];
            case 2:
                stories = _a.sent();
                debug('filtering stories');
                return [2, filterStories(program, stories, entities).sort(sortStories(program))];
        }
    });
}); };
var mapByItemId = function (items) {
    return items.reduce(function (obj, item) {
        var _a;
        return (__assign(__assign({}, obj), (_a = {}, _a[item.id] = item, _a)));
    }, {});
};
var fetchStories = function (program, entities) { return __awaiter(void 0, void 0, void 0, function () {
    var regexProject, projectIds;
    return __generator(this, function (_a) {
        if ((program.args || []).length) {
            debug('using the search endpoint');
            return [2, searchStories(program)];
        }
        debug('filtering projects');
        regexProject = new RegExp(program.project, 'i');
        projectIds = Object.values(entities.projectsById).filter(function (p) { return !!(p.id + p.name).match(regexProject); });
        debug('request all stories for project(s)', projectIds.map(function (p) { return p.name; }).join(', '));
        return [2, Promise.all(projectIds.map(function (p) { return client_1.default.listStories(p.id); })).then(function (projectStories) {
                return projectStories.reduce(function (acc, stories) { return acc.concat(stories); }, []);
            })];
    });
}); };
var searchStories = function (program) { return __awaiter(void 0, void 0, void 0, function () {
    var query, result, stories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = program.args.join(' ').replace('%self%', config.mentionName);
                return [4, client_1.default.searchStories(query)];
            case 1:
                result = _a.sent();
                stories = result.data;
                _a.label = 2;
            case 2:
                if (!result.next) return [3, 4];
                return [4, client_1.default.getResource(result.next)];
            case 3:
                result = _a.sent();
                stories = stories.concat(result.data);
                return [3, 2];
            case 4: return [2, stories];
        }
    });
}); };
var hydrateStory = function (entities, story) {
    debug('hydrating story');
    var augmented = story;
    augmented.project = entities.projectsById[story.project_id];
    augmented.state = entities.statesById[story.workflow_state_id];
    augmented.epic = entities.epicsById[story.epic_id];
    augmented.iteration = entities.iterationsById[story.iteration_id];
    augmented.owners = story.owner_ids.map(function (id) { return entities.membersById[id]; });
    debug('hydrated story');
    return augmented;
};
var findProject = function (entities, project) {
    if (entities.projectsById[project]) {
        return entities.projectsById[project];
    }
    var projectMatch = new RegExp("" + project, 'i');
    return Object.values(entities.projectsById).filter(function (s) { return !!s.name.match(projectMatch); })[0];
};
var findState = function (entities, state) {
    if (entities.statesById[state]) {
        return entities.statesById[state];
    }
    var stateMatch = new RegExp("" + state, 'i');
    return Object.values(entities.statesById).filter(function (s) { return !!s.name.match(stateMatch); })[0];
};
var findEpic = function (entities, epicName) {
    if (entities.epicsById[epicName]) {
        return entities.epicsById[epicName];
    }
    var epicMatch = new RegExp("" + epicName, 'i');
    return Object.values(entities.epicsById).filter(function (s) { return s.name.match(epicMatch); })[0];
};
var findIteration = function (entities, iterationName) {
    if (entities.iterationsById[iterationName]) {
        return entities.iterationsById[iterationName];
    }
    var iterationMatch = new RegExp("" + iterationName, 'i');
    return Object.values(entities.iterationsById).filter(function (s) { return s.name.match(iterationMatch); })[0];
};
var findOwnerIds = function (entities, owners) {
    var ownerMatch = new RegExp(owners.split(',').join('|'), 'i');
    return Object.values(entities.membersById)
        .filter(function (m) { return !!(m.id + " " + m.profile.name + " " + m.profile.mention_name).match(ownerMatch); })
        .map(function (m) { return m.id; });
};
var findLabelNames = function (entities, label) {
    var labelMatch = new RegExp(label.split(',').join('|'), 'i');
    return entities.labels
        .filter(function (m) { return !!(m.id + " " + m.name).match(labelMatch); })
        .map(function (m) { return ({ name: m.name }); });
};
var filterStories = function (program, stories, entities) {
    var created_at;
    if (program.created) {
        created_at = parseDateComparator(program.created);
    }
    var updated_at;
    if (program.updated) {
        updated_at = parseDateComparator(program.updated);
    }
    var regexLabel = new RegExp(program.label, 'i');
    var regexState = new RegExp(program.state, 'i');
    var regexOwner = new RegExp(program.owner, 'i');
    var regexText = new RegExp(program.text, 'i');
    var regexType = new RegExp(program.type, 'i');
    var regexEpic = new RegExp(program.epic, 'i');
    var regexIteration = new RegExp(program.iteration, 'i');
    return stories
        .map(function (story) { return hydrateStory(entities, story); })
        .filter(function (s) {
        if (!program.archived && s.archived) {
            return false;
        }
        if (!(s.labels.map(function (l) { return l.id + "," + l.name; }).join(',') + '').match(regexLabel)) {
            return false;
        }
        if (!(s.workflow_state_id + ' ' + (s.state || {}).name).match(regexState)) {
            return false;
        }
        if (!(s.epic_id + ' ' + (s.epic || {}).name).match(regexEpic)) {
            return false;
        }
        if (!(s.iteration_id + ' ' + (s.iteration || {}).name).match(regexIteration)) {
            return false;
        }
        if (program.owner) {
            var owned = s.owners.filter(function (o) {
                return !!(o.profile.name + " " + o.profile.mention_name).match(regexOwner);
            }).length > 0;
            if (!owned)
                return false;
        }
        if (!s.name.match(regexText)) {
            return false;
        }
        if (!s.story_type.match(regexType)) {
            return false;
        }
        if (created_at && !created_at(s.created_at)) {
            return false;
        }
        return !(updated_at && !updated_at(s.updated_at));
    });
};
var sortStories = function (program) {
    var fields = (program.sort || '').split(',').map(function (s) {
        return s.split(':').map(function (ss) { return ss.split('.'); });
    });
    var pluck = function (acc, val) {
        if (acc[val] === undefined)
            return {};
        return acc[val];
    };
    debug('sorting stories');
    return function (a, b) {
        return fields.reduce(function (acc, field) {
            if (acc !== 0)
                return acc;
            var ap = field[0].reduce(pluck, a);
            var bp = field[0].reduce(pluck, b);
            if (ap === bp)
                return 0;
            var direction = (field[1] || [''])[0].match(/des/i) ? 1 : -1;
            if (ap > bp) {
                if (direction > 0)
                    return -1;
            }
            else {
                if (direction < 0)
                    return -1;
            }
            return 1;
        }, 0);
    };
};
var printFormattedStory = function (program) {
    return function (story) {
        var defaultFormat = "#%id %t\n    \tType:       %y/%e\n    \tProject:    %p\n    \tEpic:       %epic\n    \tIteration:  %i\n    \tOwners:     %o\n    \tState:      %s\n    \tLabels:     %l\n    \tURL:        %u\n    \tCreated:    %c\tUpdated: %updated\n    \tArchived:   %a\n    ";
        var format = program.format || defaultFormat;
        var labels = story.labels.map(function (l) { return l.name + " (#" + l.id + ")"; });
        var owners = story.owners.map(function (o) { return o.profile.name + " (" + o.profile.mention_name + ")"; });
        var url = "https://app.clubhouse.io/story/" + story.id;
        var project = story.project.name + " (#" + story.project.id + ")";
        log(format
            .replace(/%j/, JSON.stringify(__assign(__assign({}, story), { url: url }), null, 2))
            .replace(/%id/, chalk_1.default.blue.bold("" + story.id))
            .replace(/%t/, chalk_1.default.blue("" + story.name))
            .replace(/%d/, story.description || '')
            .replace(/%y/, story.story_type)
            .replace(/%l/, labels.join(', ') || '_')
            .replace(/%epic/, story.epic_id ? (story.epic || {}).name + " (#" + story.epic_id + ")" : '_')
            .replace(/%e/, "" + (story.estimate || '_'))
            .replace(/%i/, story.iteration_id
            ? (story.iteration || {}).name + " (#" + story.iteration_id + ")"
            : '_')
            .replace(/%p/, project)
            .replace(/%o/, owners.join(', ') || '_')
            .replace(/%s/, (story.state || {}).name + " (#" + story.workflow_state_id + ")")
            .replace(/%c/, "" + story.created_at)
            .replace(/%updated/, "" + (story.updated_at !== story.created_at ? story.updated_at : '_'))
            .replace(/%u/, url)
            .replace(/%a/, "" + story.archived)
            .replace(/%gbs/, "" + buildStoryBranch(story, config.mentionName + "/ch" + story.id + "/"))
            .replace(/%gb/, "" + buildStoryBranch(story)));
        return story;
    };
};
var buildURL = function () {
    var segments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        segments[_i] = arguments[_i];
    }
    return __spread([
        'https://app.clubhouse.io',
        config.urlSlug
    ], segments.map(function (item) { return item.toString(); })).join('/');
};
var storyURL = function (story) { return buildURL('story', story.id); };
var printDetailedStory = function (story, entities) {
    if (entities === void 0) { entities = {}; }
    var labels = story.labels.map(function (l) {
        return chalk_1.default.bold("#" + l.id) + (" " + l.name);
    });
    var owners = story.owners.map(function (o) {
        return o.profile.name + " (" + chalk_1.default.bold("" + o.profile.mention_name + ')');
    });
    log(chalk_1.default.blue.bold("#" + story.id) + chalk_1.default.blue(" " + story.name));
    log(chalk_1.default.bold('Desc:') + ("      " + formatLong(story.description || '_')));
    log(chalk_1.default.bold('Owners:') + ("    " + (owners.join(', ') || '_')));
    log(chalk_1.default.bold('Type:') + ("      " + story.story_type + "/" + (story.estimate || '_')));
    log(chalk_1.default.bold('Label:') + ("     " + (labels.join(', ') || '_')));
    log(chalk_1.default.bold('Project:') + chalk_1.default.bold("   #" + story.project_id + " ") + story.project.name);
    if (story.epic) {
        log(chalk_1.default.bold('Epic:') + chalk_1.default.bold("      #" + story.epic_id + " ") + story.epic.name);
    }
    else {
        log(chalk_1.default.bold('Epic:') + '      _');
    }
    if (story.iteration) {
        log(chalk_1.default.bold('Iteration:') + chalk_1.default.bold(" #" + story.iteration_id + " ") + story.iteration.name);
    }
    else {
        log(chalk_1.default.bold('Iteration:') + ' _');
    }
    log(chalk_1.default.bold('State:') + chalk_1.default.bold("     #" + story.workflow_state_id + " ") + story.state.name);
    log(chalk_1.default.bold('Created:') + ("   " + story.created_at));
    if (story.created_at !== story.updated_at) {
        log(chalk_1.default.bold('Updated:') + ("   " + story.updated_at));
    }
    log(chalk_1.default.bold('URL:') + ("       " + storyURL(story)));
    if (story.archived) {
        log(chalk_1.default.bold('Archived:  ') + chalk_1.default.bold("" + story.archived));
    }
    if (story.completed) {
        log(chalk_1.default.bold('Completed:  ') + chalk_1.default.bold("" + story.completed_at));
    }
    story.tasks.map(function (c) {
        log(chalk_1.default.bold('Task:     ') +
            (c.complete ? '[X]' : '[ ]') +
            ' ' +
            formatLong(c.description));
        return c;
    });
    story.comments.map(function (c) {
        var author = entities.membersById[c.author_id];
        log(chalk_1.default.bold('Comment:') + ("  " + formatLong(c.text)));
        log("          " + author.profile.name + " " + chalk_1.default.bold('at:') + (" " + c.updated_at));
        return c;
    });
    story.files.map(function (c) {
        log(chalk_1.default.bold('File:') + ("     " + fileURL(c)));
        log(chalk_1.default.bold('          name:') + ("  " + c.name));
        return c;
    });
    log();
};
var formatLong = function (str) { return str.split('\n').join('\n         '); };
var parseDateComparator = function (arg) {
    var match = arg.match(/[0-9].*/) || { index: 0, '0': { length: 30 } };
    var parsedDate = new Date(arg.slice(match.index));
    var comparator = arg.slice(0, match.index);
    return function (date) {
        switch (comparator) {
            case '<':
                return new Date(date) < parsedDate;
            case '>':
                return new Date(date) > parsedDate;
            case '=':
            default:
                return new Date(date.slice(0, match[0].length)).getTime() === parsedDate.getTime();
        }
    };
};
var buildStoryBranch = function (story, prefix) {
    if (prefix === void 0) { prefix = ''; }
    prefix = prefix || config.mentionName + "/ch" + story.id + "/" + story.story_type + "-";
    var slug = story.name
        .toLowerCase()
        .replace(/\W/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .slice(0, 30)
        .replace(/-$/, '');
    return "" + prefix + slug;
};
var checkoutStoryBranch = function (story, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var branch = buildStoryBranch(story, prefix);
    debug('checking out git branch: ' + branch);
    child_process_1.execSync("git checkout " + branch + " 2> /dev/null || git checkout -b " + branch);
};
var fileURL = function (file) { return file.url + "?token=" + client_1.default.requestFactory.token; };
exports.default = {
    listStories: listStories,
    printFormattedStory: printFormattedStory,
    printDetailedStory: printDetailedStory,
    checkoutStoryBranch: checkoutStoryBranch,
    fetchEntities: fetchEntities,
    hydrateStory: hydrateStory,
    findProject: findProject,
    findState: findState,
    findEpic: findEpic,
    findIteration: findIteration,
    findOwnerIds: findOwnerIds,
    findLabelNames: findLabelNames,
    fileURL: fileURL,
    storyURL: storyURL,
    buildURL: buildURL,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc3Rvcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFFekMsbUNBQThCO0FBRTlCLCtCQUEwQjtBQUUxQiwrQ0FBeUM7QUFFekMsK0JBQThCO0FBYTlCLElBQU0sS0FBSyxHQUFHLGVBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoQyxJQUFNLE1BQU0sR0FBRyxzQkFBVSxFQUFFLENBQUM7QUFDNUIsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQXNCeEIsU0FBZSxhQUFhOzs7Ozt3QkFRcEIsV0FBTSxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNsQixnQkFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7d0JBQ3ZDLGdCQUFNOzZCQUNELGFBQWEsRUFBRTs2QkFDZixJQUFJLENBQUMsVUFBQyxHQUFlLElBQUssT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSyxPQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUF4QixDQUF3QixFQUFFLEVBQUUsQ0FBQyxFQUF4RCxDQUF3RCxDQUFDOzZCQUNuRixJQUFJLENBQUMsV0FBVyxDQUFDO3dCQUN0QixnQkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7d0JBQ3RDLGdCQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzt3QkFDcEMsZ0JBQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO3dCQUN6QyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7cUJB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