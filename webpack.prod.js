const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",

    module: {
        rules: [{
                test: /\.(scss|css)$/,
                //include: [ path.resolve(__dirname, 'src') ],
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader",
                }, {
                    loader: "postcss-loader" // includes autoprefixer, normalize.css
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
            filename: "style.css",
        }),
    ]
});