#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

import updateNotifier from 'update-notifier';

import cli from '../lib/cli.js';
import { pkg, done } from '../lib/utils.js';
import { handleError } from '../lib/errors.js';

const notifier = updateNotifier({ pkg });
notifier.notify();

cli().then(done).catch(handleError);
