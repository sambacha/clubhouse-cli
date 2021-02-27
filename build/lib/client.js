"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clubhouse_lib_api_1 = require("clubhouse-lib-api");
var configure_1 = require("./configure");
var config = configure_1.loadConfig();
var client = clubhouse_lib_api_1.default.create(config.token);
exports.default = client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEM7QUFFMUMseUNBQXlDO0FBRXpDLElBQU0sTUFBTSxHQUFHLHNCQUFVLEVBQUUsQ0FBQztBQUU1QixJQUFNLE1BQU0sR0FBRywyQkFBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFOUMsa0JBQWUsTUFBTSxDQUFDIn0=