const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",

    module: {
        rules: [{
                test: /\.(scss|sass|css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../", // Specifies a custom public path for the external resources like images, files, etc inside CSS. Works like output.publicPath
                    }
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
    }, 

    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
    ]
});