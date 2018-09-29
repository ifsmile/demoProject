'use strict'
const path = require('path')
const config = require('./config')
const styleLoaders = require('./styleLoaders')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: true
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: config.pages.reduce((acc, item) => {
        acc[item.name] = `./${config.pagesDir}${item.name}/index.js`
        return acc
    }, {
            common: ['vue', 'axios']
        }),
    //   entry: {
    //     app: './src/main.js'
    //   },
    output: {
        path: config.distDir,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.remotePublicPath :
            config.localPublicPath
    },
    resolve: {
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            ...(config.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: styleLoaders
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.css$/,
                use: styleLoaders.css
            },
            {
                test: /\.less$/,
                use: styleLoaders.less
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[ext]'
                }
            },
            //   {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //       limit: 10000,
            //       name: 'images/[name].[hash:7].[ext]'
            //     }
            //   },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    }
}
