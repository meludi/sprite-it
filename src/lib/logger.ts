import chalk from 'chalk';

import type { NonEmptyArray } from '../types/index.js';

export class Logger {
  log(...args: NonEmptyArray<string>) {
    console.log(chalk.blackBright(...args)); // eslint-disable-line no-console
  }

  error(main: string | Error) {
    this.log(chalk.bgRed.whiteBright(' ✖', 'Error '));
    console.log(main); // eslint-disable-line no-console
  }

  success(main: string, subline?: string) {
    this.log(chalk.green('✔', main), subline || '');
  }

  warn(main: string, subline?: string) {
    this.log(chalk.yellow('⚠', main), subline || '');
  }

  info(main: string, subline?: string) {
    this.log(chalk.blue('ℹ', main), subline || '');
  }

  headline(main: string, subline?: string) {
    this.log(chalk.magenta('●', main), subline || '');
  }

  process(main: string, subline?: string) {
    this.log(chalk.black('▰▱', main), subline || '');
  }

  done(main: string, subline?: string) {
    this.log(chalk.greenBright('🏁', main), subline || '');
  }
}

export default Logger;
