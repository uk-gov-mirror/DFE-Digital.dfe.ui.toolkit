const nunjucks = require('nunjucks')
const express = require('express');
const routes = require('./app/routes');
const app = express();

nunjucks.configure('app/views', {
  express: app,
  autoescape: true,
  watch: true,
  noCache: true
});

app.set('view engine', 'html');
app.use('/static', express.static('dist'));

routes.bind(app);

app.listen(3001, function () {
  console.log('View the app at http://localhost:3001/')
});
