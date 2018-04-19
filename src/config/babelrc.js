'use strict'

module.exports = {
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        targets: {
          uglify: true
        },
        exclude: [
          'transform-regenerator',
          'transform-es2015-typeof-symbol'
        ],
        useBuiltIns: false,
        modules: false,
        debug: false,
        loose: true
      }
    ]
  ],
  plugins: [
    [
      require.resolve('babel-plugin-transform-runtime'),
      {
        helpers: true,
        polyfill: false,
        regenerator: false
      }
    ],
    [
      require.resolve('babel-plugin-transform-object-rest-spread'),
      { useBuiltIns: true }
    ],
    require.resolve('babel-plugin-transform-class-properties')
  ]
}
