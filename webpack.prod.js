const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",

    module: {
        rules: [{
                test: /\.(scss|css)$/,
                //include: [ path.resolve(__dirname, 'src') ],
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader",
                }, {
                    loader: "postcss-loader", // includes autoprefixer, normalize.css
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
                                ], [
                                    "cssnano",
                                    {
                                        "preset": [
                                            "default",  
                                            {
                                                // Options
                                                discardComments: true,
                                                normalizeUrl: false
                                            }
                                        ],
                                        "plugins": []
                                    }
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

    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ]
});