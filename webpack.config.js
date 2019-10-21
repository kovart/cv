const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')

const devMode = process.env.NODE_ENV !== 'production';

const config = {
    entry: {
        bundle: './src/entry.js'
    },
    target: "web",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                            hmr: process.env.NODE_ENV === 'development'
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader', options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv({
                                    stage: 0,
                                }),
                                cssnano()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use:
                    {
                        loader: 'url-loader',
                        options:
                            {}
                    }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            hash: false,
            filename: 'index.html',
            template: path.resolve(__dirname, 'src', 'index.html'),
            svgoConfig: {
                removeAttrs: {
                    attrs: 'fill'
                }
            }
        }),
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src', 'images'),
                to: path.resolve(__dirname, 'public', 'images'),
                toType: 'dir',
            },
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        overlay: true,
        port: 3000
    }
};

module.exports = config;
