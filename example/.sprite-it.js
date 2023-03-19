module.exports = {
  /**
   * Default setup
   *
   */
  setup: {
    inputDir: 'icons', // Path to your svg icons folder
    outputDir: 'dist', // sprite.svg will be generated in this folder
    spriteName: 'sprite.svg', // Name of your generated sprite.svg
  },

  /**
   * Default presets
   *
   * Check out
   * {@link https://github.com/svg/svgo SVGO} and
   * {@link https://github.com/svg/svgo#default-preset SVGO default-preset}.
   */
  presets: {
    minifyStyles: true,
    removeUselessDefs: true,
    removeNonInheritableGroupAttrs: true,
    removeTitle: true,
    cleanupAttrs: true,
    removeMetadata: true,
    removeDoctype: true,
    removeXMLProcInst: true,
    collapseGroups: true,
  },
};
