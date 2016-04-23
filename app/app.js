var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.set('views', 'app/views/');

app.engine('.hbs', exphbs({
  'extname': '.hbs',
  'layoutsDir': 'app/views/layouts/',
  'partialsDir': 'app/views/partials/',
  'defaultLayout': 'main'
}));

app.set('view engine', '.hbs');

app.use("/", require('./routes'));
app.use('/assets', express.static('./app/assets'));
app.use('/images', express.static('./images'));
app.use('/thumbs', express.static('./thumbs'));

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
