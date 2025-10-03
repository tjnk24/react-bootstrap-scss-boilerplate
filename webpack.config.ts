import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import EslintWebpackPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack, {RuleSetRule} from 'webpack';
import 'webpack-dev-server'; // чтобы не было ошибки типов

import alias from './config/aliases.js';
import globals from './config/globals.js';

const development = process.env.NODE_ENV !== 'production';

const plugins: webpack.Configuration['plugins'] = [
    new webpack.ProvidePlugin({
        React: 'react',
    }),
    new webpack.DefinePlugin(globals),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [
            {from: 'src/images', to: 'images'},
            {from: 'public/favicon.ico', to: 'images'},
        ],
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
        chunkFilename: '[name].css',
        filename: '[name].css',
        ignoreOrder: true,
    }),
];

if (development) {
    plugins.push(
        new ForkTsCheckerWebpackPlugin({
            async: true,
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        }),
        new EslintWebpackPlugin({
            files: 'src/**/*.{ts,tsx,js,jsx}',
            emitError: true,
            failOnError: false,
            emitWarning: true,
            failOnWarning: false,
            cache: true,
        }),
    );
}

const cssLoaders: RuleSetRule['use'] = [
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            sourceMap: development,
            modules: {
                mode: 'local',
                namedExport: false,
                localIdentName: '[local]--[hash:base64:5]',
            },
        },
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: development,
        },
    },
];

export default (): webpack.Configuration => ({
    devtool: development && 'source-map',
    devServer: {
        static: {
            directory: 'build',
        },
        liveReload: false,
        open: true,
        port: process.env.PORT,
        hot: true,
        historyApiFallback: true,
        client: {
            logging: 'error',
            overlay: false,
        },
        devMiddleware: {
            writeToDisk: true,
        },
    },
    entry: {
        app: ['./src/index.tsx'],
    },
    mode: development ? 'development' : 'production',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '',
        pathinfo: false,
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(process.cwd(), 'src'),
        ],
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias,
        fallback: {
            crypto: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.(s*)css$/,
                use: cssLoaders,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
        ],
    },
    plugins,
});
