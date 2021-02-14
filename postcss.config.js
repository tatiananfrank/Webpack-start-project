module.exports = (api) => {
    // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
    // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
  
    if (api.mode === "production") {
        return {
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
        };
    }
  
    return {
        plugins: [
            [
                "postcss-preset-env",
                {
                    // Options 
                },
            ], [
                "postcss-normalize",
                {
                    // Options 
                },
            ]
        ]
    };
};