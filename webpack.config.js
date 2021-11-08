const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    performance: {
        maxEntrypointSize: 1024 * 1024,
        maxAssetSize: 1024 * 1024,
    },
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new VueLoaderPlugin(),
        new ESLintPlugin({
            exclude: ['node_modules', 'dist'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader' },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]'),
                        },
                    },
                ]
            },
            {
                test: /bootstrap.+\.js$/,
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            imports: [
                                {
                                    syntax: "named",
                                    moduleName: "jquery",
                                    name: "jQuery",
                                },
                                {
                                    syntax: "named",
                                    moduleName: "jquery",
                                    name: "$",
                                },
                            ],
                            wrapper: "window",
                        },
                    },
                ],
            },
        ],
    },
    //devtool: 'cheap-module-source-map',
};