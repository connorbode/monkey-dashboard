var express   = require('express');
var app       = express();
var path      = require('path');
var colors    = require('colors');
var indexPath = path.join(__dirname, '/dist/index.html');

app.use('/static', express.static('dist/static'));

app.get('*', function (req, res) {
  res.sendFile(indexPath);
});

app.listen(3000, function () {
  var troll = '⁀⊙﹏☉⁀'.rainbow;
  var up = 'workhorse dev server running on port 3000'.green;
  console.log(troll);
  console.log(up);
  console.log(troll);
});
