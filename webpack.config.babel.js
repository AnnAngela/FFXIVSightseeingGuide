import path from 'path';
import webpack from 'webpack';
import uglifyJsPlugin from 'uglifyjs-webpack-plugin';
const development_mode = false;
let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: development_mode ? '"development"' : '"production"',
        },
    }),
];
if (development_mode === false) plugins.push(new uglifyJsPlugin({
    uglifyOptions: {
        warning: false,
    },
    sourceMap: true,
}));

export default {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'index.js',
        libraryTarget: 'var',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins,
    module: {
        rules: [{
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
            loader: 'css-loader',
        },
        {
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]'),
            },
        },
        {
            test: /bootstrap.+\.js$/,
            loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window',
        },
        ],
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
    },
    devtool: 'source-map',
};