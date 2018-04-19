'use strict'

const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const utils = require('../../utils')
const base = require('./base')
const user = require('../user')()

function webpackConfig (env) {
  env = env || 'production'

  return utils.getPkg().then((pkg) => {
    const libraryName = utils.getLibraryName(pkg.name)
    const userConfig = user.webpack
    const entry = user.entry
    const environment = utils.getEnv(env).stringified
    const testDir = path.join(process.cwd(), 'test')
    environment.TEST_DIR = JSON.stringify(testDir)
    const browserJs = path.join(testDir, 'browser.js')
    if (fs.existsSync(browserJs)) {
      environment.TEST_BROWSER_JS = JSON.stringify(browserJs)
    } else {
      environment.TEST_BROWSER_JS = JSON.stringify('')
    }
    const sourcemap = env === 'test' ? 'inline-source-map' : 'source-map'
    const babelOptions = require(path.join(__dirname, '../babelrc.js'))

    return merge(base, {
      entry: [
        entry
      ],
      devtool: sourcemap,
      module: {
        rules: [{
          test: /\.js$/,
          // FIXME - this is commented for now so all the libs get transpiled
          // exclude: /node_modules/,
          loader: 'babel-loader',
          options: babelOptions
        }]
      },
      output: {
        filename: path.basename(entry),
        library: libraryName,
        libraryTarget: 'umd',
        path: utils.getPathToDist()
      },
      plugins: [
        new webpack.DefinePlugin(environment)
      ]
    }, userConfig)
  })
}

module.exports = webpackConfig
