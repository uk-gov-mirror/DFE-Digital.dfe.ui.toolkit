const nunjucks = require('nunjucks')
const express = require('express');
const routes = require('./app/routes');
const app = express();
const port = (process.env.PORT || 3001)

nunjucks.configure('app/views', {
  express: app,
  autoescape: true,
  watch: true,
  noCache: true
});

app.set('view engine', 'html');
app.use('/static', express.static('dist'));

routes.bind(app);

app.listen(port)
console.log('')
console.log('Listening on port ' + port)
console.log('')
