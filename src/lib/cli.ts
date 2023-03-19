import { Command } from 'commander';

import type { OptionsType } from '../types/index.js';

import compiler from './compiler.js';
import Config from './config.js';
import { moduleName, extendedOutput, pkg } from './utils.js';

const program = new Command();
program
  .version(pkg.version)
  .description(pkg.description)
  .addHelpText('beforeAll', () => extendedOutput())
  .option('-c, --config', 'Output the configuration')
  .option('-r, --record', 'Maps and compares icons. Verbose ouput')
  .option('-p, --path <file>', `Path to local configuration [default: ".${moduleName}.json"]`)
  .option(
    '-m, --manifest <file>',
    `File for mapping and recording icons [default: ".${moduleName}.manifest.json"]`,
  );

program.parse(process.argv);

const options: OptionsType = program.opts();
const { config } = new Config(options);

export const cli = async () => {
  if (options.version) {
    program.version(pkg.version);
  } else if (options.help) {
    program.help();
  } else if (options.config) {
    program.outputHelp();
    console.log(extendedOutput('config'));
    console.log(config);
  } else {
    return compiler(config);
  }
  return Promise.resolve();
};

export default cli;
