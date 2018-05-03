const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        app: [
            './js/app.js',
            './sass/app.sass'
        ],
    },

    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "../"
    },

    module: {
        rules: [
            {
                test: /\.sass?$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true}
                        },
                    ],
                    fallback: 'style-loader',
                }),
            },

            {
                test: /\.(png|gif|jpe?g)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ],
            },

        ],
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('./css/[name].css'),

        new CopyWebpackPlugin(
            [
                { from: './img', to: 'img' }
            ],
        ),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),

        new UglifyJSPlugin ({sourceMap: true}),



        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

    ],
};

