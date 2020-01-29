const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');

const baseConfig = {
    entry: './src/index.tsx',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'index.[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|gif|jpg|cur|svg)$/i,
                loader: 'url-loader', options: { limit: 8192 }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: true
        }),
        new webpack.DefinePlugin({
            API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:3003/api'),
            CORE_API_URL: JSON.stringify(process.env.CORE_API_URL || 'http://localhost:3000/api'),
            CORE_AUTH_UI_URL: JSON.stringify(process.env.CORE_AUTH_UI_URL || 'http://localhost:8081'),
            CORE_AUTH_UI_IFRAME_URL: JSON.stringify(process.env.CORE_AUTH_UI_IFRAME_URL || 'http://localhost:8081/auth'),
            GOOGLE_ANALYTICS_TRACKING_ID: JSON.stringify(process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'UA-92975953-2')
        }),
        new CopyPlugin([
            { from: 'src/static/robots.txt', to: 'robots.txt'}
        ]),
    ],
    mode: 'development',
    devServer: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 8080,
        historyApiFallback: true,
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports = merge(baseConfig,
        {
            plugins: (module.exports.plugins || []).concat([
                new CompressionPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.js$/,
                    threshold: 1240,
                    minRatio: 0.8
                })
            ]),
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendor",
                            chunks: "initial",
                        }
                    }
                }
            }
        });
} else {
    module.exports = baseConfig;
}