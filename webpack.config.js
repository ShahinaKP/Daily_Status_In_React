const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader:'babel-loader',
                query:
                {
                    presets:['react']
                }
          }]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                publicPath: '/build',
                use: [
                    'css-loader',
                    'sass-loader'
                ],
                // use style-loader in development
                fallback: 'style-loader',
                publicPath: '/'
            })
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            exclude: /node_modules/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        hash: 'sha512',
                        digest: 'hex',
                        name: '[hash].[ext]'
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        gifsicle: {
                            interlaced: false
                        },
                        optipng: {
                            optimizationLevel: 4
                        },
                        mozjpeg: {
                            progressive: true
                        }
                    }
                }
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            exclude: /node_modules/,
            use: 'url-loader?limit=1024&name=fonts/[name].[ext]'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        publicPath: '/build/',
        hot: true,
        inline: true,
        compress: true,
        port: 3050,
        historyApiFallback: true
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `v${require('./package.json').version}`,
            raw: false,
            entryOnly: true
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
            disable: process.env.NODE_ENV === 'development'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};