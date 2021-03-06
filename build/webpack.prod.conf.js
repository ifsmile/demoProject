'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
    devtool: '#source-map',
    output: {
        path: config.distDir,
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': '"production"'
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: true
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: { safe: true }
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'vendor',
        //   minChunks (module) {
        //     // any required modules inside node_modules are extracted to vendor
        //     return (
        //       module.resource &&
        //       /\.js$/.test(module.resource) &&
        //       module.resource.indexOf(
        //         path.join(__dirname, '../node_modules')
        //       ) === 0
        //     )
        //   }
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'manifest',
        //   minChunks: Infinity
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'base.html',
        //     template: 'index.html',
        //     inject: true,
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true
        //     },
        //     chunksSortMode: 'dependency'
        // })
    ]
    .concat(config.pages.map(item => new HtmlWebpackPlugin({
        filename: `${item.name}.html`,
        template: `${config.pagesDir}${item.name}/index.html`,
        inject: true,
        chunks: ['common', item.chunk],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    })))
})

if (config.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
