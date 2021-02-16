const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",

    target: "web", // Фиксит проблему с не работающим liveReload в devServer'e вплоть до версии 4.0.0-beta.0 

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        compress: true,
        open: true,
        hot: true, // Enables Hot Module Replacement
        //writeToDisk: true, 
    },

    module: {
        rules: [{
                test: /\.(scss|css)$/,
                //include: [ path.resolve(__dirname, 'src') ],
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                }, {
                    loader: "postcss-loader", // includes autoprefixer, normalize.css
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

    plugins: []
});