module.exports = {
  // Fixed With `useBuiltIns` option, required direct setting of `corejs` option
  // https://cli.vuejs.org/guide/browser-compatibility.html#usebuiltins-usage
  // Our dependencies no need polyfills
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: false,
      },
    ],
  ],
}
