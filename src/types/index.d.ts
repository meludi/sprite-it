export type OptionsType = {
  record?: boolean;
  config?: string;
  manifest?: string;
  path?: string;
  version?: boolean;
  help?: boolean;
};

export type SetupType = {
  inputDir: string;
  outputDir: string;
  spriteName: string;
};

export type PresetsType = {
  minifyStyles: boolean;
  removeUselessDefs: boolean;
  removeNonInheritableGroupAttrs: boolean;
  removeTitle: boolean;
  cleanupAttrs: boolean;
  removeMetadata: boolean;
  removeDoctype: boolean;
  removeXMLProcInst: boolean;
  collapseGroups: boolean;
  inlineSvg?: boolean;
};

export type ConfigDefaultType = {
  setup: SetupType;
  presets: PresetsType;
};

export type ConfigType = {
  setup: SetupType;
  presets: PresetsType;
} & OptionsType;

// Type requires at least one element
export type NonEmptyArray<T> = [T, ...T[]];

export type PrettyErrorType = {
  message: string;
  stack?: string;
  frame?: string;
  loc?: { file: string; line: string | number; column: string | number };
};

// https://github.com/svgstore/svgstore/blob/master/src/svgstore.js
export type SvgstoreOptionsType = { [key: string]: boolean };
export type SvgstoreType = {
  element: string;
  add: (id: string, file: string, options?: SvgstoreOptionsType) => void;
  toString: <T>(options?: SvgstoreOptionsType) => T;
};
