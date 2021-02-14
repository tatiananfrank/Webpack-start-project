const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",

    module: {
        rules: [{
                test: /\.(scss|css)$/,
                //include: [ path.resolve(__dirname, 'src') ],
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
                                    "postcss-preset-env", // postcss-preset-env includes autoprefixer, so adding it separately is not necessary if you already use the preset
                                    {
                                        // Options
                                    },
                                ], [
                                    "postcss-normalize", // normalize.css
                                    {
                                        // Options 
                                        //forceImport: 'normalize.css' // Вставляет нормализацию в начало css файла
                                    },
                                ]
                            ]
                        }
                    }
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