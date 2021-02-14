const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "development",

    module: {
        rules: [{
                test: /\.(scss|css)$/,
                //include: [ path.resolve(__dirname, 'src') ],
                use: [{
                    loader: "style-loader"
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

    plugins: []
});