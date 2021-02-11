# Webpack-start-project
Стартовый проект с Webpack.<br>
Стэк: pug (jade), sass (scss), js.<br>
А также плюшки, вроде postcss (autoprefixer, cssnano), babel


<h2>Установка</h2>
Требуется установленный Node.js.<br>
<ol>
  <li>Клонировать/загрузить этот репозиторий</li>
  <li>Установить зависимости проекта: <code>npm install</code></li>
</ol>

<h2>Команды</h2>
<pre>
npm run build         # простая сборка
</pre>

<h2>Структура проекта</h2>
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
  index.pug           # Главный шаблон проекта (передается в конфиге в HtmlWebpackPlugin)
  script.js           # Точка входа вебпака (подлючаем сюда все скрипты компонентов и главный файл стилей)
  style.scss          # Главный файл стилей (подключаем сюда все стили компонентов)
</pre>


<h2>Подробнее</h2>

Каждый <b>pug</b> файл инклюдит внутри себя другие pug файлы:
<pre>include ./components/plan/plan</pre>

Все <b>scss</b> файлы импортируются в главный файл style.scss:
<pre>// Ниже импортируем все scss файлы из компонентов
@import "components/button/button";
@import "components/plan/plan";</pre>

Сам style.scss для включения в сборку импортируется в главный файл script.js:
<pre>import './style.scss';</pre>

Все <b>js</b> файлы импортируются в главный файл script.js динамически:
<pre>// require.context - динамический подхват всех js и scss файлов
let context = require.context("./components", true, /\.js$/);
const importAll = (r) => r.keys().forEach(r);
importAll(context);</pre>
НО можно и ручками там же:
<pre>// Ниже импортируем все js файлы из компонентов
//import "./components/button/button.js";</pre>

Динамический импорт можно добавить и для scss файлов (таким же образом, как и для js):
<pre>let context = require.context("./", true, /\.scss$/);</pre>

<hr>

Все <b>assets внутри pug</b> файлов подключаются через require:
<pre>img(src = require('./components/plan/img/enter_2.png'), alt = 'photo')</pre>

Все <b>assets внутри scss</b> файлов поключаются через простое указание относительного пути:
<pre>background-image: url(img/enter.png);</pre>
