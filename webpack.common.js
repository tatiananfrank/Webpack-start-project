"use strict";

const path = require("path");
/* const fs = require("fs"); */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
    context: path.resolve(__dirname, "src"), //Директория, где находятся все модули

    entry: {
        main: "./script"
    },

    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "./"
    },

    module: {
        rules: [{
                test: /\.js$/,
                include: [ path.resolve(__dirname, "src") ],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }, {
                test: /\.pug$/,
                loader: "pug-loader"
            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "img/[name][ext]" // Куда положить файлы на выходе (в dist) // можно еще добавит [path], чтобы избежать конфликтов между картинками с одинаковыми именами
                }
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]"
                }
            }, 
        ]
    }, 

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "pages/index.pug",
            inject: "body",
        }),
        new FaviconsWebpackPlugin({
            logo: "./favicon/favicon.png",
            prefix: "favicon/"
        }),
        new CleanWebpackPlugin(),
    ]/* .concat(htmlPlugins), */
};