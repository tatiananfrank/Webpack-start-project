const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",

    target: "web", // Фиксит проблему с не работающим liveReload в devServer'e вплоть до версии 4.0.0-beta.0 

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/",
        compress: true,
        open: true,
        hot: true, // Enables Hot Module Replacement
    },

    module: {
        rules: [{
                test: /\.(scss|sass|css)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                }, {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "postcss-preset-env" // Includes Autoprefixer
                                ], [
                                    "postcss-normalize" // normalize.css
                                ]
                            ]
                        }
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                            outputStyle: "expanded"
                        }
                    }
                }]
            }
        ]
    }
});