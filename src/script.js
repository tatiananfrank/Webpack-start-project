import './style.scss';

// Ниже импортируем все js файлы из компонентов
//import "./components/button/button.js"; 

// require.context - динамический подхват всех js и scss файлов
let context = require.context("./components", true, /\.js$/);
const importAll = (r) => r.keys().forEach(r);
importAll(context);

/* let context2 = require.context("./", true, /\.scss$/);
importAll(context2);  */