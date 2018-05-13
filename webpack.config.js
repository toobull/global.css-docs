const path = require('path')
// webpack plugins
const cleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const is_production = !process.env.WEBPACK_SERVE

module.exports = {
    mode: is_production ? 'production' : 'development',
    entry: {
        index: '@/index',
    },
    output: {
        path: path.resolve('./docs'),
        publicPath: '/global.css-docs/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
    },
    optimization: getOptimization(),
    plugins: [
        ...getPlugins(),
        ...getHtmlPlugins()
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader'
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    ...getSassLoader()
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve('./src')
        }
    }
}

function getSassLoader() {
    const ret = [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }
    ]

    if (is_production) {
        ret[0] = MiniCssExtractPlugin.loader
    }

    return ret
}

function getPlugins() {
    const plugins = [
        new cleanWebpackPlugin(['*'], {
            root: path.resolve('./docs')
        })
    ]

    if (is_production) {
        plugins.push(new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }))
    }
    return plugins
}

function getHtmlPlugins() {
    const configs = [
        {
            filename: 'index.html',
            chunks: ['index'],
            template: './src/index.pug',
            minify: false,
            inject: true,
            hash: false
        }
    ]

    configs.forEach(function (config, i) {
        if (is_production) {
            config['minify'] = {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                removeComments: true,
                removeEmptyAttributes: true,
            }
        }
        configs[i] = new HtmlWebpackPlugin(config)
    })

    return configs
}

function getOptimization() {
    const configs = {}
    if (is_production) {
        configs['occurrenceOrder'] = false
        configs['minimizer'] = [
            new UglifyJsPlugin({
                extractComments: true,
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    zindex: false,
                    reduceIdents: false,
                    autoprefixer: false,
                    discardComments: {
                        removeAll: true
                    }
                }
            })
        ]
    }
    return configs
}

