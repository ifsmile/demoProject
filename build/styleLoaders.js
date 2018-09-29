'use strict'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: !isProd
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: !isProd
  }
}

// generate loader string to be used with extract text plugin
function generateLoaders (loader, loaderOptions) {
  const loaders = [cssLoader, postcssLoader]

  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: !isProd
      })
    })
  }

  // Extract CSS when that option is specified
  // (which is the case during production build)
  if (isProd) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader'
    })
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
}

module.exports = {
  css: generateLoaders(),
  less: generateLoaders('less')
}