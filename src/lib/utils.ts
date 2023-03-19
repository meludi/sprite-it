import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import chalk from 'chalk';
import { ensureDirSync } from 'fs-extra';

import { __rootname } from '../paths.js';
import type { SvgstoreType } from '../types/index.js';

import Logger from './logger.js';

export const log = new Logger();

export const moduleName = 'sprite-it';

export const done = () => {
  log.done('Done', `(in ${Math.floor(process.uptime())}s.)`);
  process.exit(0);
};

export const readJSON = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));

export const pkg = readJSON(path.join(__rootname, 'package.json'));

export const extendedOutput = (name = pkg.name) =>
  chalk.black(chalk.bgHex('#0F50A1')(`\n-- ${name} --\n`));

export const getSystemInfo = () => {
  return {
    [moduleName]: pkg.version,
    node: process.version,
    os: os.platform(),
  };
};

/**
 *
 *
 * @see (https://www.30secondsofcode.org/articles/s/javascript-switch-object)
 */
export const switchFn =
  (lookupObject: Record<string, () => void>, defaultCase = '_default') =>
  (expression: string) =>
    (lookupObject[expression] || lookupObject[defaultCase])();

export const arrayEquals = <T>(a: T[], b: T[]) => {
  return a.length === b.length && a.every((val, index) => val === b[index]);
};

export const sleep = async (ms = 20) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const readManifest = ({ manifest }: { manifest: string }) => {
  log.process(`Read manifest`, `from ${manifest}`);
  try {
    const file = fs.existsSync(manifest);
    if (!file) {
      return {};
    }
    const json = fs.readFileSync(manifest, 'utf8');
    return JSON.parse(json);
  } catch (error) {
    const err = <Error>error;
    throw new Error(err.message);
  }
};

export const writeManifest = ({
  icons,
  inputDir,
  manifest,
}: {
  icons: string[];
  inputDir: string;
  manifest: string;
}) => {
  log.process(`Write manifest`, `to ${manifest}`);
  try {
    const json = icons.reduce((acc: { [key: string]: object }, curr: string) => {
      const memo = acc;
      const buffer = fs.readFileSync(path.join(inputDir, curr)).toJSON();
      memo[curr] = buffer;
      return memo;
    }, {});
    // TODO: check for dir in manifest path
    // ensureDirSync(devFolder);
    fs.writeFileSync(manifest, JSON.stringify(json, null, 4));
    return json;
  } catch (error) {
    const err = <Error>error;
    throw new Error(err.message);
  }
};

export const checkManifest = ({
  sprites,
  icons,
  inputDir,
  manifest,
}: {
  sprites: SvgstoreType;
  icons: string[];
  inputDir: string;
  manifest: string;
}) => {
  try {
    // Get icons from json
    const mapJson = readManifest({ manifest });
    const mapArray = Object.keys(mapJson);
    const iconSame = [];

    // Merge icons from assets and json
    const allIcons = [...new Set([...mapArray, ...icons])];

    // No icons
    if (allIcons.length === 0) {
      return { empty: true, noChanges: undefined };
    }

    // Compare icons
    for (let index = 0, l = allIcons.length; index < l; index += 1) {
      const icon = allIcons[index];
      const iconpath = path.join(inputDir, icon);
      const fileExists = fs.existsSync(iconpath);
      let same = false;
      if (fileExists) {
        const buffer = fs.readFileSync(iconpath).toJSON();
        same = mapJson[icon] ? arrayEquals(buffer.data, mapJson[icon].data) : false;
      }
      iconSame.push(same);
    }

    // Check if there are new icons
    if (iconSame.every((item) => item === true)) {
      return { empty: false, changes: false };
    }

    // Write icon status
    let countDeleted = 0;
    for (let index = 0, l = allIcons.length; index < l; index += 1) {
      const icon = allIcons[index];
      const iconpath = path.join(inputDir, icon);
      const svgid = path.parse(icon).name;
      const fileExists = fs.existsSync(iconpath);
      if (fileExists) {
        const code = fs.readFileSync(iconpath, { encoding: 'utf-8' });
        sprites.add(svgid, code);
      }
      if (!fileExists) {
        countDeleted += 1;
      }
      let c = mapArray.includes(icon) ? chalk.blue('✔ updated') : chalk.green('✔ generated');
      c = iconSame[index] ? chalk.yellow('= unchanged') : c;
      c = !fileExists ? chalk.red('✖ deleted') : c;
      log.log(c, chalk.blackBright(svgid));
    }
    return { empty: allIcons.length === countDeleted, changes: true };
  } catch (error) {
    const err = <Error>error;
    throw new Error(err.message);
  }
};

export const writeSprite = ({
  sprites,
  icons,
  inlineSvg,
  spriteName,
  inputDir,
  outputDir,
  manifest,
}: {
  sprites: SvgstoreType;
  icons: string[];
  spriteName: string;
  inputDir: string;
  outputDir: string;
  manifest: string | boolean;
  inlineSvg?: boolean;
}) => {
  try {
    const outputSprite = path.join(outputDir, spriteName);
    ensureDirSync(outputDir);
    fs.writeFileSync(outputSprite, sprites.toString({ inline: !!inlineSvg }));
    if (manifest && typeof manifest === 'string') {
      writeManifest({ icons, inputDir, manifest });
    }
    return true;
  } catch (error) {
    const err = <Error>error;
    throw new Error(err.message);
  }
};

export default {
  log,
  done,
  moduleName,
  extendedOutput,
  sleep,
  readJSON,
  pkg,
  getSystemInfo,
  arrayEquals,
  checkManifest,
  readManifest,
  writeManifest,
  writeSprite,
  switchFn,
};
