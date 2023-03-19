import fs from 'node:fs';
import path from 'node:path';

import fg from 'fast-glob';
import svgstore from 'svgstore';

import type { ConfigType } from '../types/index.js';

import { moduleName, writeSprite, checkManifest, log } from './utils.js';

export const compiler = (config: ConfigType) => {
  const { spriteName, inputDir, outputDir } = config.setup;

  const manifest = config.manifest || `.${moduleName}.manifest.json`;
  const { presets } = config;
  const { record } = config;

  log.headline(`${moduleName} generating`, `${spriteName} from ${inputDir}`);
  if (!fs.existsSync(inputDir)) {
    const e = `The folder ${inputDir} does not exist!`;
    throw new Error(e);
  }

  const sprites = svgstore(presets);

  const icons = fg
    .sync([`${inputDir}/**/*.svg`, `!${spriteName}`, '!.DS_Store'])
    .map((icon) => path.basename(icon));

  if (record) {
    const { empty, changes } = checkManifest({
      sprites,
      icons,
      inputDir,
      manifest,
    });

    if (empty) {
      log.warn(`There are no icons in ${inputDir}`);
    }

    if (!changes) {
      log.info('No new icons to be generated', `in ${inputDir}`);
      return Promise.resolve();
    }
  }

  const generated = writeSprite({
    sprites,
    icons,
    inlineSvg: presets.inlineSvg,
    spriteName,
    inputDir,
    outputDir,
    manifest: record ? manifest : false,
  });

  if (generated) {
    log.info(`${spriteName} is generated`, `in ${outputDir}`);
    return Promise.resolve();
  }
  return Promise.reject(new Error());
};

export default compiler;
