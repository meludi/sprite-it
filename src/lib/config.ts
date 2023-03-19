import p from 'node:path';

import { cosmiconfigSync } from 'cosmiconfig';
import _ from 'lodash';

import { __rootname } from '../paths.js';
import type { OptionsType, ConfigDefaultType, ConfigType } from '../types/index.js';

import { moduleName, readJSON } from './utils.js';

export class Config {
  config: ConfigType;

  constructor(options: OptionsType) {
    this.config = this.mergeConfig({ options });
    this.config = this.expandSetup();
  }

  expandSetup() {
    const setup = {
      ...this.config.setup,
    };
    return { ...this.config, setup };
  }

  getCustomConfig({ path }: { path?: string }) {
    const searchPlaces = [
      'package.json',
      `.${moduleName}.json`,
      `.${moduleName}.js`,
      `.${moduleName}.cjs`,
      `.${moduleName}.yaml`,
      `.${moduleName}.yml`,
    ];
    const localConfig = {};
    const explorer = cosmiconfigSync(moduleName, {
      searchPlaces,
    });
    const dir = process.cwd();
    const result = path ? explorer.load(path) : explorer.search(dir);
    if (result && typeof result.config === 'string') {
      const e = `Invalid configuration file at ${result.filepath}`;
      throw new Error(e);
    }
    return result && _.isPlainObject(result.config) ? result.config : localConfig;
  }

  mergeConfig({ options }: { options: OptionsType }) {
    const defaultConfig: ConfigDefaultType = readJSON(
      p.join(__rootname, `/config/.${moduleName}.json`),
    );
    const customConfig: ConfigDefaultType = this.getCustomConfig({ path: options.path });
    return _.defaultsDeep({}, options, customConfig, defaultConfig);
  }
}

export default Config;
