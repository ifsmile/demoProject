'use strict'
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        clientLogLevel: 'warning',
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /^\/$/, to: path.posix.join('/src/pages/protect/', 'index.html') },
        //         // { from: /\/protect\//, to: path.posix.join('/src/pages/protect/', 'index.html') }
        //     ],
        // },
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: '0.0.0.0',
        port: config.port,
        open: true,
        openPage: 'base',
        overlay: { warnings: false, errors: true },
        publicPath: config.localPublicPath,
        proxy: config.pages.reduce((acc, page) => {
            acc[`/${page.name}/api`] = config.proxy
            return acc
        }, {
            '/upload': config.proxy,
            '/owner/api': config.proxy,
            '/wechat/portal': config.proxy
        }),
        quiet: false, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: false,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
    .concat(config.pages.map(item => new HtmlWebpackPlugin({
        filename: `${item.name}/index.html`,
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
