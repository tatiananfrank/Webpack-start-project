const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",

    module: {
        rules: [{
                test: /\.(scss|css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../', // Specifies a custom public path for the external resources like images, files, etc inside CSS. Works like output.publicPath
                    }
                }, {
                    loader: "css-loader",
                }, {
                    loader: "postcss-loader",
                }, {
                    loader: "resolve-url-loader" // нужен для преобразования url в css файле, полученном после всех импортов
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        sassOptions: {
                            outputStyle: "expanded"
                        }
                    }
                }]
            }
        ]
    }, 

    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
    ]
});