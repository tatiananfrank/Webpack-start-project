import "./scss/normalize.scss";
import "./scss/global.scss";

// require.context - динамический подхват всех js файлов
let context = require.context("./components", true, /\.js$/);
const importAll = (r) => r.keys().forEach(r);
importAll(context);