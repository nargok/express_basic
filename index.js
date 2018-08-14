var express = require('express');
var ejs = require('ejs');

var app = express();

app.engine('ejs', ejs.renderFile);

app.use(express.static('public'));

app.get('/', (req, res) => {
  var msg = 'This is Express page!<br>' + 
            'これは、トップページです';
  var url = '/other?name=taro&pass=yamada'
  res.render('index.ejs', {
    title: 'Index',
    content: msg,
    link:{href: url, text:'※別のページに移動'}
  });
});

app.get('/other', (req, res) => {
  var name = req.query.name;
  var pass = req.query.pass;
  var msg = 'あなたの名前は「' + name +
            '」<br>パスワードは「' + pass + '」です。';
  res.render('index.ejs', {
    title: 'other',
    content: msg,
    link:{href:'/', text:'※トップページに戻る'}
  });
});

var server = app.listen(3000, () => {
  console.log('server is running!');
});
