"use strict";

const path = require("path");
/* const fs = require("fs"); */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map((item) => {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: true,
        });
    });
}
  
const htmlPlugins = generateHtmlPlugins("src/pages"); */

module.exports = {
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
    ]/* .concat(htmlPlugins), */
};