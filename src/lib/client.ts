import Clubhouse from 'clubhouse-lib-api';

import { loadConfig } from './configure';

const config = loadConfig();

const client = Clubhouse.create(config.token);

export default client;
