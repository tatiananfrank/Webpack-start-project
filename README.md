# Webpack-start-project
Стартовый проект с Webpack.
<br>
Стэк: pug (jade), sass (scss), js.
<br>
А также плюшки, вроде <a href="https://babeljs.io/">Babel</a>, <a href="https://github.com/postcss/postcss">postcss</a> (<a href="https://github.com/csstools/postcss-normalize">normalize.css</a>, <a href="https://github.com/csstools/postcss-preset-env#autoprefixer">autoprefixer</a>, <a href="https://github.com/cssnano/cssnano">cssnano</a>), webpack dev server (с HMR).


<h2>Содержание</h2>
<ul>
  <li><a href="#installation">Установка</a></li>
  <li><a href="#commands">Команды</a></li>
  <li><a href="#structure">Структура проекта</a></li>
  <li><a href="#detailed-info">Подробнее</a></li>
  <li><a href="#bugs&features">Баги и Фичи</a></li>
</ul>


<h2 id="installation">Установка</h2>
Требуется установленный Node.js.
<br>
<ol>
  <li>Клонировать/загрузить этот репозиторий</li>
  <li>Установить зависимости проекта: <code>npm install</code></li>
</ol>


<h2 id="commands">Команды</h2>
<pre>
npm run dev           # Сборка для разработки
npm run build         # Сборка для продакшн
npm run start         # Запуск веб-сервера
</pre>


<h2 id="structure">Структура проекта</h2>
<pre>
dist/                 # Папка сборки
src/                  # Исходники
  components/         # Папка с блоками
    button/           # Папка блока со всеми его стилями, скриптами и картинками
      button.pug      
      button.scss
      button.js
      img/
        picture.png   
  favicon/            # Фавиконки для проекта
    favicon.ico
  fonts/              # Шрифты для проекта
    font.woff
    font.woff2
  scss/
    main.scss         # Основные стили проекта
    variables.scss    # Все переменные проекта
  index.pug           # Главный шаблон проекта (передается в конфиге в HtmlWebpackPlugin)
  script.js           # Точка входа вебпака (подлючаем сюда все скрипты компонентов и главный файл стилей)
  style.scss          # Главный файл стилей (подключаем сюда все переменные, основные стили и стили компонентов), файл не содержит ничего кроме импортов!
.browserslistrc       # Поддерживаемые проектом браузеры (используется в Babel, postcss)
babel.config.json     # Конфигурация Babel
postcss.config.js     # Конфигурация postcss
webpack.common.js     # Общий конфиг
webpack.dev.js        # Конфиг для разработки
webpack.prod.js       # Конфиг для продакшн
</pre>


<h2 id="detailed-info">Подробнее</h2>

Каждый <b>pug</b> файл инклюдит внутри себя другие pug файлы:
<pre>
include ./components/plan/plan
</pre>

Все <b>scss</b> файлы импортируются в главный файл style.scss:
<pre>
// Ниже импортируем все scss файлы из компонентов
@import "components/button/button";
@import "components/plan/plan";
</pre>

Сам style.scss для включения в сборку импортируется в главный файл script.js:
<pre>
import './style.scss';
</pre>

Все <b>js</b> файлы импортируются в главный файл script.js динамически:
<pre>
// require.context - динамический подхват всех js и scss файлов
let context = require.context("./components", true, /\.js$/);
const importAll = (r) => r.keys().forEach(r);
importAll(context);
</pre>
НО можно и ручками там же:
<pre>
// Ниже импортируем все js файлы из компонентов
//import "./components/button/button.js";
</pre>

Динамический импорт можно добавить и для scss файлов (таким же образом, как и для js):
<pre>
let context = require.context("./", true, /\.scss$/);
</pre>

<hr>

Все <b>assets внутри pug</b> файлов подключаются через require:
<pre>
img(src = require('./components/plan/img/enter_2.png'), alt = 'photo')
</pre>

Все <b>assets внутри scss</b> файлов поключаются через простое указание относительного пути:
<pre>
background-image: url(img/enter.png);
</pre>


<h2 id="bugs&features">Баги и Фичи</h2>

В конфиге Babel <code>preset-env</code> имеет значение <code>"targets": "defaults"</code>, которое является дубляжом содержимого .browserslistrc. Причина кроется в том, что <code>preset-env</code> не распознает значение <code>defaults</code>, указанное в .browserslistrc, поэтому нужно передавать его явно. Подробнее <a href="https://babeljs.io/docs/en/babel-preset-env#no-targets">тут</a>. 
<br>
<br>

Конфиг webpack.dev.js содержит параметр <a href="https://webpack.js.org/configuration/target/#target"><code>target: "web"</code></a>. И будет содержать до тех пор, пока не будет решена <a href="https://github.com/webpack/webpack-dev-server/issues/2758">проблема совместимости HMR и live reload dev server'а с 5-ой версией webpack'а</a>.
