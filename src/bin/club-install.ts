#!/usr/bin/env node

// @ts-ignore
import * as prompt from 'prompt';

import { Config, loadCachedConfig, updateConfig } from '../lib/configure';
import * as commander from 'commander';
import Clubhouse from 'clubhouse-lib-api';

const extant = loadCachedConfig();
const log = console.log;

const program = commander
    .version(require('../../package').version)
    .description('Install access token and other settings for the Clubhouse API')
    .option('-f, --force', 'Force install/reinstall')
    .option('-r, --refresh', 'Refresh the configuration with details from Clubhouse.')
    .parse(process.argv);

const enrichConfigWithMemberDetails = async (config: Config) => {
    log('Fetching user/member details from Clubhouse...');
    const member = await Clubhouse.create(config.token).getCurrentMember();
    return {
        mentionName: member.mention_name,
        urlSlug: member.workspace2.url_slug,
        ...config,
    };
};

const main = async () => {
    if (program.refresh) {
        updateConfig(await enrichConfigWithMemberDetails(extant));
    } else if (!extant.token || program.force) {
        const schema = {
            properties: {
                token: {
                    message:
                        'API Token -> https://app.clubhouse.io/xxxx/settings/account/api-tokens',
                    required: true,
                },
            },
        };
        prompt.start({ message: 'clubhouse' });
        prompt.get(schema, async (err: Error, result: any) => {
            if (err) return log(err);
            const config = await enrichConfigWithMemberDetails(result);
            log('Saving config...');
            const success = updateConfig(config);
            if (success) {
                log('Saved config');
            } else {
                log('Error saving config');
            }
        });
    } else if (extant.token) {
        log('A configuration/token is already saved. To override, re-run with --force');
    }
};

main();
