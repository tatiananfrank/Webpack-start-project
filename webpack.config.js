"use strict";

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    //mode: 'development', //

    context: path.resolve(__dirname, 'src'), //Директория, где находятся все модули

    entry: {
        main: "./script"
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "./"
        //publicPath: "/"
    },

    module: {
        rules: [{
                test: /\.js$/,
                include: [ path.resolve(__dirname, 'src') ],
                use: {
                    loader: "babel-loader", // targets внутри конфига можно удалить, если в .browserslistrc указаны значения, отличные от defaults
                }
            }, {
                test: /\.(jade|pug)$/,
                loader: "pug-loader"
            }, {
                test: /\.(scss|css)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader" // includes autoprefixer, normalize.css
                }, {
                    loader: "resolve-url-loader" // нужен для преобразования url в css файле, полученном после всех импортов
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]' // Куда положить файлы на выходе (в dist) // можно еще добавит [path], чтобы избежать конфликтов между картинками с одинак именами
                }
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            }, {
                test: /\.(ico|png|jpg|jpeg)$/,
                include: [ path.resolve(__dirname, 'src/favicon') ], // Обрабатываем только фавиконки // мб лучше просто скопировать в dist?
                type: 'asset/resource',
                generator: {
                    filename: 'favicon/[name][ext]'
                }
            }
        ]
    }, 

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.pug',
            inject: true
        }),
        new CleanWebpackPlugin(),
    ]
};