import { isMainThread, parentPort } from 'worker_threads';

import chalk from 'chalk';

import type { PrettyErrorType } from '../types/index.js';

import { log } from './utils.js';

export class PrettyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export function handleError(error: PrettyErrorType) {
  if (error.loc) {
    log.error(
      chalk.bold(
        chalk.red(`Error parsing: ${error.loc.file}:${error.loc.line}:${error.loc.column}`),
      ),
    );
  }
  if (error.frame) {
    log.error(chalk.red(error.message));
    log.error(chalk.dim(error.frame));
  } else if (error instanceof PrettyError) {
    log.error(chalk.red(error.message));
  } else {
    log.error(chalk.red(error.stack));
  }
  process.exitCode = 1;
  if (!isMainThread && parentPort) {
    parentPort.postMessage('error');
  }
}
