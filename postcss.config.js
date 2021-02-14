module.exports = {
    plugins: [
        [
            "postcss-preset-env", // postcss-preset-env includes autoprefixer, so adding it separately is not necessary if you already use the preset
            {
                // Options 
            },
        ],
        [
            "postcss-normalize", // normalize.css
            {
                // Options 
                //forceImport: 'normalize.css' // Вставляет нормализацию в начало css файла
            },
        ],
    ],
};