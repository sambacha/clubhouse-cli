import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const configDir =
    process.env.XDG_CONFIG_HOME ||
    path.resolve(process.env.XDG_DATA_HOME || os.homedir(), '.config', 'clubhouse-cli');

const configFile = path.resolve(configDir, 'config.json');
const legacyConfigDir = path.resolve(os.homedir(), '.clubhouse-cli');

export interface Config {
    mentionName: string;
    urlSlug: string;
    token: string;
    // Object used by club workspace.
    // This is unrelated to the concept of Clubhouse Workspaces.
    workspaces: { [key: string]: object };
}

let CONFIG_CACHE = null as Config;

/**
 * Config load function to be used in most-cases.
 */
export const loadConfig: () => Config = () => {
    const config = loadCachedConfig();
    if (!config || config === ({} as Config) || !config.token) {
        console.error("Please run 'club install' to configure Clubhouse API access.");
        process.exit(11);
    }

    if (!config.urlSlug) {
        console.error(
            'Your config must be updated with data from Clubhouse. ' +
                "Please run 'club install --refresh'."
        );
        process.exit(12);
    }
    return config;
};

/**
 * Only use this function directly if you need to avoid the config check.
 */
export const loadCachedConfig: () => Config = () => {
    if (CONFIG_CACHE) {
        return { ...CONFIG_CACHE };
    }
    let config = {} as Config;
    const token = process.env.CLUBHOUSE_API_TOKEN;
    if (fs.existsSync(legacyConfigDir)) {
        createConfigDir();
        fs.renameSync(legacyConfigDir, configDir);
    }
    if (fs.existsSync(configFile)) {
        try {
            config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        } catch (e) {
            console.error(e);
            process.exit(10);
        }
    }
    if (token) {
        config = { token, ...config };
    }
    CONFIG_CACHE = { ...config };
    return config;
};

const createConfigDir = () => {
    const dir = path.dirname(configDir);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir);
    }
};

const saveConfig = (config: Config) => {
    try {
        createConfigDir();
        fs.writeFileSync(configFile, JSON.stringify(config), { flag: 'w' });
        CONFIG_CACHE = { ...config };
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const updateConfig = (newConfig: Config) => {
    const extantConfig = loadCachedConfig() || {};
    return saveConfig({ ...newConfig, ...extantConfig });
};

const saveWorkspace = (name: string, workspace: any) => {
    const extantConfig = loadCachedConfig();
    let workspaces = extantConfig.workspaces || {};
    workspaces[name] = workspace;
    return saveConfig({ workspaces, ...extantConfig });
};

const removeWorkspace = (name: string) => {
    const extant = loadCachedConfig();
    delete extant.workspaces[name];
    return saveConfig(Object.assign({}, extant));
};

export default {
    loadConfig,
    updateConfig,
    saveWorkspace,
    removeWorkspace,
};
