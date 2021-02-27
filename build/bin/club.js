#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pkg = require('../../package.json');
var commander = require("commander");
process.on('unhandledRejection', console.log);
commander
    .version(pkg.version)
    .description(pkg.description)
    .command('install [options]', 'install and configure API access')
    .command('search [options] [SEARCH OPERATORS]', 'search stories with optional query')
    .alias('s')
    .command('find [options] [SEARCH OPERATORS]', '[DEPRECATED] search stories with optional query')
    .command('story ID [options]', 'view or manipulate stories')
    .alias('st')
    .command('create [options]', 'create a story')
    .alias('c')
    .command('members [options]', 'list members')
    .alias('m')
    .command('workflows [options]', 'list workflows and their states')
    .alias('wf')
    .command('epics [options]', 'list epics and their states')
    .alias('e')
    .command('projects [options]', 'list projects and their states')
    .alias('p')
    .command('workspace [NAME] [options]', 'list stories matching saved workspace query', {
    isDefault: true,
})
    .alias('w')
    .parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUUxQyxxQ0FBdUM7QUFFdkMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFOUMsU0FBUztLQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0tBQ3BCLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxrQ0FBa0MsQ0FBQztLQUNoRSxPQUFPLENBQUMscUNBQXFDLEVBQUUsb0NBQW9DLENBQUM7S0FDcEYsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLE9BQU8sQ0FBQyxtQ0FBbUMsRUFBRSxpREFBaUQsQ0FBQztLQUMvRixPQUFPLENBQUMsb0JBQW9CLEVBQUUsNEJBQTRCLENBQUM7S0FDM0QsS0FBSyxDQUFDLElBQUksQ0FBQztLQUNYLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQztLQUM3QyxLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsT0FBTyxDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQztLQUM1QyxLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsT0FBTyxDQUFDLHFCQUFxQixFQUFFLGlDQUFpQyxDQUFDO0tBQ2pFLEtBQUssQ0FBQyxJQUFJLENBQUM7S0FDWCxPQUFPLENBQUMsaUJBQWlCLEVBQUUsNkJBQTZCLENBQUM7S0FDekQsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxnQ0FBZ0MsQ0FBQztLQUMvRCxLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsT0FBTyxDQUFDLDRCQUE0QixFQUFFLDZDQUE2QyxFQUFFO0lBQ2xGLFNBQVMsRUFBRSxJQUFJO0NBQ2xCLENBQUM7S0FDRCxLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9